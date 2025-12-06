// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { CareerPathPage } from '../../../src/pages/student/CareerPathPage';

// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let careerPathPage: CareerPathPage;

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async function() {
  loginPage = new LoginPage(this.page);
  careerPathPage = new CareerPathPage(this.page);
});

Given('the student is authenticated in the system', async function(){

});

When('the user navigates to the Career Path page', async function() {
  await this.page.goto(env.getBaseUrl() + 'career-path');
  await expect(this.page).toHaveURL(/career-path/);
});


Then('the Career Path page displays', async function() {
  await careerPathPage.verifyPage();
});


Given('the student submits the assessment with valid details', async function() {
  
});

When('the student clicks the restart button', async function() {

});

Then('the Current Role displays {string}', async function() {
  await careerPathPage.verifyPage();
});


Then('the Target Role displays {string}', async function() {
});