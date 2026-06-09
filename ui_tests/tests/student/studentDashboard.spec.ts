// Import Playwright classes and assertion utilities
import { test, chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { StudentDashboardPage } from '../../src/pages/student/StudentDashboardPage';
// Declare variables to hold brosewr, page, and page objects instances
let loginPage: LoginPage;
let studentDashboardPage: StudentDashboardPage;

test.describe('Student Interview Prep', () => {
// Before hook: Launch a new browser and page before each scenario and initialize page objects
  test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  studentDashboardPage = new StudentDashboardPage(page);
   
});

  test('Student Dashboard page loads correctly', async ({ page }) => {

      await page.goto(env.getBaseUrl() + 'dashboard');
      await expect(page).toHaveURL(/dashboard/);
      await studentDashboardPage.verifyPage();
  });

});

