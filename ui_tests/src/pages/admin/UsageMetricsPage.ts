import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

// Page Object Model (POM) class for the Events page
export class UsageMetricsPage extends BasePage {
  // Constructor to initialize the page object
  constructor(page: Page) {
    super(page);
  }

  // Define element locators for Events page
  readonly usagemetricsHeading = this.page.getByRole('heading', { name: 'Admin Usage Metrics' });


  // Methods to carry out actions on the Events page
  async clickButtonByText(buttonText: string): Promise<void> {
      await this.page.getByRole('button',{name:buttonText}).click();
  }


  async isOnUsageMetricsPage(): Promise<boolean> {
    // Wait for the heading to be visible to ensure the page has loaded
    await expect(this.usagemetricsHeading).toBeVisible();
    // Return the visibility state (true) after waiting
    return await this.usagemetricsHeading.isVisible();

  }
}