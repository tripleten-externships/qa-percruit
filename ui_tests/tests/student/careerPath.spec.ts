// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect,test } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { CareerPathPage } from '../../src/pages/student/CareerPathPage';
import { time } from 'console';

// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let careerPathPage: CareerPathPage;

// Before hook: Launch a new browser and page before each scenario and initialize page objects
/* Scenario: When the user navigates to the Career Path page, the page loads as expected
    Given the student is authenticated in the system
    When I add the title When the user navigates to the Career Path page, the page loads as expected to the log
    When the user navigates to the Career Path page
    Then the Career Path page displays

 
  Scenario: Current role displays not specified when the restart button is clicked
    Given the student is authenticated in the system
    Given the student navigates to the Career Path page
    Given the student submits the assessment with valid required details
    When I add the title Current role displays not specified when the restart button is clicked to the log
    When the student clicks the restart button
    Then Current Role displays Not specified


  Scenario: Target role displays not specified when the restart button is clicked
    Given the student is authenticated in the system
    And the student navigates to the Career Path page
    And the student submits the assessment with valid required details
    When I add the title Target role displays not specified when the restart button is clicked to the log
    When the student clicks the restart button
    Then Target Role displays Not specified */
test.describe('Student Connect Messages', () => {
// Before hook: Launch a new browser and page before each scenario and initialize page objects
  test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  careerPathPage = new CareerPathPage(page);
});
test('the user navigates to the Industry News page and industry news page displays', async ({ page }) => {

//the user navigates to the Career Path page
  await page.goto(env.getBaseUrl() + 'career-path');
  await expect(page).toHaveURL(/career-path/);
//the Career Path page displays
  await careerPathPage.verifyPage();
  console.log("Career Path Page verified");

//the student navigates to the Career Path page
  await page.goto(env.getBaseUrl() + 'career-path');
  await expect(page).toHaveURL(/career-path/);
  console.log("Navigated to Career Path Page"); 
//the student submits the assessment with valid required details

  await expect(page).toHaveTitle(/Career Path Advisor/);
  console.log("Title Confirmed on Career Path Page");
  await page.waitForTimeout(5000);
  
  //Start Refresh
  await page.locator(careerPathPage.RestartButton).click({timeout:5000});
  console.log("Clicked Restart Button to ensure fresh form");
  //End Refresh


  await page.waitForTimeout(5000);

  //Fill Assessment Form
  console.log("Filling Assessment Form Now");
  await careerPathPage.fillAssessment(careerPathPage.currentRole, careerPathPage.targetRole);     
//the student clicks the restart button
  await page.waitForTimeout(5000);
  await page.locator(careerPathPage.RestartButton).click();
  console.log("Clicked Restart Button");  
  await page.waitForTimeout(5000);
//Current Role displays Not specified 
  console.log('Current Role Text is "' + await page.locator(careerPathPage.CurrentRoleHeading).textContent() +'"');
  await expect(page.locator(careerPathPage.CurrentRoleHeading)).toHaveText(/Not specified/);
  console.log("Verified Current Role displays Not specified");
//Target Role displays Not specified
  console.log('Target Role Text is "' + await page.locator(careerPathPage.TargetRoleHeading).textContent() +'"') ;
  await expect(page.locator(careerPathPage.TargetRoleHeading)).toHaveText(/Not specified/);
  console.log("Verified Target Role displays Not specified");
});

});



