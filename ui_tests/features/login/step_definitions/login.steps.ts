// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';
import { CustomWorld } from '../../../src/config/world';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { MentorDashboardPage } from '../../../src/pages/mentor/MentorDashboardPage';
import { AdminDashboardPage } from '../../../src/pages/admin/AdminDashboardPage';

// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let mentorDashboardPage: MentorDashboardPage;
let adminDashboardPage: AdminDashboardPage;

// NOTE: do not initialize page objects in a file-level Before hook because
// the global World Before hook is responsible for creating `this.page`.
// Instantiate page objects inside steps from `this.page` to avoid ordering issues.


// Step: Navigate to the Percruit homepage
Given('I am on the Percruit homepage', async function (this: CustomWorld) {
  await this.page.goto(env.getBaseUrl());
  await expect(this.page).toHaveURL(/percruit.com/);
});

// Step: Log in as a specific user type (Admin, Mentor)
When(
  /I enter correct (.+) (?:email and password|credentials) and (?:click on sign in button|sign in|login)/,
  async function (this: CustomWorld, userType: string) {
    const loginPage = new LoginPage(this.page);
    await loginPage.loginAsUserType(userType);
  }
);

// Step: Login as a specific user type (Admin, Mentor)
Given('the {word} is authenticated in the system', async function (this: CustomWorld, userType: string) {
  await this.page.goto(env.getBaseUrl());
  const loginPage = new LoginPage(this.page);
  await loginPage.waitForPageLoad();
  await loginPage.loginAsUserType(userType);
});

// Step: Verify that the Admin is on the Admin Dashboard
Then('the Admin should be able to see the Admin Dashboard', async function (this: CustomWorld) {
  const adminDashboardPage = new AdminDashboardPage(this.page);
  await adminDashboardPage.waitForPageLoad();
  await expect(this.page).toHaveURL(/admin\/dashboard/);
  const isVisible = await adminDashboardPage.isOnDashboardPage();
  expect(isVisible).toBeTruthy();
});


// Step: Verify that the Mentor is on the Mentor Dashboard
Then('the Mentor should be able to see the Mentor Dashboard', async function (this: CustomWorld) {
  const mentorDashboardPage = new MentorDashboardPage(this.page);
  await mentorDashboardPage.waitForPageLoad();
  await expect(this.page).toHaveURL(/dashboard/);
  const isVisible = await mentorDashboardPage.isOnDashboardPage();
  expect(isVisible).toBeTruthy();
});
