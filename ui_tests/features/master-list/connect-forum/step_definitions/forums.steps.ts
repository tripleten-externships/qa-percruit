import { Given, When, Then, Before } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
// Import environment configuration and Page Object Models

import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';
import { ForumsPage } from '../../../../src/pages/student/ForumsPage';
// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let forumsPage: ForumsPage;

Before(async function() {
  // Assuming this.page is initialized in custom World
  loginPage = new LoginPage(this.page);
  forumsPage = new ForumsPage(this.page);
});

/**
 * Step: Student navigates to a specific page
 */

Given('the student is on the Forums page', async function () {
  await this.page.goto(env.getBaseUrl() + 'forums');
  await expect(this.page).toHaveURL(/forums/);
});
/**
 * Clicking buttons
 */
When('the student clicks the New Post button', async function () {
    // Wait for page and network
    await this.page.waitForLoadState('networkidle');

    // Wait for Forums heading
    const forumsHeading = this.page.locator('//h5[contains(text(), "Forums")]');
    await forumsHeading.waitFor({ state: 'visible', timeout: 20000 });

    // Close cookie banner if present
    const cookieButton = this.page.locator('//button[text()="Accept"]');
    if (await cookieButton.isVisible()) await cookieButton.click();

    // Flexible locator for New Post button
    const newPostBtn = this.page.locator('//button[contains(normalize-space(.), "New Post")]');

    // Wait until visible
    await newPostBtn.waitFor({ state: 'visible', timeout: 20000 });

    // Scroll into view and click
    await newPostBtn.scrollIntoViewIfNeeded();
    await newPostBtn.click({ force: true }); // optional force if blocked
});

/**
 * Verify modal
 */
Then('the new post modal should appear', async function () {
  await forumsPage.expectNewPostModalVisible();
});

When('the student clicks the Cancel button in the modal', async function () {
  await forumsPage.clickCancelInModal();
});



Then('the new post modal should close', async function () {
  await forumsPage.expectNewPostModalHidden();
});

/**
 * Verify student stays on Forums page
 */
Then('the student should remain on the Forum page', async function () {
  const currentURL = this.page.url();
  expect(currentURL.toLowerCase()).toContain('forums');
});







