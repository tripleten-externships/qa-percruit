import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';
export class StudentDashboardPage extends BasePage {
  readonly sideBar = {
    JOB_BOARD: 'Job Board',
    JOB_TRACKER: 'Job Tracker',
    RESUME_MANAGER: 'Resume Manager',
    STUDY: 'Study',
    INTERVIEWS: 'Interviews',
    CODING_PRACTICE: 'Coding Practice',
    MESSAGES: 'Messages',
    TASKS_GOALS: 'Tasks & Goals',
    FORUMS: 'Forums',
    CAREER_PATH: 'Career Path',
    CAREER_INSIGHTS: 'Career Insights',
    INDUSTRY_NEWS: 'Industry News',
  };
  readonly dashboardContainer: Locator;
  readonly sidebarMenu: Locator;
  constructor(page: Page) {
    super(page);
    this.dashboardContainer = page.locator('#student-dashboard-container');
    this.sidebarMenu = page.locator('#student-sidebar-menu');
  }
  async isOnDashboardPage(): Promise<boolean> {
    return await this.dashboardContainer.isVisible();
  }
  // Method to select a feature from the sidebar
  async selectJobTracker(): Promise<void> {
    await this.page.locator(`text=${this.sideBar.JOB_TRACKER}`).click();
    await this.page.waitForLoadState('networkidle');
  }
  async selectFeature(featureName: string): Promise<void> {
    await this.page.locator(`text=${featureName}`).click();
    await this.page.waitForLoadState('networkidle');
  }
}
export class JobTrackerPage extends BasePage {
  isVisible: any;
  // Use Playwright locators instead of jQuery selectors
  get trackerDashboard() { return this.page.locator('#job-tracker-dashboard'); }
  get trackerHeader() { return this.page.locator('#job-tracker-header'); }
  get trackerSearchBar() { return this.page.locator('#job-tracker-search-bar'); }
  get trackerBookmarkedButton() { return this.page.locator('#job-tracker-bookmarked-button'); }
  get trackerAppliedButton() { return this.page.locator('#job-tracker-applied-button'); }
  get trackerInterviewingButton() { return this.page.locator('#job-tracker-interviewing-button'); }
  get trackerNegotiatingButton() { return this.page.locator('#job-tracker-negotiating-button'); }
  get trackerNoResponseButton() { return this.page.locator('#job-tracker-no-response-button'); }
  jobsTable: Locator;
  jobsRows: Locator;
  constructor(page: Page) {
    super(page);

    this.jobsTable = page.locator('.jobs-table');
    this.jobsRows = page.locator('.jobs-table tbody tr');
  }
  async waitForTracker(): Promise<void> {
    await this.trackerDashboard.waitFor({ state: 'visible' });
  }
  async isLoaded(): Promise<boolean> {
    return await this.trackerDashboard.isVisible();
  }
  async getJobCount(): Promise<number> {
    return await this.jobsRows.count();
  }
  async searchForJob(searchTerm: string): Promise<void> {
    await this.trackerSearchBar.fill(searchTerm);
    await this.trackerSearchBar.press('Enter');
  }
  async clickStatusButton(status: 'bookmarked' | 'applied' | 'interviewing' | 'negotiating' | 'no-response'): Promise<void> {
    const buttonMap = {
      'bookmarked': this.trackerBookmarkedButton,
      'applied': this.trackerAppliedButton,
      'interviewing': this.trackerInterviewingButton,
      'negotiating': this.trackerNegotiatingButton,
      'no-response': this.trackerNoResponseButton
    };
    await buttonMap[status].click();
  }
  async verifyAllComponentsVisible(): Promise<void> {
    await expect(this.trackerDashboard).toBeVisible();
    await expect(this.trackerHeader).toBeVisible();
    await expect(this.trackerSearchBar).toBeVisible();
    await expect(this.trackerBookmarkedButton).toBeVisible();
    await expect(this.trackerAppliedButton).toBeVisible();
    await expect(this.trackerInterviewingButton).toBeVisible();
    await expect(this.trackerNegotiatingButton).toBeVisible();
    await expect(this.trackerNoResponseButton).toBeVisible();
    await expect(this.jobsTable).toBeVisible();
  }
}
