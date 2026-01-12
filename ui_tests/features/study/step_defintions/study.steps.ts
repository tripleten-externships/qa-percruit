// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { StudyPage } from '../../../src/pages/student/StudyPage';

// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let studyPage: StudyPage;

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async function() {
  loginPage = new LoginPage(this.page);
  studyPage = new StudyPage(this.page);
});


When('the user navigates to the Study page', async function() {
  await this.page.goto(env.getBaseUrl() + 'interview-study');
  await expect(this.page).toHaveURL(/interview-study/);
});

Then('the Study page is displayed', async function() {
  await studyPage.verifyPage();
});

Then('the Search Questions box is clicked', async function () {
  
})