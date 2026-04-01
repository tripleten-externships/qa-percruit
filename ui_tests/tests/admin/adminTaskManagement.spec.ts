import { Page, test, expect } from '@playwright/test';
import * as env from '../../src/config/world';
import { AdminTaskManagementPage } from '../../src/pages/admin/AdminTaskManagementPage';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { AdminDashboardPage } from '../../src/pages/admin/AdminDashboardPage';

test.describe('Admin - Task Management', () => {      
  test.describe.configure({ timeout: 180000 });

  test.beforeEach(async ({ page }) => {
    //
    const loginPage = new LoginPage(page);
    await page.goto(env.getBaseUrl()!);
    await loginPage.loginAsUserType('Admin');
    // Wait for the dashboard header to appear
    const dashboardPage = new AdminDashboardPage(page);
    await dashboardPage.waitForDashboard();

    // Navigate to Task Management page
    const adminTaskPage = new AdminTaskManagementPage(page);
    await adminTaskPage.navigateToTaskManagement();
    await expect(page).toHaveURL(/admin\/tasks/);
    
  });

// Scenario: Admin can assign, edit and delete a single task without using quick templates
// Given the Admin is on Task Management page
// When the Admin clicks on "Assign Task" button
// And the Admin selects the "Single Assign" tab
// And the Admin selects a student from the dropdown
// And the Admin fills in the task details manually (title, description, due date, priority)
// And the Admin clicks on "Assign Task" button in the dialog
// Then the Admin should see a success message confirming task assignment
// And the assigned task should appear in the task list with correct details
// When the Admin clicks on Edit for the assigned task
// And the Admin updates the task details (e.g. change title, description, due date, priority)
// And the Admin clicks on "Update Task" button in the dialog
// Then the Admin should see a success message confirming task update
// And the updated task should reflect the changes in the task list
// When the Admin clicks on Delete for the assigned task
// And confirms the delete action in the confirmation dialog
// Then the Admin should see a success message confirming task deletion
// And the deleted task should no longer appear in the task list

test('Admin can assign a task, edit and delete an assigned task @smoke', async ({ page }) => {
    const adminTaskPage = new AdminTaskManagementPage(page);
    await expect(page).toHaveURL('admin/tasks');
    await adminTaskPage.assignSingleTaskWithoutTemplate(page);  
    
    // Reload to ensure table is refreshed
    await page.reload();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });

    let editError: unknown;
    try {
      await adminTaskPage.editAssignedTask(page, 'manjula23.reddy+studentbulk11@gmail.com');
    } catch (error) {
      editError = error;
    }

    let deleteError: unknown;
    try {
      await adminTaskPage.deleteAssignedTask(page, 'manjula23.reddy+studentbulk11@gmail.com');
    } catch (error) {
      deleteError = error;
    }

    if (editError) throw editError;
    if (deleteError) throw deleteError;
});

// Scenario: Admin can view Task Management and apply filters
// When the Admin navigates to Task Management page
// Then the Admin should see the Task Management dashboard with all tasks listed
// When the Admin applies a student filter
// Then the Admin should see tasks filtered by the selected student
// When the Admin applies a status filter (Assigned, In Progress, Completed, Overdue)
// Then the Admin should see tasks filtered by the selected status  
// When the Admin applies a priority filter (High, Medium, Low)
// Then the Admin should see tasks filtered by the selected priority
// When the Admin applies multiple filters together
// Then the Admin should see tasks that match all the applied filters   
// When the Admin clicks on Export button
// Then the Admin should see a file download initiated with the filtered task data
// When the Admin views Task Analytics section
// Then the Admin should see various analytics charts and data related to tasks
// When the Admin applies filters in Task Analytics
// Then the Admin should see the analytics data updated according to the applied filters

test('Admin can view Task Management and apply filters @smoke', async ({ page }) => {
    const adminTaskPage = new AdminTaskManagementPage(page);
    await expect(page).toHaveURL('admin/tasks');
    
    await adminTaskPage.verifyTaskManagementPage();

  // Apply and verify student filter
    await adminTaskPage.applyStudentFilter('All Students');
    await adminTaskPage.verifyStudentFilterApplied('All Students');
    
    // Test Assigned status filter
    await adminTaskPage.applyStatusFilter('Assigned');
    await adminTaskPage.verifyStatusFilterApplied('Assigned');

    // Test In Progress status filter  
    await adminTaskPage.applyStatusFilter('In Progress');
    await adminTaskPage.verifyStatusFilterApplied('In Progress');

    // Test Completed status filter
    await adminTaskPage.applyStatusFilter('Completed');
    await adminTaskPage.verifyStatusFilterApplied('Completed');

    // Test Overdue status filter
    await adminTaskPage.applyStatusFilter('Overdue');
    await adminTaskPage.verifyStatusFilterApplied('Overdue');
    
    // Reset to All Statuses filter
    await adminTaskPage.applyStatusFilter('All Statuses');
    await adminTaskPage.verifyStatusFilterApplied('All Statuses');

    // Test High Priority filter
    await adminTaskPage.applyPriorityFilter('High');
    await adminTaskPage.verifyPriorityFilterApplied('High');

    // Test Medium Priority filter
    await adminTaskPage.applyPriorityFilter('Medium');
    await adminTaskPage.verifyPriorityFilterApplied('Medium');

    // Test Low Priority filter
    await adminTaskPage.applyPriorityFilter('Low');
    await adminTaskPage.verifyPriorityFilterApplied('Low');

    // Reset to All Priorities filter
    await adminTaskPage.applyPriorityFilter('All Priorities');
    await adminTaskPage.verifyPriorityFilterApplied('All Priorities');

     // Apply and verify student filter
    await adminTaskPage.applyStudentFilter('manjula23.reddy+studentbulk1@gmail.com');
    await adminTaskPage.verifyStudentFilterApplied('manjula23.reddy+studentbulk1@gmail.com');

    await adminTaskPage.verifyTaskAnalytics();
    await adminTaskPage.verifyTaskAnalyticsFilters(page);
    
});

// Scenario: Admin can assign a single task using quick templates
// Given the Admin is on Task Management page
// When the Admin clicks on "Assign Task" button
// And the Admin selects the "Single Assign" tab
// And the Admin selects a student from the dropdown
// And the Admin selects a quick template for the task
// And the Admin clicks on "Assign Task" button in the dialog
// Then the Admin should see a success message confirming task assignment
// And the assigned task should appear in the task list with correct details

test('Assign Single Task with quick templates @smoke', async ({ page }) => {

    test.setTimeout(180000); // assign + cleanup loop needs more time
    const adminTaskPage = new AdminTaskManagementPage(page);
    await expect(page).toHaveURL('admin/tasks');

    await adminTaskPage.assignSingleTaskWithTemplates(page)
});

// Scenario: Admin can assign bulk tasks using quick templates
// Given the Admin is on Task Management page
// When the Admin clicks on "Assign Task" button
// And the Admin selects the "Bulk Assign" tab
// And the Admin selects multiple students from the dropdown
// And the Admin selects a quick template for the tasks
// And the Admin clicks on "Assign Tasks" button in the dialog
// Then the Admin should see a success message confirming bulk task assignment
// And the assigned tasks should appear in the task list with correct details for each student  

test('Assign Bulk Tasks with quick templates @smoke', async ({ page }) => {

    test.setTimeout(180000); // bulk assign + cleanup can exceed 100s
    const adminTaskPage = new AdminTaskManagementPage(page);
    await expect(page).toHaveURL('admin/tasks');
    await adminTaskPage.assignBulkTasksForAllQuickTemplates(page);

});

});
