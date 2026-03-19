// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect, test } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { CareerPathPage } from '../../src/pages/student/CareerPathPage';
import { time } from 'console';

// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let careerPathPage: CareerPathPage;

test('the user navigates to the Career Path Advisor page, the page displays and completes assessment', async ({ page }) => {
  //visit await page.goto('https://stage.tripleten.percruit.com/');
  await page.goto('https://stage.tripleten.percruit.com/');
  //Login as student
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('build.brandy+student@proton.me');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('Student.testing25');
  await page.getByRole('button', { name: 'Sign In' }).click();
  //Navigates to "Career Path Advisor" tab and page dispalys
  await page.getByRole('link', { name: 'Career Path Advisor' }).click();
  //User clicks "restart" button and roles are not specified
  await page.getByRole('button', { name: 'Restart Career Path Advisor' }).click();
  //Current role "not specified," student clicks "Start Your assesment."
  await page.getByRole('button', { name: 'Start Your Assessment' }).click();
  //Fills "current position" form and clicks continue
  await page.getByRole('combobox', { name: 'Current Role *' }).click();
  await page.getByRole('option', { name: 'Student' }).click();
  await page.getByRole('combobox', { name: 'Years of Experience' }).click();
  await page.getByRole('option', { name: '-3 years' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  //Fills "target position" form and clicks continue
  await page.getByRole('combobox', { name: 'Target Role *' }).click();
  await page.getByRole('option', { name: 'Backend Developer' }).click();
  await page.getByRole('combobox', { name: 'Target Industry' }).click();
  await page.getByRole('option', { name: 'Technology' }).click();
  await page.getByRole('spinbutton', { name: 'Desired Timeframe (Months)' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  //Fills "skills assessment" form and clicks complete assessment
  await page.getByRole('button', { name: 'Selenium WebDriver' }).first().click();
  await page.getByRole('button', { name: 'SDLC' }).first().click();
  await page.getByRole('button', { name: 'Detail Oriented' }).nth(1).click();
  await page.getByRole('button', { name: 'Complete Assessment' }).click();
  //Target role displays, then user clicks restart button and current role displays "not specified" afterwards.
  await page.getByRole('button', { name: 'Restart Career Path Advisor' }).click();
});


test.describe('Student Connect Messages', () => {
  // Before hook: Launch a new browser and page before each scenario and initialize page objects
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    careerPathPage = new CareerPathPage(page);
  });

  test('the user navigates to the Industry News page and industry news page displays', async ({ page }) => {
    //visit await page.goto('https://stage.tripleten.percruit.com/');
    await page.goto('https://stage.tripleten.percruit.com/');
    //Login as student
    await page.getByRole('textbox', { name: 'user@example.com' }).click();
    await page.getByRole('textbox', { name: 'user@example.com' }).fill('build.brandy+student@proton.me');
    await page.getByRole('textbox', { name: 'Enter your password' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('Student.testing25');
    await page.getByRole('button', { name: 'Sign In' }).click();
    //the user clicks the Indsutry News tab under career growth section, and Industry News page displays
    await page.getByRole('link', { name: 'Industry News' }).click();
  });

});



