import { Given, When, Then, Before } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { UsageMetricsPage } from '../pages/admin/UsageMetricsPage';

interface CustomWorld {
  page: Page;
  usagemetricsPage?: UsageMetricsPage;
}

Before(async function () {
  this.usagemetricsPage = new UsageMetricsPage(this.page);
});

// ===============================
// GIVEN STEPS
// ===============================

Given('the Admin user navigates to usage-metrics page', async function (this: CustomWorld) {
  const { page } = this;

  await page.getByRole('button', { name: 'ANALYTICS & REPORTING' }).click();
  await page.getByRole('button', { name: 'Usage Metrics' }).click();

  await expect(page.getByRole('heading', { name: 'Admin Usage Metrics' })).toBeVisible();
});

Given('the Student Readiness table is displayed', async function (this: CustomWorld) {
  const { page } = this;

  await page.waitForLoadState('networkidle');
  await page.getByRole('tab', { name: 'Student Readiness' }).click();

  const readinessHeader = page.getByText('Student Readiness Analysis', { exact: true });
  await expect(readinessHeader).toBeVisible({ timeout: 10000 });

  const tableLocator = page.locator('table');
  await expect(tableLocator).toBeVisible();
});

Given('the Admin navigates to the Usage Metrics page', async function () {
  await this.page.getByRole('button', { name: 'ANALYTICS & REPORTING' }).click();
  await this.page.getByRole('button', { name: 'Usage Metrics' }).click();
  await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  await this.eventsPage.clickByButtonRoleByText('Usage Metrics');
  const isOnUsageMetricsPage = await this.usagemetricsPage?.isOnUsageMetricsPage();
  expect(isOnUsageMetricsPage).toBeTruthy();
});

// ===============================
// WHEN STEPS
// ===============================

When('the Admin filters students by a specific status {string}', async function (this: CustomWorld, status: string) {
  const { page } = this;

  await page.getByText('All Status').click();
  await page.getByRole('option', { name: status, exact: true }).click();
  await page.getByRole('columnheader', { name: 'Status' }).click();

  await expect(page.getByText(status, { exact: true }).first()).toBeVisible({ timeout: 5000 });
});

When('the Admin views the {string} metrics', async function (this: CustomWorld, tabName: string) {
  const { page } = this;
  const tab = page.getByRole('tab', { name: tabName });
  await tab.click();
  await expect(tab).toHaveClass(/active|selected/);
});

When('the user is on Real Time Activity tab', async function () {
  await this.page.getByRole('tab', { name: 'Real-time Activity' }).click();
});

When('apply the {string} time filter', async function (filterLabel: string) {
  await this.page.getByRole('button', { name: filterLabel }).click();
});

When('the user click on the {string} tab', async function (tabName: string) {
  await this.page.getByRole('tab', { name: tabName });
});

// ===============================
// THEN STEPS
// ===============================

Then('only students matching the selected status should be displayed', async function (this: CustomWorld) {
  const { page } = this;

  await page.waitForSelector('table', { state: 'visible', timeout: 15000 });
  await page.waitForSelector('span.MuiChip-label', { timeout: 10000 });

  const statuses = await page.$$eval('span.MuiChip-label', (elements) =>
    elements.map((el) => el.textContent?.trim().toLowerCase())
  );

  const activeCount = statuses.filter((s) => s === 'active').length;

  expect(statuses.length).toBeGreaterThan(0);
  expect(activeCount).toBe(statuses.length);
});

Then('the Admin should see the {string} table', async function (this: CustomWorld, tableTitle: string) {
  const { page } = this;
  const tableHeader = page.getByText(tableTitle, { exact: true });
  await expect(tableHeader).toBeVisible();
});

Then('the table should include the following columns:', async function (this: CustomWorld, dataTable) {
  const { page } = this;
  const expectedColumns = dataTable.raw().flat();

  for (const column of expectedColumns) {
    const header = page.getByRole('columnheader', { name: column });
    await expect(header, `Column "${column}" not found`).toBeVisible();
  }
});

Then('the Admin should see a {string} button', async function (this: CustomWorld, buttonName: string) {
  const { page } = this;
  const button = page.getByRole('button', { name: buttonName });
  await expect(button).toBeVisible();
});

Then('user should see the usage counts updated for {string}', async function (filterLabel: string) {
  await this.page.getByRole('heading', { name: `Activity Timeline -${filterLabel}` });
});

Then('the user should see the Real-time Activity tab content loaded successfully', async function () {
  const realTimeActivityTab = this.page.getByRole('tab', { name: 'Real-time Activity' }).first();
  await expect(realTimeActivityTab).toBeVisible();
});
