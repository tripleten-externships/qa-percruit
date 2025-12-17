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
// Step definitions for Forums page navigation
When('the student navigates to the Forums page', async function () {
  await this.page.goto(env.getBaseUrl() + 'forums');
  await expect(this.page).toHaveURL(/forums/);
});

Then('the Forums page is displayed', async function () {
   await forumsPage.verifyPage();
  console.log('Forums Page verified');
});


// Steps for New Post Modal functionality
Given('the student is on the Forums page', async function () {
  await this.page.goto(env.getBaseUrl() + 'forums');
  await forumsPage.verifyPage();
});

When('the student clicks the New Post button', async function () {
  const newPostButton = this.page.locator('body >> button:has-text("New Post")');
  await newPostButton.waitFor({ state: 'visible', timeout: 20000 });
  await newPostButton.click();
});

Then('the new post modal should appear', async function () {
  await expect(forumsPage.NewPostModal).toBeVisible();
});

When('the student clicks the Create Topic button', async function () {
  await forumsPage.createPostWithoutTitle();
});

Then('it shows an error Title is required', async function () {
  await expect(forumsPage.TitleError).toBeVisible();
});

When('the student clicks the Cancel button', async function () {
  await forumsPage.cancelNewPost();
});

Then('the new post modal should close', async function () {
  await expect(forumsPage.NewPostModal).toHaveCount(0);
});

Then('the student should remain on the Forums page', async function () {
  await forumsPage.verifyPage();
});

// Steps for verifying post category options








