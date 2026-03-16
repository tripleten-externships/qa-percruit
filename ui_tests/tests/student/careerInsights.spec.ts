// Import Playwright classes and assertion utilities
import { test, chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { CareerInsightsPage } from '../../src/pages/student/CareerInsightsPage';
import { JobBoardPage } from '../../src/pages/student/JobBoardPage';
// Declare variables to hold brosewr, page, and page objects instances
let loginPage: LoginPage;
let careerInsightsPage: CareerInsightsPage;

test.describe('Student Career Insights', () => {
// Before hook: Launch a new browser and page before each scenario and initialize page objects
  test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  careerInsightsPage = new CareerInsightsPage(page);
  await page.goto('/');
  await loginPage.loginAsUserType('Student');
});

  test('the user navigates to the Career Insights page and career insights page displays', async ({ page }) => {
//    Scenario: When the user goes to the page,page loads as expected\
//     Given the Student is authenticated in the system
      

      //visit https://stage.tripleten.percruit.com/

      //login as student

      //Scroll and go to "Career Path Advisor"/

      //Click on "Industry Insights"/



//     When the user navigates to the Career Insights page
//     Then the Career Insights page displays
 await page.goto(env.getBaseUrl() + 'career-insights');
  await expect(page).toHaveURL(/career-insights/);
   await careerInsightsPage.verifyPage(); 
  });

});

