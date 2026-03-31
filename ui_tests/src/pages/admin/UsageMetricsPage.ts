import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class UsageMetricsPage extends BasePage {
  readonly usageMetricsLink: Locator;
  readonly realTimeActivityTab: Locator;
  readonly overviewTab: Locator;

  constructor(page: Page) {
    super(page);

    // Usage Metrics page link in the sidebar
    this.usageMetricsLink = this.page.getByRole('link', { name: 'Usage Metrics' });

    // Overview tab
    this.overviewTab = this.page.getByRole('tab', { name: 'Overview', exact: true });

    // Real-time Activity tab
    this.realTimeActivityTab = this.page.getByRole('tab', { name: 'Real-time Activity', exact: true });

  }

  // Activity Metrics Locator
  readonly activityMetricsHeading = this.page.getByRole('heading', { name: 'Activity Metrics' });

  //Unique Users Login Locator
  readonly uniqueUsersLoginHeading = this.page.getByText('Unique User Logins');

  //unique User Logins Count (first numeric span after Unique User Logins text)
  readonly uniqueUserLoginsCount = this.page.getByText(/Unique User Logins/);

  // Active Users Now heading
  readonly activeUsersHeading = this.page.getByRole('heading', { name: 'Active Users Now' });

  // Active Users Now count (first numeric span)
  readonly activeUsersCount = this.page.locator('span').filter({ hasText: /^\d+$/ });

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
    return parseInt(loginCountText, 10);

  } 

  async locateRealTimeActivityTab() {
    await expect(this.page).toHaveURL(/\/admin\/usage-metrics$/);
    await expect(this.realTimeActivityTab).toBeVisible({ timeout: 5000 });
    await this.realTimeActivityTab.click();
  }

  async locateActiveUsersHeading() {
    await expect(this.activeUsersHeading).toBeVisible({ timeout: 5000 });
  }

  async getactiveUsersNowCount(): Promise<number> {
    await this.locateActiveUsersHeading();
    const countText = await this.activeUsersCount.first().innerText();
    return parseInt(countText, 10);
  }
  
}
