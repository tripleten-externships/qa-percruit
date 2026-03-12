
// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect, test } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
// Imports Login Page functionality
import { LoginPage } from '../../src/pages/common/LoginPage';
// Imports Assignment Page functionality
import { AssignmentPage } from '../../src/pages/admin/AssignmentPage';   
import { AdminDashboardPage } from '../../src/pages/admin/AdminDashboardPage';

let assignmentPage: AssignmentPage;


test.describe('Mentor Assignments', () => {
  test.beforeEach(async ({ page }) => {
    // Initialize LoginPage, sign in as Admin, only runs before hook with appropriate tag THIS DOES NOT EFFECT
    const loginPage = new LoginPage(page);
    await page.goto(env.getBaseUrl());
    await loginPage.loginAsUserType('Admin');
    // Wait for the dashboard header to appear
    const dashboardPage = new AdminDashboardPage(page);
    await dashboardPage.waitForDashboard();
    
    // Navigate to the Mentor Assignments section    
    // Initiate AssignmentPage
    assignmentPage = new AssignmentPage(page);
    await assignmentPage.goToAssignments();
    await expect(page).toHaveURL(/mentor-assignments/);
   
  });

  test(' Mentor-Student Assignments - the system should allow administrators to link students with mentors to ensure proper mentorship assignments.', async ({ page }) => {
//     Scenario: Successful creation of a mentor-student assignment
//       Given an admin is authorized to manage mentor-student assignments
//       When the admin creates a new assignment with a valid mentor and student selected
//       Then the system confirms successful creation
//       And the new mentor-student pairing is displayed in the assignments list
//       And an admin is authorized to manage mentor-student assignments
//       And the admin creates a new assignment with a valid mentor and student selected
//       Then the system confirms successful creation
//       And the new mentor-student pairing is displayed in the assignments list
    // Assertions use the expect API.
    assignmentPage = new AssignmentPage(page);
    await expect(page).toHaveURL(/mentor-assignments/);
   
    // Create a new mentor-student assignment
    await assignmentPage.assignStudentToMentor(
    'manjula23.reddy+student11',
    'Manjula Student11 (manjula23.reddy+student11@gmail.com)',
    'Manjula Mentor1 (manjula23.reddy+mentor1@gmail.com)'); 
    // Verify that the assignment was created successfully
    await assignmentPage.verifyAssignmentCreated();  
    // Verify that the new assignment appears in the assignments list
    const today = new Date();
    const prefix = `${today.getMonth()+1}/${today.getDate()}/`; // "M/D/"
    await assignmentPage.verifyDisplay('Manjula Student11', 'Manjula Mentor1', 'manjula23.reddy+mentor1@gmail.com', prefix, 'Active');
    // Remove assignment after each test to maintain test isolation
    await assignmentPage.removeAssignment('Manjula Student11');
    // Check Assignment Issues Feature Steps
    await expect(page).toHaveURL(/mentor-assignments/);
     // Access incomplete info tool
    let assignmentResult = await assignmentPage.checkAssignmentIssues(
        'Manjula StudentBulk1', 'Manjula Mentor1'
    );
    if (assignmentResult === 'all-complete') {
        // Skip verification because nothing was assigned
        return;
    }
    await assignmentPage.verifyAssignmentIssue();
    // Remove assignment after each test to maintain test isolation
    await assignmentPage.removeAssignment('Manjula StudentBulk1');
  });

  test('Assignment Table Loads with the correct row of Mentor/Student/Status/Date', async ({ page }) => {
    // Scenario: Assignment table loads successfully with data
    // Given the admin is logged into the system to test assignment
    // And the admin navigates to the Assignments page
    // When the assignment table loads
    // Then the system displays all existing mentor-student assignments
    // And each row includes the student name, mentor name, Email, status, date assigned and Remove button   

  
    // Initiate AssignmentPage
    assignmentPage = new AssignmentPage(page);
    await expect(page).toHaveURL(/mentor-assignments/);

    // Wait for the table to load
    await page.waitForSelector('table');
    // Verify that table displays existing assignments
    await assignmentPage.verifyTableDisplay();
   
    // Verify that the table contains the correct columns
    await assignmentPage.verifyColumnHeaders();
  });

});




    
