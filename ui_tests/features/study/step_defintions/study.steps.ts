// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { StudyPage } from '../../../src/pages/student/StudyPage';

// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let studyPage: StudyPage;

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async function() {
  loginPage = new LoginPage(this.page);
  studyPage = new StudyPage(this.page);
});


When('the user navigates to the Study page', async function() {
  await this.page.goto(env.getBaseUrl() + 'interview-study');
  await expect(this.page).toHaveURL(/interview-study/);
});

Then('the Study page is displayed', async function() {
  await studyPage.verifyPage();
});

Then('the Search Questions box is clicked and awaiting text', async function () {
  await studyPage.clickButtonByText;
});

Then('All button is clicked and highlighted', async function () {
  
})

Then('Easy button is clicked and highlighted', async function () {
  
})

Then('Medium button is clicked and highlighted', async function () {
  
})

Then('Hard button is clicked and highlighted', async function () {
  
})

Then('Software Engineer tab is clicked and displays applicable roles', async function () {
  
})

Then('Data Scientist tab is clicked and displays applicable roles', async function () {
  
})

Then('ML Engineer tab is clicked and displays applicable roles', async function () {
  
})

Then('Product Manager tab is clicked and displays applicable roles', async function () {
  
})

Then('QA Analyst tab is clicked and displays applicable roles', async function () {
  
})

Then('Cybersecurity tab is clicked and displays applicable roles', async function () {
  
})

Then('LLMs tab is clicked and displays applicable roles', async function () {
  
})

Then('SQL tab is clicked and displays applicable roles', async function () {
  
})

Then('Behavioral tab is clicked and displays applicable roles', async function () {
  
})