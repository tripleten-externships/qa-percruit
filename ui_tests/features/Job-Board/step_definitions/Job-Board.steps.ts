// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
//import { CareerInsightsPage } from '../../../src/pages/student/CareerInsightsPage';
import { JobBoardPage } from '../../../src/pages/student/JobBoardPage';
// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let jobBoardPage: JobBoardPage;
//let careerInsightsPage: CareerInsightsPage;

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async function() {
  loginPage = new LoginPage(this.page);
  jobBoardPage = new JobBoardPage(this.page);
});


When('the user navigates to the Job Board page', async function() {
  await this.page.goto(env.getBaseUrl() + 'jobs');
  await expect(this.page).toHaveURL(/jobs/);
});

Then('the Job Board page displays', async function() {
  // await JobBoardPage.verifyPage(); 
  await jobBoardPage.verifyPage();
});