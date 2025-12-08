// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';
// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';
// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
// Imports Login Page functionality
import { LoginPage } from '../../../src/pages/common/LoginPage';
// Imports Assignment Page functionality
import { AssignmentPage } from '../../../src/pages/admin/AssignmentPage';   

Given('an admin is authorized to manage mentor-student assignments', async function () {
    const loginPage = new LoginPage(this.page);
    await this.page.goto(env.getBaseUrl());
    await loginPage.loginAsUserType('Admin');
    // Wait for the dashboard header to appear
    await this.page.waitForSelector('h1:has-text("Admin Dashboard")', { timeout: 30000 });
    await this.page.goto(`${env.getBaseUrl()}/admin/mentor-assignments`);
});

When('the admin creates a new assignment with a valid mentor and student selected', async function () {
     // Initiate AssignmentPage
    this.assignmentPage = new AssignmentPage(this.page);
    
    // Create a new mentor-student assignment
    await this.assignmentPage.assignStudentToMentor(
    'Eric Hibbard Student (eric.hibbard91+student@gmail.com)',
    'Eric Hibbard (eric.hibbard91+mentor@gmail.com)'
);
    
});

Then('the system confirms successful creation', async function () {
    await this.assignmentPage.verifyAssignmentCreated();
    
});

Then('the new mentor-student pairing is displayed in the assignments list', function () {
           // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


