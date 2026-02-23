import { test, expect } from '@playwright/test';

test.describe('Admin - Usage Metrics - Student Readiness', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to Usage Metrics
    await page.getByRole('button', { name: 'ANALYTICS & REPORTING' }).click();
    await page.getByRole('button', { name: 'Usage Metrics' }).click();

    await expect(
      page.getByRole('heading', { name: 'Admin Usage Metrics' })
    ).toBeVisible();
  });

  /* Scenario: Student Readiness tab loads correctly under Usage Metrics
    When the Admin views the "Student Readiness" metrics
    Then the Admin should see the "Student Readiness Analysis" table
    And the table should include the following columns:
      | Student | Readiness Score | Status | Jobs Applied | Interviews Completed | Mentor | Actions |    
    And the Admin should see a "Refresh Data" button*/

  test('Student Readiness table is displayed correctly', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    await page.getByRole('tab', { name: 'Student Readiness' }).click();

    await expect(
      page.getByText('Student Readiness Analysis', { exact: true })
    ).toBeVisible();

    await expect(page.locator('table')).toBeVisible();
    await page.getByRole('tab', { name: 'Student Readiness' }).click();

    const expectedColumns = [
      'Student Name',
      'Email',
      'Status',
      'Engagement Score',
      'Last Activity'
    ];

    for (const column of expectedColumns) {
      await expect(
        page.getByRole('columnheader', { name: column }),
        `Column "${column}" not found`
      ).toBeVisible();
    }
    await page.getByRole('tab', { name: 'Student Readiness' }).click();

    await expect(
      page.getByRole('button', { name: 'Refresh Data' })
    ).toBeVisible();
  });

  /* Scenario: Filter students by Status
    Given the Student Readiness table is displayed
    When the Admin filters students by a specific status "Active"
    Then only students matching the selected status should be displayed */

  test('Filter students by Active status', async ({ page }) => {
    await page.getByRole('tab', { name: 'Student Readiness' }).click();

    // Open dropdown
    await page.getByText('All Status').click();

    // Select status
    await page.getByRole('option', { name: 'Active', exact: true }).click();

    // Refresh/sort
    await page.getByRole('columnheader', { name: 'Status' }).click();

    // Wait for results
    await page.waitForSelector('table', { state: 'visible' });
    await page.waitForSelector('span.MuiChip-label');

    const statuses = await page.$$eval(
      'span.MuiChip-label',
      elements => elements.map(el => el.textContent?.trim().toLowerCase())
    );

    const activeCount = statuses.filter(s => s === 'active').length;

    expect(statuses.length).toBeGreaterThan(0);
    expect(activeCount).toBe(statuses.length);
  });
    

});