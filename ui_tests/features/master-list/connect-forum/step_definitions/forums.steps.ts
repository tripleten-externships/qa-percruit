import { Given, When, Then, Before } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
// Import environment configuration and Page Object Models

import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';
import { ForumsPage } from '../../../../src/pages/student/ForumsPage'
// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let forumsPage: ForumsPage;

Before(async function() {
  // Assuming this.page is initialized in custom World
  loginPage = new LoginPage(this.page);
  forumsPage = new ForumsPage(this.page);
});

// ----------------------
// Scenario 1: Verify Forums page loads
// ----------------------
When('the student navigates to the Forums page', async function () {
  await forumsPage.navigateToForums();
});

Then('the Forums page is displayed', async function () {
  await forumsPage.verifyPage();
  console.log('Forums Page verified');
});

// ----------------------
// Scenario 2: New Post modal
// ----------------------
Given('the student is on the Forums page', async function () {
  // Navigate and verify page (reuse existing methods)
  await forumsPage.navigateToForums();
  await forumsPage.verifyPage();
});

When('the student clicks the New Post button', async function () {
  await forumsPage.clickNewPostButton();
  console.log('New Post button clicked');
});

Then('the New Post modal should appear', async function () {
    await forumsPage.verifyNewPostModalVisible();
});

When('the student enters a title', async function () {
    await forumsPage.enterPostTitle('My Test Post');
    console.log('Post title entered');
});
When('clicks the Create Topic button', async function () {
    await forumsPage.clickCreateTopicButton();
    console.log('Create Topic button clicked');
});

Then('a message {string} should be displayed', async function (message: string) {
    await forumsPage.verifySuccessMessage(message);
    console.log('Success message verified:', message);
});

When('the student clicks the Cancel button', async function () {
  await forumsPage.clickCancelButton();
  console.log('Cancel button clicked');
});

Then('the New Post modal should close', async function () {
    await forumsPage.verifyNewPostModalHidden();
    console.log('New Post modal closed');
})
Then('the Title error message {string} should be displayed', async function (message: string) {
    await forumsPage.verifyTitleError(message);
});