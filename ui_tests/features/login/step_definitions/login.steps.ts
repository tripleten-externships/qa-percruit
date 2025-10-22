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
    // Choose login method based on user type
    switch (userType) {
      case 'Student':
      case 'student':
        await loginPage.loginAsStudent();
        break;
      case 'Admin':
      case 'admin':
        await loginPage.loginAsAdmin();
        break;
      case 'Mentor':
      case 'mentor':
        await loginPage.loginAsMentor();
        break;
      default:
        throw new Error(`Unknown user type: ${userType}`);
    }
  }
);

// Step: Verify that the user is on the dashboard page with a "Hello," heading
Then('I should be on the page that says Hello', async () => {
  await expect(page.getByRole('heading', { name: 'Hello,' })).toBeVisible();
  // Verify that the current URL contains 'dashboard' indicating dashboard page is being viewed
  await expect(page).toHaveURL(/dashboard/);
});

// Step: Verify that the Career Diary widget is visible on the student dashboard
Then('I should be able to see the Career Diary', async () => {
  const isVisible = await studentDashboardPage.isCareerDiaryWidgetVisible();
  expect(isVisible).toBeTruthy();
});
