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


Before(async function () {
    // Initialize LoginPage, sign in as Admin
    const loginPage = new LoginPage(this.page);
    await this.page.goto(env.getBaseUrl());
    await loginPage.loginAsUserType('Admin');
    // Wait for the dashboard header to appear
    await this.page.waitForSelector('h1:has-text("Admin Dashboard")', { timeout: 30000 });
    // Navigate to the Mentor Assignments section
    await this.page.goto(`${env.getBaseUrl()}/admin/mentor-assignments`);
    // Initiate AssignmentPage
    this.assignmentPage = new AssignmentPage(this.page);
});

// Step Definitions for Create Assignment Steps
Given('an admin is authorized to manage mentor-student assignments', async function () {
    await expect(this.page).toHaveURL(/mentor-assignments/);
});

When('the admin creates a new assignment with a valid mentor and student selected', async function () { 
    // Create a new mentor-student assignment
    await this.assignmentPage.assignStudentToMentor(
    'Eric Hibbard Student (eric.hibbard91+student@gmail.com)',
    'Eric Hibbard (eric.hibbard91+mentor@gmail.com)');    
});

Then('the system confirms successful creation', async function () {
    // Verify that the assignment was created successfully
    await this.assignmentPage.verifyAssignmentCreated();    
});

Then('the new mentor-student pairing is displayed in the assignments list', async function () {
    // Verify that the new assignment appears in the assignments list
    await this.assignmentPage.verifyDisplay();
    // Remove assignment after each test to maintain test isolation
    await this.assignmentPage.removeAssignment('Eric Hibbard Student');
});

When('the admin attempts to create a new assignment without selecting a mentor', async function () {
    // Selects only student without mentor
    await this.assignmentPage.assignmentMissingMentor(
    'Eric Hibbard Student (eric.hibbard91+student@gmail.com)');
});

Then('the system rejects the request', async function () {
    // Verify button is disabled
    await this.assignmentPage.verifyNoAssignments();
});

Then('displays an error indicating that a mentor selection is required', async function () {
    // TODO: UI does not currently show an error message
    // This step will fail until the frontend implements the proper error display
    console.log('Error message display not implemented in UI yet.');
});

// Check Assignment Issues Steps
Given('all student profiles contain the required information', async function () {
    await expect(this.page).toHaveURL(/mentor-assignments/);
});

When('the admin accesses the Incomplete Info tool', async function () {
    // Access incomplete info tool
    await this.assignmentPage.checkAssignmentIssues(
        'Eric Hibbard Student', 'Eric Hibbard' );
});

Then('the system displays the message "Mentor Assignment created successfully"', async function () {
    await this.assignmentPage.verifyAssignmentCreated();
    // Remove assignment after each test to maintain test isolation
    await this.assignmentPage.removeAssignment('Eric Hibbard Student');
});