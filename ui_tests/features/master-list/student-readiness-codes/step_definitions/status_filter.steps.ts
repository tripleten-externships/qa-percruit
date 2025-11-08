// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';

interface CustomWorld {
  page: Page;
}

Given('the Admin user navigates to usage-metrics page', async function (this: CustomWorld) {
  const { page } = this;

  // Click "ANALYTICS & REPORTING"
  await page.getByRole('button', { name: 'ANALYTICS & REPORTING' }).click();

  // Click "Usage Metrics"
  await page.getByRole('button', { name: 'Usage Metrics' }).click();

  // Verify heading
  await expect(page.getByRole('heading', { name: 'Admin Usage Metrics' })).toBeVisible();
});

/**
 * Step: Verify Student Readiness Analysis table is displayed
 */
Given('the Student Readiness table is displayed', async function (this: CustomWorld) {
  const { page } = this;

  // Wait for the page to fully load
  await page.waitForLoadState('networkidle');

  // Click on the "Student Readiness" tab under Usage Metrics
  await page.getByRole('tab', { name: 'Student Readiness' }).click();

  // Verify that the "Student Readiness Analysis" header appears
  const readinessHeader = page.getByText('Student Readiness Analysis', { exact: true });
  await expect(readinessHeader).toBeVisible({ timeout: 10000 });

  // Verify the table is visible
  const tableLocator = page.locator('table');
  await expect(tableLocator).toBeVisible();
});

// ------------------------------
// WHEN STEP
// ------------------------------
When('the Admin filters students by a specific status {string}', async function (this: CustomWorld, status: string) {
  const { page } = this;

  // Open the Status dropdown
  await page.getByText('All Status').click();

  // Choose the specific status from dropdown (e.g., Active, Engaged, Pending, Inactive)
  await page.getByRole('option', { name: status, exact: true }).click();

  // Click the "Status" column header to refresh/sort the table view
  await page.getByRole('columnheader', { name: 'Status' }).click();

  // Verify that at least one visible row shows the chosen status
  await expect(page.getByText(status, { exact: true }).first()).toBeVisible({ timeout: 5000 });
});

Then('only students matching the selected status should be displayed', async function (this: CustomWorld) {
  const { page } = this;

  // Wait for the table and status chips to appear
  await page.waitForSelector('table', { state: 'visible', timeout: 15000 });
  await page.waitForSelector('span.MuiChip-label', { timeout: 10000 });

  // Extract all visible status text
  const statuses = await page.$$eval('span.MuiChip-label', (elements) =>
    elements.map((el) => el.textContent?.trim().toLowerCase())
  );

  console.log('Statuses found:', statuses);

  // ✅ Count how many are "active"
  const activeCount = statuses.filter((s) => s === 'active').length;
  console.log(`🧮 Number of Active entries: ${activeCount}`);

  // Assertions
  expect(statuses.length).toBeGreaterThan(0); // ensure table not empty
  expect(activeCount).toBe(statuses.length);  // ensure all are Active

  console.log('✅ Verified: all students displayed have status "Active".');
});