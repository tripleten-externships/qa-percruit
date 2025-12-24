import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

class JobTrackerPage extends BasePage {
  isVisible: any;
  // Use Playwright locators instead of jQuery selectors
  get trackerDashboard() { return this.page.locator('#job-tracker-dashboard'); }
  get trackerHeader() { return this.page.locator('#job-tracker-header'); }

  // selector for <table class="jobs-table">
  get jobsTable() { return this.page.locator('.jobs-table'); }

  // rows inside the jobs table (use Playwright xpath locator)
  get jobsRows() { return this.page.locator('xpath=//*[@id="root"]/div/main/div/div/main/div/div[2]/div[4]/table/tbody/tr'); }

  async waitForTracker() {
    // Playwright Locator.waitFor with visible state
    await this.trackerDashboard.waitFor({ state: 'visible', timeout: 5000 });
  }

    async isLoaded(): Promise<boolean> {
      // pass a Locator to the helper (assumes BasePage.isVisible accepts a Locator)
      return this.isVisible(this.page.locator('xpath=//*[@id="root"]/div'));
    }
  }