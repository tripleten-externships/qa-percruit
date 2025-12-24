// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { StudentDashboardPage } from '../../../src/pages/student/StudentDashboardPage';

// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let studentDashboardPage: StudentDashboardPage;

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async function() {
  loginPage = new LoginPage(this.page);
  studentDashboardPage = new StudentDashboardPage(this.page);
});


// Step: Navigate to the Percruit homepage
Given('I am on the Percruit homepage', async function() {
  await this.page.goto(env.getBaseUrl());
  await expect(this.page).toHaveURL(/percruit.com/);
});


// Step: Log in as a specific user type (Student, Admin, Mentor)
When(
  /I enter correct (.+) (?:email and password|credentials) and (?:click on sign in button|sign in|login)/,
  async (userType) => {
    await loginPage.loginAsUserType(userType);
  }
);

// Step: Login as a specific user type (Student, Admin, Mentor)
When(/the (.+) is authenticated in the system/, async function (userType) {
  await this.page.goto(env.getBaseUrl());
  await loginPage.waitForPageLoad();
  await loginPage.loginAsUserType(userType);
});

// Step: Verify that the Student is on the Student Dashboard
Then('the Student should be able to see the Student Dashboard', async function() {
  await studentDashboardPage.waitForPageLoad();
  await expect(this.page).toHaveURL(/dashboard/);
  const isVisible = await studentDashboardPage.isOnDashboardPage();
  expect(isVisible).toBeTruthy();
});


