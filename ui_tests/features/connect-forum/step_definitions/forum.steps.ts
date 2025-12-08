// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import {ForumPage } from '../../../src/pages/student/ForumPage';

// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let forumPage: ForumPage;

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async function() {
  loginPage = new LoginPage(this.page);
  forumPage= new ForumPage(this.page);
});


When('the user navigates to the Forum page', async function() {
  await this.page.goto(env.getBaseUrl() + 'forums');
  await expect(this.page).toHaveURL(/forums/);
});

Then('the Forum page displays', async function() {
  await forumPage.verifyPage();
});

Given(
  'the Student is authenticated in the system and the student is on the {string} page',
  async function (pageName: string) {
    // Assume login is already handled in hooks or here:
    await this.page.goto('https://stage.tripletn.percruit.com/community/forums');

    // Click New Post → navigate to Create Topic page
    await this.page.getByRole('button', { name: 'New Post' }).click();

    // Verify Create Topic page is visible
    await expect(
      this.page.getByRole('heading', { name: 'Create a New Topic' })
    ).toBeVisible();
  }
);
