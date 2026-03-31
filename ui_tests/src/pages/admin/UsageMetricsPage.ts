import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class UsageMetricsPage extends BasePage {
  readonly usageMetricsLink: Locator;
  readonly realTimeActivityTab: Locator;

  constructor(page: Page) {
    super(page);

    // Usage Metrics page link in the sidebar
    this.usageMetricsLink = this.page.getByRole('link', { name: 'Usage Metrics' });

    // Real-time Activity tab
    this.realTimeActivityTab = this.page.getByRole('tab', { name: 'Real-time Activity', exact: true });
  }

  // Active Users Now heading
  readonly activeUsersHeading = this.page.getByRole('heading', { name: 'Active Users Now' });

  // Active Users Now count (first numeric span)
  readonly activeUsersCount = this.page.locator('span').filter({ hasText: /^\d+$/ });

  async locateUsageMetricsLink() {
    await expect(this.usageMetricsLink).toBeVisible({ timeout: 5000 });
    await this.usageMetricsLink.click();
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
