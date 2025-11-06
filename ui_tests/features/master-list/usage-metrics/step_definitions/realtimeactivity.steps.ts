import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';

// Step definition: Navigate to the Usage Metrics page and verify successful navigation
Given('the Admin navigates to the Usage Metrics page', async function () {
           // Write code here that turns the phrase above into concrete actions
           await this.eventsPage.clickByButtonRoleByText('Usage Metrics');
         });     
       

When('the user click on the {string} tab', function (string) {
 // Write code here that turns the phrase above into concrete actions
 return 'pending';
});
       

 When('the user click on the {string} tab', function (string) {
 // Write code here that turns the phrase above into concrete actions
 return 'pending';
});
       

Then('the user should see the Real-time Activity tab content loaded successfully', function () {
 // Write code here that turns the phrase above into concrete actions
 return 'pending';
});