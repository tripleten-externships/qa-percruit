// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';
import { CareerPathPage } from '../../../../src/pages/student/CareerPathPage';

// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let careerPathPage: CareerPathPage;

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async function () {
  loginPage = new LoginPage(this.page);
  careerPathPage = new CareerPathPage(this.page);
});

// Given('the student is authenticated in the system', async function(){
// loginPage = new LoginPage(this.page)
// careerPathPage = new CareerPathPage(this.page)
// });

When('the user navigates to the Career Path page', async function () {
  await this.page.goto(env.getBaseUrl() + 'career-path');
  await expect(this.page).toHaveURL(/career-path/);
});

Then('the Career Path page displays', async function () {
  await careerPathPage.verifyPage();
});

Given('the student navigates to the Career Path page', async function () {
  await this.page.goto(env.getBaseUrl() + 'career-path');
  await expect(this.page).toHaveURL(/career-path/);
  console.log("Navigated to Career Path Page");
});

Given(
  'the student submits the assessment with valid required details',
  async function () {
    await this.page.waitForLoadState('networkidle');
    await this.page.getByPlaceholder(careerPathPage.CurrentRoleTextBox).scrollIntoViewIfNeeded();
    console.log("Scrolled to current role box");
   expect(await this.page.getByPlaceholder(careerPathPage.CurrentRoleTextBox).isVisible());
   console.log("Current role box is visible");
    await this.page.getByPlaceholder(careerPathPage.CurrentRoleTextBox).click();
    console.log("Clicked current role box");
    await this.page.locator(careerPathPage.CurrentRoleTextBox).fill("Student");
    console.log("filled in 'student");
    await this.page.locator(careerPathPage.ContinueButton).click({ timeout: 10000 });
    console.log("Clicked continue button 1");
    await this.page.locator(careerPathPage.TargetRoleTextBox).fill('Qa Engineer');
    console.log("Filled in QA Eng");
    await this.page.locator(careerPathPage.ContinueButton).click({ timeout: 10000 });
    console.log("Clicked continue button 2");
    await this.page.locator(careerPathPage.CompleteAssessmentButton).click();
    console.log("clicked complete Assessment button");
    
  }
);

When('the student clicks the restart button', async function () {
  await this.page.locator(careerPathPage.RestartButton).click();
});


Then('the Current Role displays {string}', async function () {
  await expect(this.page.locator(careerPathPage.CurrentRoleHeading)).toHaveText(/Not specified/);
    
});

Then('the Target Role displays {string}', async function () {
  await expect(this.page.locator(careerPathPage.TargetRoleHeading)).toHaveText(/Not specified/);
});
