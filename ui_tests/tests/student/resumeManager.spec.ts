// Import Playwright classes and assertion utilities
import { test, chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { ResumeManagerPage } from '../../src/pages/student/ResumeManagerPage';
// Declare variables to hold brosewr, page, and page objects instances
let loginPage: LoginPage;
let resumeManagerPage: ResumeManagerPage;

test.describe('Student Resume Manager', () => {
// Before hook: Launch a new browser and page before each scenario and initialize page objects
  test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  resumeManagerPage = new ResumeManagerPage(page);
   
});

  test('the user navigates to the Resume Manager page and resume manager page displays', async ({ page }) => {
    // Scenario: When the user goes to the page,page loads as expected
    // Given the Student is authenticated in the system
    // When the user navigates to the Resume Manager page
    // Then the Resume Manager page displays
    await page.goto(env.getBaseUrl() + 'resume-manager');
    await expect(page).toHaveURL(/resume-manager/);
    await resumeManagerPage.verifyPage(); 
    
  });

});

