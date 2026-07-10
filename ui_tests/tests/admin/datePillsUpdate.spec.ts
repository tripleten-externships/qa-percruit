import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/common/LoginPage';

test.describe('Admin - Usage Metrics Date Filters', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.loginAsUserType('Admin');
  });

  async function openUsageMetrics(page: Page) {
    const usageMetricsNav = page
      .getByRole('link', { name: /Usage Metrics/i })
      .or(page.getByRole('button', { name: /Usage Metrics/i }))
      .or(page.getByText(/^Usage Metrics$/i))
      .first();

    await expect(usageMetricsNav).toBeVisible({ timeout: 15000 });
    await usageMetricsNav.click();

    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    console.log('CURRENT URL:', page.url());
    console.log('PAGE TEXT AFTER CLICKING USAGE METRICS:');
    console.log(await page.locator('body').innerText());
  }

  async function applyTimeFilter(page: Page) {
    const timeFilterText =
      /Today|24 hours|Last 24 hours|24h|1D|7D|7 days|Last 7 days|30D|30 days|Last 30 days|This week|This month|Last week|Last month|All time/i;

    const timeFilter = page
      .getByRole('button', { name: timeFilterText })
      .or(page.getByRole('tab', { name: timeFilterText }))
      .or(
        page
          .locator('button, [role="button"], [role="tab"], a, div, span')
          .filter({ hasText: timeFilterText })
      )
      .or(page.getByText(timeFilterText))
      .first();

    await expect(timeFilter).toBeVisible({ timeout: 20000 });

    await timeFilter.scrollIntoViewIfNeeded();
    await timeFilter.click();

    await expect(timeFilter).toBeVisible();
  }

  test('User can view Usage Metrics and apply time filter', async ({ page }) => {
    await openUsageMetrics(page);
    await applyTimeFilter(page);
  });
});