import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { StudentDashboardPage } from '../../../src/pages/student/StudentDashboardPage';

let loginPage: LoginPage;
let StudentDashboardPage: StudentDashboardPage;

Before(async function() {
  loginPage = new LoginPage(this.page);
  StudentDashboardPage = new StudentDashboardPage(this.page);
});

When('the user navigates to the Student Dashboard page', async function() {
  await this.page.goto(env.getBaseUrl() + 'dashboard');
  await expect(this.page).toHaveURL(/dashboard/);
});

Then('the Student Dashboard page displays', async function() {
  await StudentDashboardPage.verifyPage();
});