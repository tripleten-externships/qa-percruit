// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { ConnectMessagesPage } from '../../../src/pages/student/ConnectMessagesPage';

// Declare variables to hold page object instances
let loginPage: LoginPage;
let connectMessagesPage: ConnectMessagesPage;

// Before hook: Launch a new page before each scenario and initialize page objects
Before(async function() {
  loginPage = new LoginPage(this.page);
  connectMessagesPage = new ConnectMessagesPage(this.page);
});

// Step: Navigate to Connect Messages page
When('the user navigates to the Connect Message page', async function() {
  await this.page.goto(env.getBaseUrl() + 'Connect-Messages');
  await expect(this.page).toHaveURL(/messages/);
  
  // Verify page elements using page object
  await connectMessagesPage.verifyPage();
});

// Step: Verify Messages page displays
Then('Messages page displays', async function() {
  // This step can also use the page object
  await connectMessagesPage.verifyPage();
});
