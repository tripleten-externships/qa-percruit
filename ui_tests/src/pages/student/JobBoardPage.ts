import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class JobBoardPage extends BasePage {

  // ===== Navigation Locators =====
  readonly dashboardLink: Locator;
  readonly recommendedJobsLink: Locator;
  

  // ===== Search Section Locators =====
  //readonly topSearchInput: Locator;
  readonly jobSearchInput: Locator;
  readonly locationInput: Locator;
  readonly recommendedJobsDropdown: Locator;

  constructor(page: Page) {
    super(page);

    // Navigation
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.recommendedJobsLink = page.getByRole('link', { name: 'Recommended Jobs' });
    this.recommendedJobsDropdown = page.locator('p:has-text("Recommended Jobs")');

    // Job Board Elements
    //this.topSearchInput = page.locator('input[placeholder="Search"]');
    this.jobSearchInput = page.getByPlaceholder('Search for jobs by title, skills, or company');
    this.locationInput = page.getByPlaceholder("Enter location or 'Remote'");
  }

  // ===== Actions =====
  async navigateToRecommendedJobs() {
    await this.recommendedJobsLink.click();
  }

  async navigateToDashboard() {
    await this.dashboardLink.click();
  }

  // async clickSidebarSearch() {
  //   await this.topSearchInput.click();
  // }

  async selectRecommendedJobsFromDropdown() {
    await this.recommendedJobsDropdown.click();
  }

  // ===== Assertions =====
  async verifyPageLoaded() {
    //await expect(this.topSearchInput).toBeVisible();
    await expect(this.jobSearchInput).toBeVisible();
    await expect(this.locationInput).toBeVisible();
  }
}
