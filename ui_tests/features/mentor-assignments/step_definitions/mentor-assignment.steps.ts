// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, } from '@cucumber/cucumber';
// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';
// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
// Imports Login Page functionality
import { LoginPage } from '../../../src/pages/common/LoginPage';
// Imports Assignment Page functionality
import { AssignmentPage } from '../../../src/pages/admin/AssignmentPage';   
import { AdminDashboardPage } from '../../../src/pages/admin/AdminDashboardPage';

Before({ tags: '@admin-auth' }, async function () {
    // Initialize LoginPage, sign in as Admin, only runs before hook with appropriate tag THIS DOES NOT EFFECT
    const loginPage = new LoginPage(this.page);
    await this.page.goto(env.getBaseUrl());
    await loginPage.loginAsUserType('Admin');
    // Wait for the dashboard header to appear
    const dashboardPage = new AdminDashboardPage(this.page);
    await dashboardPage.waitForDashboard();
    // Navigate to the Mentor Assignments section
    await this.page.goto(`${env.getBaseUrl()}/admin/mentor-assignments`);
    // Initiate AssignmentPage
    this.assignmentPage = new AssignmentPage(this.page);
});

// Step Definitions for Create Assignment Feature Steps
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


// Check Assignment Issues Feature Steps
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

// Assignment Table Visible Feature Steps this feature does NOT have @admin-auth tag 
// SO the BEFORE hook does NOT run for this feature

Given('the admin is logged into the system to test assignment', async function () {
    const loginPage = new LoginPage(this.page);
    await this.page.goto(env.getBaseUrl());
    await loginPage.loginAsUserType('Admin');
    // Wait for the dashboard header to appear
    const dashboardPage = new AdminDashboardPage(this.page);
    await dashboardPage.waitForDashboard();
});
Then('the admin navigates to the Assignments page', async function () {
    await this.page.goto(`${env.getBaseUrl()}/admin/mentor-assignments`);
    // Initiate AssignmentPage
    this.assignmentPage = new AssignmentPage(this.page);
    await expect(this.page).toHaveURL(/mentor-assignments/);
});

When('the assignment table loads', async function () {
    // Wait for the table to load
    await this.page.waitForSelector('table');
});

Then('the system displays all existing mentor-student assignments', async function () {
    // Verify that table displays existing assignments
    await this.assignmentPage.verifyTableDisplay();
    
});

Then('each row includes the mentor name, student name, status, and date assigned', async function () {
    // Verify that the table contains the correct columns
    await this.assignmentPage.verifyColumnHeaders();
});