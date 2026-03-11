import { test, expect } from '@playwright/test';
import { UsageMetricsPage } from '../../src/pages/admin/UsageMetricsPage';
import { LoginPage } from '../../src/pages/common/LoginPage';

test.describe('Admin - Usage Metrics Page', () => {
  let loginPage: LoginPage;
  let usageMetricsPage: UsageMetricsPage;  

  test.beforeEach(async ({ page, baseURL }) => {
    loginPage = new LoginPage(page);
    usageMetricsPage = new UsageMetricsPage(page);   

    // Navigate to Usage Metrics page
    await page.goto(baseURL!);
    await loginPage.loginAsUserType('Admin');
    await page.getByRole('link', { name: 'Usage Metrics' }).first().click();
    await expect(page).toHaveURL(/usage-metrics/);

  });   
  

  test('User can click tabs and see Real-time Activity content', async ({ page }) => {
    const tabName = 'Real-time Activity';

    // Click the tab
    const tab = page.getByRole('tab', { name: tabName, exact: true });
    await tab.click({ timeout: 30000 });

    // Verify tab content loads (tab should be visible/active)
    await expect(tab).toBeVisible();
    await expect(tab).toHaveClass(/active|selected/); // ensure it’s highlighted
  });
});