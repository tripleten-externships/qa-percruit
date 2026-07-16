// Import Playwright classes and assertion utilities
import { test, chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { StudentDashboardPage } from '../../src/pages/student/StudentDashboardPage';
import { JobBoardPage } from '../../src/pages/student/JobBoardPage';
// Declare variables to hold brosewr, page, and page objects instances
let loginPage: LoginPage;
let studentDashboardPage: StudentDashboardPage;

test.describe('Student Career Diary', () => {
// Before hook: Launch a new browser and page before each scenario and initialize page objects
  test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  studentDashboardPage = new StudentDashboardPage(page);
});

  test('the user navigates to the Career Diary page and career diary page displays', async ({ page }) => {
    //the user navigates to the Student Dashboard page
      await page.goto(env.getBaseUrl() + 'dashboard');
      await expect(page).toHaveURL(/dashboard/);
    //the student clicks the "Struggling" button
      await page.locator('//span[contains(text(),"Struggling")]').click();
    //the student clicks the Weekly Applications button
      await page.locator('//h6[contains(text(),"Weekly Applications")]').click();
    //the Student Dashboard page displays
      await expect(page.locator('//h4[contains(text(),"Good ")]')).toBeVisible();
    //the Weekly Applications dialog should display

      await expect(page.locator('//h6[contains(text(),"This Week\'s Job Applications")]')).toBeVisible();
 
  });

});

