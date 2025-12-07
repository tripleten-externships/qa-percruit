// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilitiesS
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { ConnectMessagesPage } from '../../../src/pages/student/ConnectMessagesPage';


// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let connectMessagesPage: ConnectMessagesPage;

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async function() {
  loginPage = new LoginPage(this.page);
  connectMessagesPage = new  ConnectMessagesPage(this.page);
});


When('the user navigates to the Connect Message page', async function() {
  await this.page.goto(env.getBaseUrl() + 'messages');
  await expect(this.page).toHaveURL(/messages/);
});

Then('Messages page displays', async function() {
  await this.page.goto(env.getBaseUrl() + 'messages');
  await expect(this.page).toHaveURL(/messages/);
});
