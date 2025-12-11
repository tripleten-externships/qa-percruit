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

  constructor(page: Page) {
    super(page);
  }

  async isOnDashboardPage(): Promise<boolean> {
    return this.isVisible(this.page.locator('#root'));
  }
  isVisible(arg0: Locator): boolean | PromiseLike<boolean> {
    throw new Error('Method not implemented.');
  }

  // Method to select a feature from the sidebar
  async selectJobTracker(): Promise<void> {
    await this.page.locator(`text=${this.sideBar.JOB_TRACKER}`).click();
    await this.page.waitForLoadState('networkidle');
  }
}

export class JobTrackerPage extends BasePage {
    static verifyPage() {
        throw new Error('Method not implemented.');
    }
  isVisible: any;
  // Use Playwright locators instead of jQuery selectors
  get trackerDashboard() { return this.page.locator('#job-tracker-dashboard'); }
  get trackerHeader() { return this.page.locator('#job-tracker-header'); }
  get trackerSearchBar(){ return this.page.locator('#job-tracker-search-bar'); }
  get trackerBookmarkedButton() { return this.page.locator('#job-tracker-bookmarked-button'); }
  get trackerAppliedButton() { return this.page.locator('#job-tracker-applied-button'); }
  get trackerInterviewingButton() { return this.page.locator('#job-tracker-interviewing-button'); }
  get trackerNegotiatingButton() { return this.page.locator('#job-tracker-negotiating-button'); }
  get trackerNoResponseButton() { return this.page.locator('#job-tracker-no-response-button'); }

  constructor(page: Page) {
    super(page);
  }

  // selector for <table class="jobs-table">
  get jobsTable() { return this.page.locator('.jobs-table'); }

  // rows inside the jobs table (use Playwright xpath locator)
  get jobsRows() {
    return this.page.locator('//table[contains(@class,"jobs-table")]//tbody/tr'); }

    async waitForTracker() {
      // Wait for the tracker dashboard to be visible
      await this.trackerDashboard.waitFor({ state: 'visible' });
    }
  
    async isLoaded(): Promise<boolean> {
      // pass a Locator to the helper (assumes BasePage.isVisible accepts a Locator)
      return this.isVisible(this.page.locator('xpath=//*[@id="root"]/div'));
    }
  }