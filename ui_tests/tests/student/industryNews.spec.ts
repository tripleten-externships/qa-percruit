// Import Playwright classes and assertion utilities
import { test, chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { IndustryNewsPage } from '../../src/pages/student/IndustryNewsPage';
import { JobBoardPage } from '../../src/pages/student/JobBoardPage';
// Declare variables to hold brosewr, page, and page objects instances
let loginPage: LoginPage;
let industryNewsPage: IndustryNewsPage;

test.describe('Student Industry News', () => {
// Before hook: Launch a new browser and page before each scenario and initialize page objects
  test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
    industryNewsPage = new IndustryNewsPage(page);
   
});

  test('the user navigates to the Industry News page and industry news page displays', async ({ page }) => {
//   Scenario: When user goes to the page, the page loads as expected.
//     Given the Student is authenticated in the system
//     When I add the title When user goes to the page, the page loads as expected. to the log
//     When the user navigates to the Industry News page
//     Then the Industry News page displays
     await page.goto(env.getBaseUrl() + 'industry-news');
     await expect(page).toHaveURL(/industry-news/);
     await industryNewsPage.verifyPage();
    
  });

});

