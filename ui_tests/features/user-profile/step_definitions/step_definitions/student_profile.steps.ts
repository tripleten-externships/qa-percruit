// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';
import { ProfilePage } from '../../../../src/pages/common/ProfilePage';
// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let profilePage: ProfilePage;

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async function() {
  loginPage = new LoginPage(this.page);
  profilePage = new ProfilePage(this.page);
});

When('the student navigates to the Profile page', async function() {
  await this.page.goto(env.getBaseUrl() + 'profile');
  await expect(this.page).toHaveURL(/profile/);
});

Then('the Student Profile page displays', async function() {
  await profilePage.verifyPage();
});