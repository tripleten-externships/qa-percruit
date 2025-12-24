// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
//import { IndustryNewsPage } from '../../../src/pages/student/IndustryNewsPage';
import { StudentDashboardPage } from '../../../src/pages/student/StudentDashboardPage';
// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
//let industryNewsPage: IndustryNewsPage;
let studentDashboardPage: StudentDashboardPage;
// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async function() {
  loginPage = new LoginPage(this.page);
  studentDashboardPage = new StudentDashboardPage(this.page);
});


When('the user navigates to the Student Dashboard page', async function() {
  await this.page.goto(env.getBaseUrl() + 'dashboard');
  await expect(this.page).toHaveURL(/dashboard/);
});

When('the student clicks the "Struggling" button', async function() {
  await this.page.locator('//span[contains(text(),"Struggling")]').click();
});

When('the student clicks the Weekly Applications button', async function() {
  await this.page.locator('//h6[contains(text(),"Weekly Applications")]').click();
});

Then('the Student Dashboard page displays', async function() {
  await expect(this.page.locator('//h4[contains(text(),"Good ")]')).toBeVisible();
  
});

Then('the Weekly Applications dialog should display', async function() {
  await expect(this.page.locator('//h6[contains(text(),"This Week\'s Job Applications")]')).toBeVisible();
  
});