import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/common/LoginPage';

test.describe('Admin - Real Time Activity', () => {
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

    await expect(
      page
        .getByRole('heading', { name: /Usage Metrics|Analytics|Activity/i })
        .or(page.getByText(/Usage Metrics|Real[-\s]?time Activity/i))
        .first()
    ).toBeVisible({ timeout: 15000 });
  }

  async function openRealTimeActivity(page: Page) {
    const realTimeActivityTab = page
      .getByRole('tab', { name: /Real[-\s]?time Activity/i })
      .or(page.getByRole('button', { name: /Real[-\s]?time Activity/i }))
      .or(page.getByText(/Real[-\s]?time Activity/i))
      .first();

    await expect(realTimeActivityTab).toBeVisible({ timeout: 15000 });
    await realTimeActivityTab.click();

    await expect(page.getByText(/Real[-\s]?time Activity/i).first()).toBeVisible();
  }

  test('User can view Real Time Activity and apply time filter', async ({ page }) => {
    await openUsageMetrics(page);
    await openRealTimeActivity(page);

    const timeFilter = page
      .getByRole('button', {
        name: /Today|24 hours|7 days|30 days|This week|This month|Last week|Last month/i,
      })
      .first();

    await expect(timeFilter).toBeVisible({ timeout: 15000 });
    await timeFilter.click();

    await expect(timeFilter).toBeVisible();
  });
});