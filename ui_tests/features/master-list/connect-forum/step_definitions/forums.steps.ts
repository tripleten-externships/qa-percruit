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
When('the user navigates to the Forums page', async function () {
  await this.page.goto(env.getBaseUrl() + 'forums');
  await this.page.waitForLoadState('domcontentloaded');
  await expect(this.page).toHaveURL(/forums/);
});

Then('the Forums page displays', async function () {
  await forumsPage.verifyPage();
  console.log("Forums Page verified");
});

/**
 * Step: Student navigates to a specific page
 

Given('the student is on the Forums page', async function () {
  await this.page.goto(env.getBaseUrl() + 'forums');
  await expect(this.page).toHaveURL(/forums/);
});

When('the student clicks the New Post button', async function () {
  await forumsPage.clickNewPostButton();
});

Then('the new post modal should appear', async function () {
  await forumsPage.expectNewPostModalVisible();
});

When('the student clicks the Cancel button in the modal', async function () {
  await forumsPage.clickCancelInModal();
});

Then('the new post modal should close', async function () {
  await forumsPage.expectNewPostModalHidden();
});

Then('the student should remain on the Forums page', async function () {
  await forumsPage.expectForumsPageVisible();
});




*/
