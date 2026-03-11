import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

// Page Object Model (POM) class for the Events page
export class UsageMetricsPage extends BasePage {
<<<<<<< Updated upstream
  // Constructor to initialize the page object
  constructor(page: Page) {
    super(page);
  }

  // Define element locators for Events page
  //readonly usagemetricsHeading = this.page.getByRole('heading', { name: 'Admin Usage Metrics' });
  //readonly usagemetricsHeading = this.page.locator('//h3[contains(., "Admin Usage Metrics")]');
  readonly usagemetricsHeading = this.page.getByText('Admin Usage Metrics');
=======
  readonly usageMetricsLink: Locator;
  readonly realTimeActivityTab: Locator;
  // readonly realTimeActivityFilterOptions: Locator;
  readonly overviewTab: Locator;

  constructor(page: Page) {
    super(page);

    // Usage Metrics page link in the sidebar
    this.usageMetricsLink = this.page.getByRole('link', { name: 'Usage Metrics' });

    // Overview tab
    this.overviewTab = this.page.getByRole('tab', { name: 'Overview', exact: true });

    // Real-time Activity tab
    this.realTimeActivityTab = this.page.getByRole('tab', { name: 'Real-time Activity', exact: true });

    //Real-time Activity timeline filter options
    // this.realTimeActivityFilterOptions = this.realTimeActivityTab.locator('xpath=following-sibling::div[1]');
  }

  // Activity Metrics Locator
  readonly activityMetricsHeading = this.page.getByRole('heading', { name: 'Activity Metrics' });

  //Unique Users Login Locator
  readonly uniqueUsersLoginHeading = this.page.getByText('Unique User Logins');

  //unique User Logins Count (first numeric span after Unique User Logins text)
  readonly uniqueUserLoginsCount = this.page.getByText(/Unique User Logins/);

  // Active Users Now heading
  readonly activeUsersHeading = this.page.getByRole('heading', { name: 'Active Users Now' });
>>>>>>> Stashed changes


<<<<<<< Updated upstream
  // Methods to carry out actions on the Events page
  async clickButtonByText(buttonText: string): Promise<void> {
      await this.page.getByRole('button',{name:buttonText}).click();
  }


  async isOnUsageMetricsPage(): Promise<boolean> {
    // Wait for the heading to be visible to ensure the page has loaded
    await this.page.waitForLoadState('networkidle');
    await expect(this.usagemetricsHeading).toBeVisible();
    // Return the visibility state (true) after waiting
    return await this.usagemetricsHeading.isVisible();
=======
  async locateUsageMetricsLink() {
    await expect(this.usageMetricsLink).toBeVisible({ timeout: 5000 });
    await this.usageMetricsLink.click();
    await expect(this.page).toHaveURL(/\/admin\/usage-metrics$/);
  }

  async locateOverviewTab() {
    await expect(this.overviewTab).toBeVisible({ timeout: 5000 });
    await this.overviewTab.click();
  }

  async activityMetricsHeadingIsVisible() {
    await expect(this.activityMetricsHeading).toBeVisible({ timeout: 5000 });
    console.log('Activity Metrics section is visible on Usage Metrics page');
  }

  async uniqueUserLoginsTextIsVisible() {
    await expect(this.uniqueUsersLoginHeading).toBeVisible({ timeout: 5000 });
    console.log('Unique User Logins section is visible on Usage Metrics page');
  }

  async getUniqueUserLoginsCount(): Promise<number> {
    await this.uniqueUserLoginsTextIsVisible();
    const loginCountText = await this.page.getByText('Unique User Logins').locator('xpath=preceding-sibling::h4').innerText();
    // const loginCountNumber = await loginCountText.locator('h2, span, div').first().innerText();
    return parseInt(loginCountText, 10);
;
  } 

  async locateRealTimeActivityTab() {
    await expect(this.page).toHaveURL(/\/admin\/usage-metrics$/);
    await expect(this.realTimeActivityTab).toBeVisible({ timeout: 5000 });
    await this.realTimeActivityTab.click();
  }

  // async getRealTimeActivityFilterOptionTexts(): Promise<string[]> {
  //   // Wait for the filter bar container to be visible
  //   await expect(this.realTimeActivityFilterOptions).toBeVisible({ timeout: 5000 });

  //   // Fetch only the buttons inside the filter bar
  //   const buttons = await this.realTimeActivityFilterOptions
  //     .locator('button.MuiButtonBase-root')
  //     .all();

  //   // Extract text safely (avoids stale locator issues)
  //   const texts = await Promise.all(
  //     buttons.map(btn => btn.textContent())
  //   );

  //   // Clean up whitespace/nulls
  //   return texts
  //     .map(t => t?.trim() ?? '')
  //     .filter(t => t.length > 0);
  // }

  // async locateRealTimeActivityFilterOptions(): Promise<Locator[]> {
  //   await expect(this.realTimeActivityFilterOptions).toBeVisible({ timeout: 5000 });
  //   // Locate all options inside dropdown
  //   const buttons = await this.page.getByRole('button').all();
  //   // const options = this.page.getByRole('button').filter({ hasText: /Today|Yesterday|Last 7 Days|This Month|Last 3 Months|Last 6 Months|This Year|Custom/i });
  //   // const timeActivityOptions = this.page.locator('button.${className}');
  //   // const options = await timeActivityOptions.all();
  //   return buttons;
  //   // Return text list
  //   // return await options.allInnerTexts();  
  // }

  async locateActiveUsersHeading() {
    await expect(this.activeUsersHeading).toBeVisible({ timeout: 5000 });
  }
>>>>>>> Stashed changes

  }
}