// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';
import { CareerPathPage } from '../../../../src/pages/student/CareerPathPage';
import { time } from 'console';

// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let careerPathPage: CareerPathPage;

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async function () {
  loginPage = new LoginPage(this.page);
  careerPathPage = new CareerPathPage(this.page);
});


When('the user navigates to the Career Path page', async function () {
  await this.page.goto(env.getBaseUrl() + 'career-path');
  await expect(this.page).toHaveURL(/career-path/);
});

Then('the Career Path page displays', async function () {
  await careerPathPage.verifyPage();
  console.log("Career Path Page verified");
});

Given('the student navigates to the Career Path page', async function () {
  await this.page.goto(env.getBaseUrl() + 'career-path');
  await expect(this.page).toHaveURL(/career-path/);
  console.log("Navigated to Career Path Page"); 
});

Given('the student submits the assessment with valid required details', async function () {
  await expect(this.page).toHaveTitle(/Career Path Advisor/);
  console.log("Title Confirmed on Career Path Page");
  await this.page.waitForTimeout(5000);
  
  //Start Refresh
  await this.page.locator(careerPathPage.RestartButton).click({timeout:5000});
  console.log("Clicked Restart Button to ensure fresh form");
  //End Refresh


  await this.page.waitForTimeout(5000);

  //Fill Assessment Form
  console.log("Filling Assessment Form Now");
  await careerPathPage.fillAssessment(careerPathPage.currentRole, careerPathPage.targetRole);

//   await expect(this.page.getByPlaceholder(careerPathPage.CurrentRoleTextBox)).toBeVisible();
//   await this.page.getByPlaceholder(careerPathPage.CurrentRoleTextBox).click({timeout:5000});
//   console.log("3:Clicked Current Role textbox");
//   await this.page.getByPlaceholder(careerPathPage.CurrentRoleTextBox).fill("Student");
//   console.log("4:Filled in current role");
//   await this.page.getByText(careerPathPage.ContinueButton).click({timeout:5000});
//   console.log("5:Clicked Continue Button 1");
//   await this.page.waitForTimeout(5000);
//   await this.page.getByPlaceholder(careerPathPage.TargetRoleTextBox).click({timeout:5000});
//   console.log("Clicked target role box");
//   await this.page.getByPlaceholder(careerPathPage.TargetRoleTextBox).fill('Qa Engineer');
//   console.log("6: Filled in Target Role");
//   await this.page.getByText(careerPathPage.ContinueButton).click()
//   console.log("7: Clicked Continue Button 2");
  // await this.page.locator(careerPathPage.CompleteAssessmentButton).click({timeout:5000});
  // console.log("8: Clicked Complete Assessment Button");     
});

When('the student clicks the restart button', async function () {
  await this.page.waitForTimeout(5000);
  await this.page.locator(careerPathPage.RestartButton).click();
  console.log("Clicked Restart Button");  
  await this.page.waitForTimeout(5000);
});

Then('Current Role displays Not specified', async function () {
  console.log('Current Role Text is "' + await this.page.locator(careerPathPage.CurrentRoleHeading).textContent() +'"');
  await expect(this.page.locator(careerPathPage.CurrentRoleHeading)).toHaveText(/Not specified/);
  console.log("Verified Current Role displays Not specified");
});

Then('Target Role displays Not specified', async function () {
  console.log('Target Role Text is "' + await this.page.locator(careerPathPage.TargetRoleHeading).textContent() +'"') ;
  await expect(this.page.locator(careerPathPage.TargetRoleHeading)).toHaveText(/Not specified/);
  console.log("Verified Target Role displays Not specified");
});




