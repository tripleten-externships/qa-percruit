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
let page: Page;
let browser: Browser;
let loginPage: LoginPage;
let studentDashboardPage: StudentDashboardPage;

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  studentDashboardPage = new StudentDashboardPage(page);
});

// After hook: Close the browser after each scenario
After(async () => {
  await browser.close();
});

// Step: Navigate to the Percruit homepage
Given('I am on the Percruit homepage', async () => {
  await page.goto(env.getBaseUrl());
});

// Step: Log in as a specific user type (Student, Admin, Mentor)
When(
  /I enter correct (.+) (?:email and password|credentials) and (?:click on sign in button|sign in|login)/,
  async (userType) => {
    loginPage.loginAsUserType(userType);
  }
);

// Step: Login as a specific user type (Student, Admin, Mentor)
When(/the (.+) is authenticated in the system/, async (userType) => {
  await page.goto(env.getBaseUrl());
  await loginPage.loginAsUserType(userType);
});

// Step: Verify that the Student is on the Student Dashboard
Then('the Student should be able to see the Student Dashboard', async () => {
  await expect(page).toHaveURL(/dashboard/);
  // await page.screenshot({ path: 'screenshots/student-dashboard.png', fullPage: true });
  const isVisible = await studentDashboardPage.isOnDashboardPage();
  expect(isVisible).toBeTruthy();
});
