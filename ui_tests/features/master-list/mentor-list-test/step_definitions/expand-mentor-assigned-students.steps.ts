// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, } from '@cucumber/cucumber';
// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';
// Import environment configuration and Page Object Models
import * as env from '../../../../src/config/world';
// Imports Login Page functionality
import { LoginPage } from '../../../../src/pages/common/LoginPage';
// Imports Assignment Page functionality
import { MentorListPage } from '../../../../src/pages/admin/MentorListPage';

Given('the admin User is logged into the Percruit website', async function () {
    //Log user in as admin
    const loginPage = new LoginPage(this.page);
    await this.page.goto(env.getBaseUrl());
    await loginPage.loginAsUserType('Admin');
    // Wait for the dashboard header to appear
    await this.page.waitForSelector('h1:has-text("Admin Dashboard")');

}); 

Then('the mentors list with assigned students is available', async function () {
    //Go to mentor list page  
    await this.page.goto(`${env.getBaseUrl()}/admin/mentors`);
    // Initiate AssignmentPage
    this.assignmentPage = new MentorListPage(this.page);
    await expect(this.page).toHaveURL(/mentors/);
});

// Expanding a mentor shows their assigned students
When('the admin user expands a mentor in the mentors list', async function () {
    //  

});

Then('the mentor assigned students should be displayed under that mentor', async function () {

});

Then('each student should show their name and profile details', async function () {

});