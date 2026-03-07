// import { Locator, Page, expect } from '@playwright/test';
// import { BasePage } from '../common/BasePage';
// export class TrackerDashboardPage extends BasePage {
//   readonly sideBar = {
//     JOB_BOARD: 'Job Board',
//     JOB_TRACKER: 'Job Tracker',
//     RESUME_MANAGER: 'Resume Manager',
//     STUDY: 'Study',
//     INTERVIEWS: 'Interviews',
//     CODING_PRACTICE: 'Coding Practice',
//     MESSAGES: 'Messages',
//     TASKS_GOALS: 'Tasks & Goals',
//     FORUMS: 'Forums',
//     CAREER_PATH: 'Career Path',
//     CAREER_INSIGHTS: 'Career Insights',
//     INDUSTRY_NEWS: 'Industry News',
//   };
//   readonly dashboardContainer: Locator;
//   readonly sidebarMenu: Locator;
//   constructor(page: Page) {
//     super(page);
//     this.dashboardContainer = page.locator('#student-dashboard-container');
//     this.sidebarMenu = page.locator('#student-sidebar-menu');
//   }
//   async isOnDashboardPage(): Promise<boolean> {
//     return await this.dashboardContainer.isVisible();
//   }
//   // Method to select a feature from the sidebar
//   async selectJobTracker(): Promise<void> {
//     await this.page.locator(`text=${this.sideBar.JOB_TRACKER}`).click();
//     await this.page.waitForLoadState('networkidle');
//   }
//   async selectFeature(featureName: string): Promise<void> {
//     await this.page.locator(`text=${featureName}`).click();
//     await this.page.waitForLoadState('networkidle');
//   }
// }
// export class JobTrackerPage extends BasePage {
//   isVisible: any;
//   // Use Playwright locators instead of jQuery selectors
//   get trackerDashboard() { return this.page.locator('#job-tracker-dashboard'); }
//   get trackerHeader() { return this.page.locator('#job-tracker-header'); }
//   get trackerSearchBar() { return this.page.locator('#job-tracker-search-bar'); }
//   get trackerBookmarkedButton() { return this.page.locator('#job-tracker-bookmarked-button'); }
//   get trackerAppliedButton() { return this.page.locator('#job-tracker-applied-button'); }
//   get trackerInterviewingButton() { return this.page.locator('#job-tracker-interviewing-button'); }
//   get trackerNegotiatingButton() { return this.page.locator('#job-tracker-negotiating-button'); }
//   get trackerNoResponseButton() { return this.page.locator('#job-tracker-no-response-button'); }
//   jobsTable: Locator;
//   jobsRows: Locator;
//   constructor(page: Page) {
//     super(page);

//     this.jobsTable = page.locator('.jobs-table');
//     this.jobsRows = page.locator('.jobs-table tbody tr');
//   }
//   async waitForTracker(): Promise<void> {
//     await this.trackerDashboard.waitFor({ state: 'visible' });
//   }
//   async isLoaded(): Promise<boolean> {
//     return await this.trackerDashboard.isVisible();
//   }
//   async getJobCount(): Promise<number> {
//     return await this.jobsRows.count();
//   }
//   async searchForJob(searchTerm: string): Promise<void> {
//     await this.trackerSearchBar.fill(searchTerm);
//     await this.trackerSearchBar.press('Enter');
//   }
//   async clickStatusButton(status: 'bookmarked' | 'applied' | 'interviewing' | 'negotiating' | 'no-response'): Promise<void> {
//     const buttonMap = {
//       'bookmarked': this.trackerBookmarkedButton,
//       'applied': this.trackerAppliedButton,
//       'interviewing': this.trackerInterviewingButton,
//       'negotiating': this.trackerNegotiatingButton,
//       'no-response': this.trackerNoResponseButton
//     };
//     await buttonMap[status].click();
//   }
//   async verifyAllComponentsVisible(): Promise<void> {
//     await expect(this.trackerDashboard).toBeVisible();
//     await expect(this.trackerHeader).toBeVisible();
//     await expect(this.trackerSearchBar).toBeVisible();
//     await expect(this.trackerBookmarkedButton).toBeVisible();
//     await expect(this.trackerAppliedButton).toBeVisible();
//     await expect(this.trackerInterviewingButton).toBeVisible();
//     await expect(this.trackerNegotiatingButton).toBeVisible();
//     await expect(this.trackerNoResponseButton).toBeVisible();
//     await expect(this.jobsTable).toBeVisible();
//   }
// }

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class TrackerDashboardPage extends BasePage {
  // Page Elements
  readonly jobTrackerSidebar: Locator;
  readonly topSearchInput: Locator;
  readonly pageHeading: Locator;
  readonly addJobButton: Locator;
  readonly searchJobsInput: Locator;
  readonly statusGrid: Locator;
  readonly jobsTable: Locator;
  
  // Add Job Modal Elements 
  readonly addJobTitle: Locator;
  readonly aiInputDescripton: Locator;
  readonly aiMagicFillButton: Locator;
  readonly jobTitleInput: Locator;
  readonly companyInput: Locator;
  readonly locationInput: Locator;
  readonly jobUrlInput: Locator;
  readonly jobCancelButton: Locator;
  readonly saveJobButton: Locator;
  readonly deleteJobButton: Locator;
  readonly jobDescriptionInput: Locator;
  readonly jobAddedSuccessfullyMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Navigation
    this.jobTrackerSidebar = page.getByRole('link', { name: 'Jobs Tracker' });
    this.topSearchInput = page.locator('input[placeholder="Search"]');

    // Search bar
    //this.searchInput = page.locator('input[type="text"]');

    // Job Tracker's board elements
    this.pageHeading = page.getByRole('heading', { name: 'Job Tracker' });
    this.addJobButton = page.getByRole('button', { name: /add job/i });
    this.searchJobsInput = page.getByPlaceholder('Search jobs, companies, or locations...');
      // Status grid (Bookmarked, Applied, etc.)
    this.statusGrid = page.locator('[role="grid"]');
      // Jobs table show all added jobs with title, Match Score, Status, Resume, and Actions columns
    this.jobsTable = page.locator('table');

    // Add Job modal elements
    this.addJobTitle = page.getByRole('heading', { name: 'Add External Job' });
    this.aiInputDescripton = page.getByRole('textbox', { name: 'Paste job description here...' });
    this.aiMagicFillButton = page.getByRole('button', { name: /magic fill/i });
    this.jobTitleInput = page.getByRole('textbox', { name: 'Job Title' });
    this.companyInput = page.getByRole('textbox', { name: 'Company' });
    this.locationInput = page.getByRole('textbox', { name: 'Location' });
    this.jobUrlInput = page.getByRole('textbox', { name: 'Job URL' });  
    this.jobCancelButton = page.getByRole('button', { name: /cancel/i });
    this.saveJobButton = page.getByRole('button', { name: /save/i });
    this.jobDescriptionInput = page.getByRole('textbox', { name: 'Job Description', exact: true })
    this.jobAddedSuccessfullyMessage = page.getByRole('heading',{name:/job added successfully/i});
    // Delete job
    this.deleteJobButton = page.getByRole('button', { name: /delete/i });

  }

  async navigateToJobTracker() {
    await this.jobTrackerSidebar.click();
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/jobs-tracker/);
    await expect(this.pageHeading).toBeVisible();
    //await expect(this.statusGrid).toBeVisible();
    await expect(this.jobsTable).toBeVisible();
  }

  async searchJob(keyword: string) {
    await this.searchJobsInput.fill(keyword);
    await this.searchJobsInput.press('Enter');
  }

  // async getJobRow(jobTitle: string) {
  //   return this.jobsTable.getByText(jobTitle);
  // }

  // Add job using AI Magic Fill
  async addJobWithAIMagicFill(jobDescription: string) {
    await this.addJobButton.click();
    await expect(this.addJobTitle).toBeVisible();
    await expect(this.aiInputDescripton).toBeVisible();
    await this.aiInputDescripton.fill(jobDescription);
    await this.aiMagicFillButton.click();
    await expect(this.jobTitleInput).toHaveValue(/.+/);
    await expect(this.companyInput).toHaveValue(/.+/);
    await expect(this.locationInput).toHaveValue(/.+/);
    //await expect(this.jobUrlInput).toHaveValue(/.+/);
    await this.jobUrlInput.fill('https://www.linkedin.com/jobs/collections/recommended/?currentJobId=4369842099');
    await this.saveJobButton.click();
  }

  // Add job manually
  async addJobManually(title: string, company: string, location: string, url: string,jobDescription: string) { 
    await this.addJobButton.click();
    await expect(this.addJobTitle).toBeVisible();
    await expect(this.jobTitleInput).toBeVisible();
    await this.page.getByLabel('Job Title').fill(title);
    await expect(this.companyInput).toBeVisible();
    await this.page.getByLabel('Company').fill(company);
    await expect(this.locationInput).toBeVisible();
    await this.page.getByLabel('Location').fill(location);
    await expect(this.jobUrlInput).toBeVisible();
    await this.jobUrlInput.fill(url);
    await expect(this.jobDescriptionInput).toBeVisible(); 
    await this.jobDescriptionInput.fill(jobDescription);
    await this.saveJobButton.click();
  }

  // Accepted Job Added successfully
  async acceptJobAddedSuccessfully() {
    await expect(this.jobAddedSuccessfullyMessage).toBeVisible();
    await this.page.getByRole('heading', { name: 'Job Added Successfully!' }).getByRole('button').click();
    //await this.jobAddedSuccessfullyMessage.click();
  }

  // verify job is added successfully by checking for job title, company name, location and url in the jobs table
  async verifyJobAdded(title: string) {
    const jobRow = this.page.locator('table').getByRole('row', { name: title });
    await expect(jobRow).toBeVisible();
  }

  // Delete job
  async deleteJob(title: string) {
    //await this.page.locator('table').getByRole('row', { name: title }).getByRole('button', { name: /delete/i }).click();
    await this.page.getByRole('row', { name: title }).getByRole('checkbox').check();
    await this.deleteJobButton.click();
  }

  // verify job is deleted successfully by checking for job title, company name, location and url are no longer visible in the jobs table
  async verifyJobDeleted(title: string) {
    const jobRow = this.page.locator('table').getByRole('row', { name: title });
    await expect(jobRow).not.toBeVisible();
  }

}