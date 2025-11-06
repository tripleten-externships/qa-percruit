import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';


Before(async function () {
  // Initialize the EventsPage object with the current browser page context

});

Given('the user on the Admin Dashboard page', async ({ page }) => {
 // Write code here that turns the phrase above into concrete actions
  await page.getByRole('button', { name: 'ANALYTICS & REPORTING' }).click();
  await page.getByRole('button', { name: 'Usage Metrics' }).click();
  await expect(page.getByRole('heading', { name: 'Admin Usage Metrics' })).toBeVisible();
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