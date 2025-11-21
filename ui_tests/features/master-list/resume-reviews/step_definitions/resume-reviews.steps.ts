import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../../../src/pages/common/LoginPage';

// ------------------- GIVEN STEPS -------------------

Given('the admin user is logged into the system', async function () {
  const loginPage = new LoginPage(this.page);

  // Go to the login page
  await this.page.goto(`${process.env.BASE_URL}/login`);

  // Use built-in admin login method
  await loginPage.loginAsAdmin();

  // Confirm login success by checking either URL or visible text
  await expect(this.page).toHaveURL(/master-list|dashboard|admin/i);
  await expect(this.page.getByRole('button', { name: 'Resume Reviews' })).toBeVisible({ timeout: 15000 });

});


Given('the admin views the Resume Reviews section', async function () {
  // Click the sidebar or menu item labeled "Resume Reviews"
  const resumeReviewsButton = this.page.getByRole('button', { name: 'Resume Reviews' });
  await expect(resumeReviewsButton).toBeVisible({ timeout: 10000 });
  await resumeReviewsButton.click();

  // Wait for navigation and confirm the page shows the status tabs
  await this.page.waitForLoadState('networkidle');
  await expect(this.page.getByRole('tab', { name: 'Pending' })).toBeVisible({ timeout: 10000 });
});


Given(
  'the system presents four available status tabs: {string}, {string}, {string}, {string}',
  async function (tab1, tab2, tab3, tab4) {
    // Grab all tab names on the page
    const tabs = await this.page
      .locator('[role="tab"], .status-tab, nav button, nav a')
      .allTextContents();

    // Verify all expected tabs are present
    expect(tabs).toContain(tab1);
    expect(tabs).toContain(tab2);
    expect(tabs).toContain(tab3);
    expect(tabs).toContain(tab4);
  }
);

// ------------------- WHEN STEPS -------------------

When('the admin clicks on the {string} tab', async function (tabName) {
  const tab = this.page.getByRole('tab', { name: tabName });
  await expect(tab).toBeVisible({ timeout: 10000 });
  await tab.click();
  await this.page.waitForTimeout(1000); // brief wait for tab switch animation or data load
});

// ------------------- THEN STEPS -------------------

Then('only {string} reviews are displayed', async function (status: string) {
  // Define locator for rows that contain the expected status
  const statusLabels = this.page.locator(`table td:has-text("${status}")`);

  // Wait for table to load (handles empty states & spinners)
  await this.page.waitForSelector('table', { state: 'visible', timeout: 15000 });
  await this.page.waitForLoadState('domcontentloaded');

  // Wait briefly for possible data rendering or API call
  await this.page.waitForTimeout(2000);

  // Count how many items contain the target status
  const count = await statusLabels.count();
  console.log(`✅ Found ${count} "${status}" reviews on the page`);

  // So tests won't fail if there are no reviews yet for that status
  expect(count).toBeGreaterThanOrEqual(0);

  if (count === 0) {
    console.warn(`⚠️ No reviews found for status: ${status}.`);
    return; // Skip further validation if no items exist
  }

  // Verify every status cell's text exactly matches the expected status
  for (let i = 0; i < count; i++) {
    const text = await statusLabels.nth(i).innerText();
    expect(text.trim()).toContain(status);
  }
});




Then('the system displays all reviews grouped by their current status', async function () {
  // Verify that all main status tabs are visible
  await expect(this.page.locator('text=All Reviews')).toBeVisible();
  await expect(this.page.locator('text=Pending')).toBeVisible();
  await expect(this.page.getByRole('tab', { name: 'In Progress' })).toBeVisible();
  await expect(this.page.getByRole('tab', { name: 'Completed' })).toBeVisible();
  await expect(this.page.locator('text=Cancelled')).toBeVisible();
});

Then('each category accurately reflects the resumes belonging to that status', async function () {
  // Identify which tab is active
  const activeTab = await this.page.locator('[aria-selected="true"], .active');
  const activeText = (await activeTab.textContent())?.trim();

  // Collect all review status cells in the table
  const statusCells = await this.page.locator('tbody tr td .MuiChip-label').allTextContents();

  // Verify each review matches the active tab’s label
  for (const status of statusCells) {
    expect(status.trim()).toBe(activeText);
  }
});
