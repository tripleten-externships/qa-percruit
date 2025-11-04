import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '/workspaces/qa-percruit/ui_tests/src/config/world';
import { LoginPage } from '/workspaces/qa-percruit/ui_tests/src/pages/common/LoginPage';


Given('the user is on the Admin Dashboard page', async function () {
 // Write code here that turns the phrase above into concrete actions
 await this.page.getByRole('button',{name:'Usage Metrics'}).click();
 await expect(this.page.getByRole('heading',{name:'Admin Usage Metrics'})).toBeVisible();
});        
       

When('the user click on the Usage Metrics tab', function (string) {
 // Write code here that turns the phrase above into concrete actions
 return 'pending';
});
       

 When('the user click on the Real-time Activity tab', function (string) {
 // Write code here that turns the phrase above into concrete actions
 return 'pending';
});
       

Then('the user should see the Real-time Activity tab content loaded successfully', function () {
 // Write code here that turns the phrase above into concrete actions
 return 'pending';
});