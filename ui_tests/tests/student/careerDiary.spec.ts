// Import Playwright classes and assertion utilities
import { test, chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { StudentDashboardPage } from '../../src/pages/student/StudentDashboardPage';
import { JobBoardPage } from '../../src/pages/student/JobBoardPage';
// Declare variables to hold browser, page, and page objects instances
let loginPage: LoginPage;
let studentDashboardPage: StudentDashboardPage;


test.describe('Student Career Diary', () => {
  // Before hook: Launch a new browser and page before each scenario and initialize page objects
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    studentDashboardPage = new StudentDashboardPage(page);
    await page.goto('/');
    await loginPage.loginAsUserType('Student');
  });

  test('the user navigates to the Career Diary page and career diary page displays', async ({ page }) => {
    //visit await page.goto('https://stage.tripleten.percruit.com/');
    await page.goto('https://stage.tripleten.percruit.com/');
    //Login as student
    await page.getByRole('textbox', { name: 'user@example.com' }).click();
    await page.getByRole('textbox', { name: 'user@example.com' }).fill('build.brandy+student@proton.me');
    await page.getByRole('textbox', { name: 'Enter your password' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('Student.testing25');
    await page.getByRole('button', { name: 'Sign In' }).click();
    //Navigates to the Student "Dashboard" page
    await page.goto('https://stage.tripleten.percruit.com/dashboard');
    await page.getByRole('link', { name: 'Dashboard' }).click();
    //Scroll down and then-User clicks "expand" button on the "Career Diary" box
    await page.getByRole('button', { name: 'Expand' }).click();
    //User clicks the "Struggling" button on the "How are you feeling today?" questoinnarire
    await page.getByRole('button').nth(1).click();
    await page.getByLabel('Struggling').click();
    //User clicks the "Quick Save" button after clicking "struggling" and the answer saves succesfully
    await page.getByRole('button', { name: 'Quick Save' }).click();
    await page.getByRole('button').nth(2).click();
    //Exit the page and quit browser
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await page.goto('https://stage.tripleten.percruit.com/');

  });

  test('the user navigates to the Career Diary page, clicks "weekly applications" and then page displays', async ({ page }) => {
    //visit https://stage.tripleten.percruit.com/
    await page.goto('https://stage.tripleten.percruit.com/');
    //Login as student
    await page.getByRole('textbox', { name: 'user@example.com' }).click();
    await page.getByRole('textbox', { name: 'user@example.com' }).fill('build.brandy+student@proton.me');
    await page.getByRole('textbox', { name: 'Enter your password' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('Student.testing25');
    await page.getByRole('button', { name: 'Sign In' }).click();
    //Navigates to the Student "Dashboard" page
    await page.goto('https://stage.tripleten.percruit.com/dashboard');
    //the student clicks the "Career analytics" button under "career diary" section box
    await page.getByRole('button', { name: 'View Analytics' }).click();
    //User clicks "monthly" button to verify is showing weekly report
  await page.getByRole('button', { name: 'Monthly' }).click();
    //the student clicks the "Weekly Applications" button
    await page.getByRole('button', { name: 'Weekly' }).click();

  });

});

