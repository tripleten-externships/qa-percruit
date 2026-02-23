import { test, expect } from '@playwright/test';

test.describe('Student - Job Tracker Dashboard', () => {

  /* Scenario: Successful login to dashboard without issue
    Given the student navigates to the Job Tracker page
    Then the dashboard loads correctly
    And the student should be able to access their application tracker without issues */

  test('Dashboard loads correctly', async ({ page }) => {
    // Navigate to dashboard (adjust route if needed)
    // await page.goto('/job-tracker');

    const dashboard = page.locator("//*[@id='root']//main//div[contains(@class,'MuiBox-root')]");
    const jobsTable = page.locator("//div[contains(@class,'MuiPaper-root')]//table");

    await expect(dashboard).toBeVisible();
    await expect(page.locator('main h4', { hasText: 'Job Tracker' })).toBeVisible();
    await expect(page.locator("//div[contains(@class,'MuiTextField-root')]//input[@type='text']")).toBeVisible();

    await expect(page.locator("//button[contains(.,'Bookmarked')]")).toBeVisible();
    await expect(page.locator("//button[contains(.,'Applied')]")).toBeVisible();
    await expect(page.locator("//button[contains(.,'Interviewing')]")).toBeVisible();
    await expect(page.locator("//button[contains(.,'Negotiating')]")).toBeVisible();
    await expect(page.locator("//button[contains(.,'Offer Received')]")).toBeVisible();

    await expect(jobsTable).toBeVisible();
  });

  /* Scenario: Dashboard fails to load after login
    Given the student navigates to the Job Tracker page
    When the dashboard should not load successfully
    Then an error message should be displayed to the student
    And the application tracker should not be accessible*/

  test('Dashboard should not load successfully', async ({ page }) => {
    const dashboard = page.locator("//*[@id='root']//main//div[contains(@class,'MuiBox-root')]");
    await expect(dashboard).not.toBeVisible({ timeout: 10000 });
  });

  test('Error message displayed when dashboard fails', async ({ page }) => {
    const errorMessage = page.locator('#job-tracker-error-message');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(
      'Unable to load Job Tracker data. Please try again later.'
    );
  });

  test('Application tracker should not be accessible', async ({ page }) => {
    const dashboard = page.locator("//*[@id='root']//main//div[contains(@class,'MuiBox-root')]");
    await expect(dashboard).not.toBeVisible();
  });

  /* Scenario: Dashboard loads partially with missing components
    Given the student navigates to the Job Tracker page
    When the dashboard should load partially
    Then required UI components (such as status tiles or application list) should be missing
    And a warning or fallback message should be displayed
    And the student should not be able to fully access their application tracker */

  test('Dashboard loads partially', async ({ page }) => {
    const dashboard = page.locator("//*[@id='root']//main//div[contains(@class,'MuiBox-root')]");
    const jobsTable = page.locator("//div[contains(@class,'MuiPaper-root')]//table");

    await expect(dashboard).toBeVisible();
    await expect(jobsTable).not.toBeVisible();
  });

  test('Required UI components should be missing', async ({ page }) => {
    await expect(page.locator("//button[contains(.,'Bookmarked')]")).not.toBeVisible();
    await expect(page.locator("//button[contains(.,'Applied')]")).not.toBeVisible();
    await expect(page.locator("//button[contains(.,'Interviewing')]")).not.toBeVisible();
    await expect(page.locator("//button[contains(.,'Negotiating')]")).not.toBeVisible();
    await expect(page.locator("//button[contains(.,'Offer Received')]")).not.toBeVisible();
  });

  test('Warning or fallback message should be displayed', async ({ page }) => {
    const warningMessage = page.locator('#job-tracker-warning-message');

    await expect(warningMessage).toBeVisible();
    await expect(warningMessage).toHaveText(
      'Some features of the Job Tracker are currently unavailable. Please try again later.'
    );
  });

  test('Student cannot fully access tracker during partial load', async ({ page }) => {
    const dashboard = page.locator("//*[@id='root']//main//div[contains(@class,'MuiBox-root')]");
    const jobsTable = page.locator("//div[contains(@class,'MuiPaper-root')]//table");

    await expect(dashboard).toBeVisible();
    await expect(jobsTable).not.toBeVisible();
  });

  /* Scenario: Dashboard loads but application tracker data fails
    Given the student navigates to the Job Tracker page
    When the dashboard should load correctly
    But the application tracker data should fail to load
    Then an error message should be shown indicating data retrieval failed
    And the student should not be able to see their list of applications */

  test('Application tracker data fails to load', async ({ page }) => {
    const jobsTable = page.locator("//div[contains(@class,'MuiPaper-root')]//table");
    await expect(jobsTable).not.toBeVisible();

    const errorMessage = page.locator('#job-tracker-error-message');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(
      'Failed to retrieve Job Tracker data. Please try again later.'
    );
    await expect(jobsTable).not.toBeVisible();
  });

  /* Scenario: Job Tracker feature unavailable
    Given the student navigates to the Job Tracker page
    But the feature cannot be selected
    Then a message should appear indicating the Job Tracker service is currently unavailable
    And the dashboard should not load
    And no application tracker information should be displayed*/

  test('Service unavailable message should appear', async ({ page }) => {
    const serviceUnavailableMessage = page.locator(
      '#job-tracker-service-unavailable-message'
    );
    await expect(serviceUnavailableMessage).toBeVisible();
    await expect(serviceUnavailableMessage).toHaveText(
      'The Job Tracker service is currently unavailable. Please try again later.'
    );
    const dashboard = page.locator("//*[@id='root']//main//div[contains(@class,'MuiBox-root')]");
    await expect(dashboard).not.toBeVisible();
    const jobsTable = page.locator("//div[contains(@class,'MuiPaper-root')]//table");
    await expect(jobsTable).not.toBeVisible();
  });

});