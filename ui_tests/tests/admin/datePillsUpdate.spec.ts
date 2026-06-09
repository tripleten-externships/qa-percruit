import { test, expect } from '@playwright/test';

test.describe('Admin - Real Time Activity', () => {

  test.beforeEach(async ({ page }) => {
    // Assumes user is already logged in and on Analytics/Usage Metrics page
    await page.goto('/analytics/usage-metrics'); // Adjust base URL if needed
  });
/*Scenario Outline: Verify Time Filters update counts correctly
  When I add the title "//nScenario: Verify Time Filters update counts correctly" to the log
  And the user is on Real Time Activity tab
  And apply the "<timeFilter>" time filter
  Then user should see the usage counts updated for "<timeFilter>"

    Examples:
    | timeFilter       |
    | Today            |
    | Last 7 days      |
    | This Year        |*/
  test('User can view Real Time Activity and apply time filter', async ({ page }) => {
    // Navigate to Real-Time Activity tab
    const realTimeTab = page.getByRole('tab', { name: 'Real-time Activity' });
    await realTimeTab.click();
    await expect(realTimeTab).toHaveClass(/active|selected/);

    // Apply a specific time filter
    const timeFilter = 'Last 24 Hours'; // Example, replace with your dynamic filter
    const filterButton = page.getByRole('button', { name: timeFilter });
    await filterButton.click();

    // Verify usage counts updated for the selected filter
    const heading = page.getByRole('heading', { name: `Activity Timeline - ${timeFilter}` });
    await expect(heading).toBeVisible();

    console.log('✅ Activity Timeline heading:', await heading.textContent());
  });

});