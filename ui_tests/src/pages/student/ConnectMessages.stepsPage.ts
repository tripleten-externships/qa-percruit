// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { MessagesPage } from '../../../src/pages/common/Messages';
import { StudentDashboardPage } from '../../../src/pages/student/Messages';

// Declare variables to hold browser, page, and page object instances
let loginPage: MessagesPage;
let MessagesPage: MessagesPage;

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async function() {
  loginPage = new MessagesPage(this.page);
  MessagesPage = new (this.page);
});



When('the user navigates to the Connect Message page', async function() {
  await this.page.goto(env.getBaseUrl() + "messages');
  await expect(this.page).toHaveURL(/messages/);
});

Then(' Messages page displays', async function() {
  await this.page.goto(env.getBaseUrl() + "messages');
  await expect(this.page).toHaveURL(/messages/);
});

