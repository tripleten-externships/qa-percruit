// Import Playwright classes and assertion utilities
import { test, chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { JobBoardPage } from '../../src/pages/student/JobBoardPage';
// Declare variables to hold brosewr, page, and page objects instances
let loginPage: LoginPage;
let jobBoardPage: JobBoardPage;

test.describe('Student Job Board', () => {
// Before hook: Launch a new browser and page before each scenario and initialize page objects
  test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  jobBoardPage = new JobBoardPage(page);
   
});

  test('the user navigates to the Job Board page and job board page displays', async ({ page }) => {
//     Scenario: When the user goes to the page,page loads as expected
//     Given the Student is authenticated in the system
//    When I add the title "user goes to job board page" to the log
//     When the user navigates to the Job Board page
//     Then the Job Board page displays
    await page.goto(env.getBaseUrl() + 'jobs');
    await expect(page).toHaveURL(/jobs/);
    await jobBoardPage.verifyPage();
    
  });

});

