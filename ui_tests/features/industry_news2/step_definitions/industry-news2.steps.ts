// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { IndustryNewsPage2 } from '../../../src/pages/student/industryNewsPage2';

// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let industryNewsPage2: IndustryNewsPage2;

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async function() {
  loginPage = new LoginPage(this.page);
  industryNewsPage2 = new IndustryNewsPage2(this.page);
});


When('the user navigates to the Industry News webpage', async function() {
  await this.page.goto(env.getBaseUrl() + 'industry-news');
  await expect(this.page).toHaveURL(/industry-news/);
});

Then('the Industry News webpage displays', async function() {
  await industryNewsPage2.verifyPage();
});