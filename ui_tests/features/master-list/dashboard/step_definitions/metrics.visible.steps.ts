import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';

Given('admin is logged into the system', async function () {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});
       
       
Given('the admin is on the Admin Usage Metrics page', function () {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});
       
       
When('they view the Platform Summary section', function () {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});
       

Then('the system should display the total number of active mentors in the status card', function () {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});
       
       
Then('the displayed number should match the current count of active mentors', function () {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});