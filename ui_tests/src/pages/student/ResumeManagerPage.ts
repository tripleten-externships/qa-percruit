import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

/**
 * ResumeManagerPage
 * Page Object Model representing the Student Resume Manager page.
 * Contains locators and actions related to resume management.
 */
export class ResumeManagerPage extends BasePage {

  // ===== Navigation Locators =====
  readonly dashboardLink: Locator;
  readonly resumeManagerSidebar: Locator;

  // ===== Resume Manager Page Elements =====
  readonly resumeManagerHeading: Locator;
  readonly searchResumeInput: Locator;
  readonly uploadResumeButton: Locator;

  constructor(page: Page) {
    super(page);

    // ----- Navigation -----
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.resumeManagerSidebar = page.getByRole('link', { name: 'Resume Manager' });

    // ----- Resume Manager Page Elements -----
    this.resumeManagerHeading = page.getByRole('heading', { name: 'Resume Manager' });
    this.searchResumeInput = page.getByRole('textbox', { name: 'Search resumes' });
    this.uploadResumeButton = page.getByRole('button', { name: 'Upload' });
  }

  /**
   * Navigates to the Resume Manager page using the sidebar menu.
   */
  async navigateToResumeManager() {
    await expect(this.dashboardLink).toBeVisible();
    await expect(this.resumeManagerSidebar).toBeVisible();

    await this.resumeManagerSidebar.click();
  }

  // ===== Assertions =====

  /**
   * Verifies that the Resume Manager page has loaded successfully.
   */
  async verifyPageLoaded() {
    await expect(this.resumeManagerHeading).toBeVisible();
    await expect(this.searchResumeInput).toBeVisible();
    await expect(this.uploadResumeButton).toBeVisible();
  }
}