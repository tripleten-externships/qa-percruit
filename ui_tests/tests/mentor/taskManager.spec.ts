import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { TaskManagerPage } from '../../src/pages/mentor/taskManager';

test.describe('Mentor - Task Management', () => {
  let taskPage: TaskManagerPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    taskPage = new TaskManagerPage(page);
    loginPage = new LoginPage(page);

    await page.goto('/');

    await loginPage.loginAsUserType('Mentor');
    await taskPage.handleCookiePopup();

    const createManageLink = page.getByRole('link', {
      name: 'Create and manage tasks for',
    });
    if ((await createManageLink.count()) > 0) {
      await createManageLink.click();
    }

    await expect(
      page.getByRole('heading', { name: 'Task Manager' })
    ).toBeVisible();
  });

  test(
    'Mentor can create Resume Review task (Auto-Approve)',
    { tag: '@Smoke' },
    async ({ page }) => {
      await page.getByRole('button', { name: 'Create Task' }).click();

      await page.getByRole('button', { name: 'Open' }).click();
      await page
        .getByRole('option', {
          name: 'Resume Review & Feedback Type',
        })
        .click();

      // Student
      await page.getByRole('combobox').nth(1).click();
      await page.getByRole('option', { name: /Shruti Student/ }).click();

      // Task name
      await page
        .getByRole('textbox', { name: 'Task' })
        .fill('Submit Resume for Review');

      // Description
      await page
        .getByRole('textbox', { name: 'Description' })
        .fill('Please upload your current resume for review.');

      // Category
      await page.getByText('Application', { exact: true }).click();
      await page.getByRole('option', { name: 'Application' }).click();

      // Priority
      await page.getByText('High', { exact: true }).click();
      await page.getByRole('option', { name: 'High' }).click();

      // Due date
      await page.getByRole('textbox', { name: 'Due Date' }).click();
      await page.getByRole('gridcell', { name: /^22$/ }).click();

      // Time
      await page.getByText(':59 PM (End of Day)').click();
      await page.getByRole('option', { name: '11:00 PM' }).click();

      await page
        .getByRole('spinbutton', { name: 'Time Estimate (hours)' })
        .fill('1');

      // Tags
      await page.getByRole('textbox', { name: 'Add tags' }).fill('Resume Review');
      await page.getByRole('button', { name: 'Add' }).click();

      // Auto approve
      await page.getByText('Auto-Approve').click();
      await page
        .getByRole('option', {
          name: 'Auto-Approve Task is marked',
        })
        .click();

      await page.getByRole('button', { name: 'Create Task' }).click();

      // Verify creation
      await expect(
        page.getByText('Submit Resume for Review')
      ).toBeVisible();
    }
  );

  test('Mentor can create Resume Review task (Needs Review)', async ({ page }) => {
    await page.getByRole('button', { name: 'Create Task' }).click();

    await page.getByRole('button', { name: 'Open' }).click();
    await page
      .getByRole('option', {
        name: 'Cover Letter Template Creation',
      })
      .click();

    // Student
    await page.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: /Shruti Student/ }).click();

    // Task name
    await page
      .getByRole('textbox', { name: 'Task' })
      .fill('Create Cover Letter Template');

    // Category
    await page.getByText('Application', { exact: true }).click();
    await page.getByRole('option', { name: 'Application' }).click();

    // Priority
    await page.getByText('Medium', { exact: true }).click();
    await page.getByRole('option', { name: 'Medium' }).click();

    // Due date
    await page.getByRole('textbox', { name: 'Due Date' }).click();
    await page.getByRole('gridcell', { name: /^24$/ }).click();

    // Time
    await page.getByText(':59 PM (End of Day)').click();
    await page.getByRole('option', { name: '11:00 PM' }).click();

    await page
      .getByRole('spinbutton', { name: 'Time Estimate (hours)' })
      .fill('2');

    // Tags
    await page.getByRole('textbox', { name: 'Add tags' }).fill('Cover Letter');
    await page.getByRole('button', { name: 'Add' }).click();

    // Needs review
    await page.getByText('Auto-Approve').click();
    await page
      .getByRole('option', {
        name: 'Needs Review You will review',
      })
      .click();

    await page.getByRole('button', { name: 'Create Task' }).click();

    await expect(
      page.getByText('Create Cover Letter Template')
    ).toBeVisible();
  });

  test('Confirm and validate the fields are correct', async ({ page }) => {
    await page
      .getByRole('heading', { name: 'Submit Resume for Review' })
      .first()
      .click();

    await expect(page.getByText('Shruti Student')).toBeVisible();
    await expect(page.getByText('Please upload your current')).toBeVisible();
    await expect(page.getByText('Sun, Mar 22,')).toBeVisible();
    await expect(page.getByText('%')).toBeVisible();
    await expect(page.getByText('hours')).toBeVisible();
    await expect(page.getByText('Auto-Approve')).toBeVisible();
    await expect(page.getByText('Tags')).toBeVisible();
    await expect(page.getByText('resume', { exact: true })).toBeVisible();
    await expect(page.getByText('review', { exact: true })).toBeVisible();
    await expect(page.getByText('feedback', { exact: true })).toBeVisible();
    await expect(
      page.getByText('Resume Review', { exact: true })
    ).toBeVisible();

    await page.getByRole('button', { name: 'Close' }).click();
  });

  test('Add Feedback to task', async ({ page }) => {
    await page
      .getByRole('row', { name: 'Submit Resume for Review' })
      .getByLabel('Add Feedback to Task')
      .first()
      .click();

    await page
      .getByRole('textbox', { name: 'Feedback' })
      .fill('Feedback added (FIRST)');

    await page.getByRole('button', { name: 'Add' }).click();

    await page
      .getByRole('row', { name: 'Submit Resume for Review' })
      .getByLabel('Edit Feedback on Task')
      .click();

    await page
      .getByRole('textbox', { name: 'Feedback' })
      .fill('Feedback added (FIRST) (UPDATED)');

    await page.getByRole('button', { name: 'Update' }).click();

    await expect(
      page.getByText('Feedback added (FIRST) (UPDATED)')
    ).toBeVisible();
  });

  test('Delete task and validate if deleted', async ({ page }) => {
    await page
      .getByRole('row', { name: 'Submit Resume for Review' })
      .getByLabel('Delete')
      .first()
      .click();

    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();

    await expect(
      page.getByRole('row', { name: 'Submit Resume for Review' })
    ).not.toBeVisible();
  });
});