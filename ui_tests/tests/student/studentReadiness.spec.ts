import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/common/LoginPage';

let loginPage: LoginPage;
test.describe('Admin - Usage Metrics - Student Readiness', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
    await loginPage.loginAsUserType('Admin');

    // Navigate to Student Readiness
    await page.getByRole('link', { name: 'Student Readiness' }).click();
    

    await expect(
      page.getByRole('heading', { name: 'Student Career Readiness' })
    ).toBeVisible();
  });

  /* Scenario: Student Readiness tab loads correctly from the Analytics & Insights sidebar section
    When the Admin views the "Student Readiness" metrics
    Then the Admin should see the "Student Readiness Analysis" table
    And the table should include the following columns:
      | Student | Readiness Score | Status | Jobs Applied | Interviews Completed | Mentor | Actions |    
    And the Admin should see a "Refresh Data" button*/

  test('Student Readiness table is displayed correctly', async ({ page }) => {
    
    await expect(
      page.getByText('Student Readiness Analysis', { exact: true })
    ).toBeVisible();

    await expect(page.locator('table')).toBeVisible();

    const expectedColumns = [
      'Student',
      'Career Coach',
      'Readiness Score',
      'Status',
      'Jobs Applied',
      'Interviews Completed',
      'Actions'
    ];

    for (const column of expectedColumns) {
      await expect(
        page.getByRole('columnheader', { name: column }),
        `Column "${column}" not found`
      ).toBeVisible();
    }

    await expect(
      page.getByRole('button', { name: 'Refresh Data' })
    ).toBeVisible();
  });

  /* Scenario: Filter students by Status
    Given the Student Readiness table is displayed
    When the Admin filters students by a specific status "Active"
    Then only students matching the selected status should be displayed */

  test('Filter students by Active status', async ({ page }) => {

    // Open dropdown
    await page.getByText('All Status').click();

    // Select status
    await page.getByRole('option', { name: 'Active', exact: true }).click();

    // Refresh/sort
    await page.getByRole('columnheader', { name: 'Status' }).click();

    // Wait for results
    await page.waitForSelector('table', { state: 'visible' });
    //await page.waitForSelector('span.MuiChip-label');

    const statuses = await page
    .getByRole('cell', { name: 'Active' })
    .allTextContents();

    expect(statuses.length).toBeGreaterThan(0);
    for (const status of statuses) {
      expect(status).toBe('Active');
    }
  });
    

});