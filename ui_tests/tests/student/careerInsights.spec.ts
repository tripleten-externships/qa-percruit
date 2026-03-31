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
    //visit https://stage.tripleten.percruit.com/
    await page.goto('https://stage.tripleten.percruit.com/');
    //login as student
    await page.getByRole('textbox', { name: 'user@example.com' }).click();
    await page.getByRole('textbox', { name: 'user@example.com' }).fill('build.brandy+student@proton.me');
    await page.getByRole('textbox', { name: 'Enter your password' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('Student.testing25');
    await page.getByRole('button', { name: 'Sign In' }).click();
    //Scroll and click "Career Path Advisor"/
    await page.getByRole('link', { name: 'Career Path Advisor' }).click();
    //Click on "Industry Insights" and page displays
    await page.getByRole('tab', { name: 'Industry Insights' }).click();
  });

});

