import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import fs from 'fs';
import path from 'path';

/**
 * ResumeManagerPage
 * Page Object Model representing the Student Resume Manager page.
 * Provides reusable actions for creating, managing, and verifying resumes.
 */
export class ResumeManagerPage extends BasePage {

  // ===== Navigation =====
  readonly dashboardLink: Locator;
  readonly resumeManagerSidebar: Locator;

  // ===== Page Elements =====
  readonly resumeManagerHeading: Locator;
  readonly searchResumeInput: Locator;
  readonly uploadButton: Locator;

  // ===== Resume Creation =====
  readonly buildNewButton: Locator;
  readonly noResumeDataMessage: Locator;
  readonly startBuildingButton: Locator;
  readonly startFreshButton: Locator;
  readonly createFromScratchOption: Locator;

  // ===== Resume Sections =====
  readonly contactInfoSection: Locator;
  readonly workSection: Locator;
  readonly educationSection: Locator;

  // ===== Guided Resume Creation =====
  readonly guidedHelpOption: Locator;
  readonly nextButton: Locator;
  readonly guidedNameInput: Locator;
  readonly guidedEmailInput: Locator;
  readonly guidedPhoneInput: Locator;
  readonly guidedLocationInput: Locator;
  readonly summaryTextbox: Locator;
  readonly skipSummaryButton: Locator;
  readonly createResumeButton: Locator;

  // ===== Upload Resume =====
  readonly uploadResumeButton: Locator;
  readonly uploadResumeHeading: Locator;

  // ===== Finish Creation =====
  readonly finishButton: Locator;
  readonly resumeCreatedMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Navigation
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.resumeManagerSidebar = page.getByRole('link', { name: 'Resume Manager' });

    // Page elements
    this.resumeManagerHeading = page.getByRole('heading', { name: 'Resume Manager' });
    this.searchResumeInput = page.getByRole('textbox', { name: 'Search resumes' });
    this.uploadButton = page.getByRole('button', { name: 'Upload' });

    // Resume creation
    this.buildNewButton = page.getByRole('button', { name: 'Build New' }).first();
    this.noResumeDataMessage = page.getByLabel('No resume data to clear');
    this.startBuildingButton = page.getByRole('button', { name: 'Start Building' });
    this.startFreshButton = page.getByRole('button', { name: 'Start Fresh' });
    this.createFromScratchOption = page.getByRole('button', { name: /Start from/i });

    // Guided creation
    this.guidedHelpOption = page.getByRole('button', { name: 'Yes, Help Me Get Started' });
    this.nextButton = page.getByRole('button', { name: 'Next' }).first();
    this.guidedNameInput = page.getByRole('textbox', { name: 'e.g., Jane Smith' });
    this.guidedEmailInput = page.getByRole('textbox', { name: 'e.g., jane.smith@email.com' });
    this.guidedPhoneInput = page.getByRole('textbox', { name: 'e.g., (555) 123-' });
    this.guidedLocationInput = page.getByRole('textbox', { name: 'e.g., New York, NY' });

    this.summaryTextbox = page.getByRole('textbox', { name: /Just write naturally/i });
    this.skipSummaryButton = page.getByRole('button', { name: 'Skip' });

    this.createResumeButton = page.getByRole('button', { name: 'Create Resume' });

    // Upload resume
    this.uploadResumeButton = page.getByRole('button', { name: 'Upload Resume' });
    this.uploadResumeHeading = page.getByRole('heading', { name: 'Upload Your Resume' });

    // Resume sections
    this.contactInfoSection = page.getByRole('button', { name: /Contact information/i });
    this.workSection = page.getByRole('button', { name: /Work/i });
    this.educationSection = page.getByRole('button', { name: /Education/i });

    // Finish
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.resumeCreatedMessage = page.locator('text=Resume Created!');
  }

  /**
   * Navigate to the Resume Manager page from the dashboard.
   */
  async navigateToResumeManager() {
    await expect(this.dashboardLink).toBeVisible();
    await this.resumeManagerSidebar.click();
  }

  /**
   * Verify Resume Manager page has loaded successfully.
   */
  async verifyPageLoaded() {
    await expect(this.resumeManagerHeading).toBeVisible();
    await expect(this.searchResumeInput).toBeVisible();
    await expect(this.uploadButton).toBeVisible();
  }

  /**
   * Start the resume creation flow using the "Start from Scratch" option.
   */
  async startResumeFromScratch() {
    await this.buildNewButton.click();

    if (await this.noResumeDataMessage.isVisible()) {
      await this.startBuildingButton.click();
    } else {
      await this.startFreshButton.click();
      await this.startBuildingButton.click();
    }

    await expect(this.createFromScratchOption).toBeVisible();
    await this.createFromScratchOption.click();
  }

  /**
   * Fill the Contact Information section in the resume editor.
   */
  async fillContactInfo(name: string, email: string, phone: string, location: string) {
    await this.contactInfoSection.click();

    await this.page.getByRole('textbox', { name: 'e.g., John Doe' }).fill(name);
    await this.page.getByRole('heading', { name: name }).isVisible();
    await this.page.getByRole('textbox', { name: 'e.g., john@example.com' }).fill(email);
    await this.page.getByText(email).isVisible();
    await this.page.getByRole('textbox', { name: '(555) 123-' }).fill(phone);
    await this.page.getByText(phone).isVisible();
    await this.page.getByRole('textbox', { name: 'e.g., San Francisco, CA' }).fill(location);
    await this.page.getByText(location).isVisible();
  }

  /**
   * Add work experience
   */
  async addWorkExperience(jobTitle: string, company: string, startDate: string, endDate: string) {
    await this.workSection.click();
    await this.page.getByRole('textbox', { name: 'Job Title' }).fill(jobTitle);
    await this.page.getByText(jobTitle).isVisible();
    await this.page.getByRole('textbox', { name: 'Company' }).fill(company);
    await this.page.getByText(company).isVisible();
    await this.page.getByRole('textbox', { name: 'Start Date' }).fill(startDate);
    await this.page.getByText(startDate).isVisible();
    if (endDate === 'Present') {
      await this.page.getByRole('checkbox', { name: 'Present (Current)' }).check();
      await this.page.getByText('Present').isVisible();
    } else {
      await this.page.getByRole('textbox', { name: 'End Date' }).fill(endDate);
      await this.page.getByText(endDate).isVisible();
    }

    await this.page.getByRole('button', { name: 'Add Experience' }).click();
  }

  /**
   * Add education
   */
  async addEducation(school: string, degree: string, graduationDate: string, currentlyStudying: boolean = false) {
    await this.educationSection.click();

    await this.page.getByRole('textbox', { name: 'School' }).fill(school);
    await this.page.getByText(school).isVisible();
    await this.page.getByRole('textbox', { name: 'Degree' }).fill(degree);
    await this.page.getByText(degree).isVisible();
    await this.page.getByRole('textbox', { name: 'Graduation Date' }).fill(graduationDate);
    await this.page.getByText(graduationDate).isVisible();
    if (currentlyStudying) {
      await this.page.getByRole('checkbox', { name: 'Currently Studying' }).check();
    }

    await this.page.getByRole('button', { name: 'Add Education' }).click();
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  /**
   * Start resume creation using the Guided Help flow.
   */
  async startResumeWithGuidedHelp() {
    await this.buildNewButton.click();

    if (await this.noResumeDataMessage.isVisible()) {
      await this.startBuildingButton.click();
    } else {
      await this.startFreshButton.click();
      await this.startBuildingButton.click();
    }

    await this.guidedHelpOption.click();
  }

  /**
  * Complete guided contact information steps.
  */
  async fillGuidedContactInfo(name: string, email: string, phone: string, location: string) {
    await this.guidedNameInput.fill(name);
    await this.nextButton.click();

    await this.guidedEmailInput.fill(email);
    await this.nextButton.click();

    await this.guidedPhoneInput.fill(phone);
    await this.nextButton.click();

    await this.guidedLocationInput.fill(location);
    await this.nextButton.click();

    await this.page.keyboard.press('Control+Enter');
    await this.page.keyboard.press('Control+Enter');
    await this.page.keyboard.press('Control+Enter');

    await this.nextButton.click();

    await this.createResumeButton.click();
    await this.nextButton.click();
  }

// async skipSummary() {
//   await this.page.keyboard.press('Control+Enter');
//   await this.page.keyboard.press('Control+Enter');
//   await this.page.keyboard.press('Control+Enter');

//   await this.nextButton.click();
// }

  /**
   * Make sure all required sections been completed in guided flow. If any section is incomplete, fill it out with sample data.
   */
  async verifyGuidedresumeCreationComplete(name: string) {
    
    const workSectionText = await this.workSection.innerText();
    const educationSectionText = await this.educationSection.innerText();
    if (workSectionText.toLowerCase().includes('incomplete')) {
      await this.addWorkExperience(
        'QA Engineer',
        'Tech Company',
        '2026-01-12',
        'Present'
      );
    }

    if (educationSectionText.toLowerCase().includes('incomplete')) {
      await this.addEducation(
        'State University',
        'Bachelor of Science in Computer Science',
        '2025-01-01',
        true
      ); 
    }
  }

  /**
   * Upload an existing resume file (PDF).
   */
  async uploadResume(filePath: string) {
    await this.uploadResumeButton.click();
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.resolve(filePath));
  }

/**
 * Verify resume be uploaded
 */
  async verifyResumeUploaded(name: string) {
    await expect(this.page.getByRole('heading', { name })).toBeVisible();
    await this.nextButton.click();

  }

  /** 
   *  Create a resume using the upload flow. 
   */
  async creteResumeWithUpload(filePath: string, name: string) {
    await this.buildNewButton.click();
    if (await this.noResumeDataMessage.isVisible()) {
        await this.uploadResume(filePath);
      } else {
        await this.startFreshButton.click();
        await this.uploadResume(filePath);
      }
  }

  /**
   * Finish resume creation
   */
  async finishResumeCreation() { 
    await this.finishButton.click();
  }

  /**
   * Verify that a resume was successfully created and appears in the list.
   */
  async verifyResumeCreated(name: string) {
    await expect(this.resumeCreatedMessage).toBeVisible();

    await this.page.getByRole('button', { name: 'Go to Resume Manager' }).click();

    const resumeCheckbox = this.page.getByRole('checkbox', { name: new RegExp(name, 'i') });
    await expect(resumeCheckbox).toBeVisible();
  }

  /**
   * Open the Quick Actions menu for a specific resume row.
   */
  async openResumeActions(name: string) {
  const row = this.page.getByRole('checkbox', { name: new RegExp(name, 'i') });
  await row.getByLabel('More actions').click();
  }

  /**
   * Duplicate an existing resume.
   */
  async duplicateResume(name: string) {
  await this.openResumeActions(name);

  await this.page.getByRole('menuitem', { name: 'Duplicate' }).click();
  }

  /**
   * Verify the duplicated resume appears with "(Copy)" in the name.
   */
  async verifyResumeDuplicated(name: string) {
    const resumeCheckbox = this.page.getByRole('checkbox', {
     
      name: new RegExp(`^${name} \\(Copy\\)`, 'i')
    });

  await expect(resumeCheckbox).toBeVisible();
  }

/**
 * Ensure the download directory exists.
 * Creates the folder if it does not already exist.
 */
ensureDownloadFolder() {
  const downloadDir = path.resolve('download-data');

  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }

  return downloadDir;
}

/**
 * Download a resume PDF and verify it exists locally.
 */
async downloadResume(name: string) {

  const downloadDir = this.ensureDownloadFolder();

  await this.openResumeActions(name);

  const downloadPromise = this.page.waitForEvent('download');

  await this.page.getByRole('menuitem', { name: 'Download PDF' }).click();

  const download = await downloadPromise;

  const filePath = path.join(downloadDir, download.suggestedFilename());

  await download.saveAs(filePath);

  expect(fs.existsSync(filePath)).toBeTruthy();
}

/**
 * Delete a resume from the Resume Manager list.
 */
async deleteResume(name: string) {
  await this.openResumeActions(name);
  await this.page.getByRole('menuitem', { name: 'Delete' }).click();
  await expect(this.page.getByRole('dialog')).toBeVisible();
  await this.page.getByRole('button', { name: 'Delete' }).click(); 
}

// async cleanUpResume() {
//   await this.page.getByRole('checkbox', { name: 'select all resumes' }).check();
//   await this.page.getByRole('button', { name: 'Delete' }).click();
//   await this.page.getByRole('button', { name: 'Delete' }).click();
// }

/**
 * Verify that a resume has been successfully deleted.
 */
async verifyResumeDeleted(name: string) {
  await this.page.reload();
  const resumeCheckbox = this.page.getByRole('row', {
    name: new RegExp(name, 'i')
  });
    await expect(resumeCheckbox).not.toBeVisible();
  }
}

// function timeout(arg0: number): { timeout?: number; visible?: boolean; } | undefined {
//   throw new Error('Function not implemented.');
// }
