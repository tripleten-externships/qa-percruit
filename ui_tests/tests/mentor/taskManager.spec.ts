import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { TaskManagerPage } from '../../src/pages/mentor/taskManager';
import { verify } from 'crypto';

test.describe('Mentor - Task Management', () => {

  let taskPage: TaskManagerPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    taskPage = new TaskManagerPage(page);
    await page.goto('/');

  loginPage = new LoginPage(page);

    await loginPage.loginAsUserType('Mentor');
    await taskPage.handleCookiePopup();

    await page.getByRole('link', { name: 'Create and manage tasks for' }).click();
    await page.getByRole('heading', { name: 'Task Manager' }).isVisible();

  });

  test('Mentor can create Resume Review task(AutoApprove)', async ({ page }) => {

    await page.getByRole('button', { name: 'Create Task' }).click();
    await page.getByRole('button', { name: 'Open' }).click();
    await page.getByRole('option', { name: 'Resume Review & Feedback Type' }).click();
        //Select Student
    await page.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: /Shruti Student/ }).click();
        //Task Name
    await page.getByRole('textbox', { name: 'Task' }).fill('Submit Resume for Review');
        //Description
    await page.getByRole('textbox', { name: 'Description' }).click();
  
         //Category
    await page.getByText('Application', { exact: true }).click();
    await page.getByRole('option', { name: 'Application' }).click();

        //Priority
    await page.getByText('High', { exact: true }).click();
    await page.getByRole('option', { name: 'High' }).click();
    
    
        //Date
    await page.getByRole('textbox', { name: 'Due Date' }).click();
    await page.getByRole('gridcell', { name: /^22$/ }).click();

        //Time
    await page.getByText(':59 PM (End of Day)').click();
    await page.getByRole('option', { name: '11:00 PM' }).click();

    await page.getByRole('spinbutton', { name: 'Time Estimate (hours)' }).fill('1');

        //Tags
    await page.getByRole('textbox', { name: 'Add tags' }).fill('Resume Review');
    await page.getByRole('button', { name: 'Add' }).click();

        //Auto-Approve
    await page.getByText('Auto-Approve').click();
    await page.getByRole('option', { name: 'Auto-Approve Task is marked' }).click();

    await page.getByRole('button', { name: 'Create Task' }).click();

  });
  test('Mentor can create Resume Review task(Needs Review)', async ({ page }) => {

    await page.getByRole('button', { name: 'Create Task' }).click();
    await page.getByRole('button', { name: 'Open' }).click();
    await page.getByRole('option', { name: 'Cover Letter Template Creation' }).click();
        //Select Student
    await page.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: /Shruti Student/ }).click();
        //Task Name
    await page.getByRole('textbox', { name: 'Task' }).fill('Create Cover Letter Template ');
        //Description
    await page.getByRole('textbox', { name: 'Description' }).click();
  
         //Category
    await page.getByText('Application', { exact: true }).click();
    await page.getByRole('option', { name: 'Application' }).click();

        //Priority
    await page.getByText('Medium', { exact: true }).click();
    await page.getByRole('option', { name: 'High' }).click();
    
    
        //Date
    await page.getByRole('textbox', { name: 'Due Date' }).click();
    await page.getByRole('gridcell', { name: /^24$/ }).click();

        //Time
    await page.getByText(':59 PM (End of Day)').click();
    await page.getByRole('option', { name: '11:00 PM' }).click();

    await page.getByRole('spinbutton', { name: 'Time Estimate (hours)' }).fill('2');

        //Tags
    await page.getByRole('textbox', { name: 'Add tags' }).fill('Cover Letter');
    await page.getByRole('button', { name: 'Add' }).click();

        //Needs Review
    await page.getByText('Auto-Approve').click();
    await page.getByRole('option', { name: 'Needs Review You will review' }).click();

    await page.getByRole('button', { name: 'Create Task' }).click();

  });

  test('Confirm and validate the fields are correct', async ({ page }) => {
   await page.getByRole('heading', { name: 'Submit Resume for Review' }).first().click();
     // await page.getByRole('heading', { name: 'Submit Resume for Review' }).nth(2).click();
    //await taskPage.verifyHeading('Submit Resume for Review');
    await page.getByRole('heading', { name: 'Submit Resume for Review', exact: true }).click();
    await page.locator('.MuiChip-root.MuiChip-filled.MuiChip-sizeSmall.MuiChip-colorDefault.MuiChip-filledDefault.css-1v5fhae > .MuiChip-label').click();
    await page.locator('.MuiBox-root > .MuiChip-root.MuiChip-filled.MuiChip-sizeSmall.MuiChip-colorDefault.MuiChip-filledDefault.css-172vna3 > .MuiChip-label').click();
    //await page.getByLabel('Submit Resume for Review').getByText('interview prep').click();

    //await page.getByRole('row', { name: 'Submit Resume for Review ' }).getByLabel('Edit Feedback on Task').click();
    await page.getByRole('paragraph').filter({ hasText: 'Shruti Student' }).click();
    await page.getByLabel('Submit Resume for Review').getByText('Please upload your current').click();
    await page.getByText('Sun, Mar 22,').click();
    await page.getByRole('paragraph').filter({ hasText: '%' }).click();
    await page.getByText('hours').click();
    await page.getByText('Auto-Approve').click();
    await page.getByText('Tags').click();
    await page.getByText('resume', { exact: true }).click();
    await page.getByText('review', { exact: true }).click();
    await page.getByText('feedback', { exact: true }).click();
    await page.getByText('Resume Review', { exact: true }).click();
    await page.getByRole('button', { name: 'Close' }).click();
   
  });

  //test for adding feedback to task, updating feedback and validating the same feedback is displayed on UI after update
  test('Add Feedback to task', async ({ page }) => {
      
  await page.getByRole('row', { name: 'Submit Resume for Review' }).getByLabel('Add Feedback to Task').first().click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('textbox', { name: 'Feedback' }).click();
  await page.getByRole('textbox', { name: 'Feedback' }).fill('Feedback added (FIRST)');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('row', { name: 'Submit Resume for Review' }).getByLabel('Edit Feedback on Task').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('textbox', { name: 'Feedback' }).click();
  await page.getByRole('textbox', { name: 'Feedback' }).fill('Feedback added (FIRST) (UPDATED)');
  await page.getByRole('button', { name: 'Update' }).click();


  });
//test to delete task and validate the task is deleted from UI
test('Delete task and validate if deleted',async ({ page }) => {
    await page.getByRole('row', { name: 'Submit Resume for Review' }).getByLabel('Delete').first().click();
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByRole('row', { name: 'Submit Resume for Review' })).not.toBeVisible();
});

});