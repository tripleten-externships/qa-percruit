// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';
import { AdminDashboardPage } from '../../../../src/pages/admin/AdminDashboardPage';

let page: Page;
let browser: Browser;
let loginPage: LoginPage;
let adminDashboardPage: AdminDashboardPage;

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  adminDashboardPage = new AdminDashboardPage(page);
});

// After hook: Close the browser after each scenario
After(async () => {
  await browser.close();
});

// Declare variables to hold browser, page, and page object instances
Given('the Admin is on the Profile Settings page', async function () {
await this.page.getByAltText('Admin').click();
await this.page.getBy('menuitem', { name: 'View Profile' }).click();
await expect(this.page.getByRole('heading', { name: 'Profile Settings' })).toBeVisible();
});



Given('the Admin is viewing the Basic Information section', function () {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});



Then('the fields Full Name, Phone Number, Location, and Timezone should be editable', function () {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});



Then('the Email field should be read-only', function () {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});



Then('each field should display its current value or be empty if optional', function () {
// Write code here that turns the phrase above into concrete actions
            return 'pending';
            });