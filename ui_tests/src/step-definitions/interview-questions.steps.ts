import { Given, When, Then, Before, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InterviewQuestionsPage } from '../pages/admin/InterviewQuestionsPage';

Before(async function () {
  this.IQPage = new InterviewQuestionsPage(this.page);
});

Given('the Admin views the Interview Questions page', async function () {
  await this.IQPage.clickByRole('Interview Questions');
  await this.IQPage.verifyHeading('Interview Questions Manager');
  await this.IQPage.handleCookiePopup();
});

When('the Admin adds a new interview question with valid details', async function () {
  await this.IQPage.addNewQuestion(
    'Automated test question!',
    'What is Playwright?',
    'Playwright is a browser automation tool.',
    'SQL',
    'Hard',
    ['.js', '.ts']
  );
});

Then('the question is successfully saved', async function () {
  await this.IQPage.clickByRole('Save');
  await this.IQPage.verifyHeading('Interview Questions Manager');
});

Then('the Admin should see the added question correctly displayed on Interview Questions page', async function () {
  const qlistTable = this.page.locator('tbody');
  const qlistFirstRow = qlistTable.locator('tr').first();
  await expect(qlistFirstRow.getByRole('heading', { name: /Automated test question/i })).toBeVisible();
  await expect(qlistFirstRow.getByText(/Playwright/i)).toBeVisible();
});

When('the admin selects the "Add Question" option', async function () {
  await this.IQPage.clickByRole('Add Question');
  await this.IQPage.verifyHeading('Add New Question');
});

Then('a form modal is displayed containing the following fields:', async function (table: DataTable) {
  await this.IQPage.verifyFormFields(table);
});

Then('the form provides options to add or remove following containers:', async function (table) {
  await this.IQPage.verifyContainerOptions(table);
});

Then('the form displays "Save" and "Cancel" options', async function () {
  await this.IQPage.verifySaveCancelButtons();
});

Given('the Add Question form modal is open', async function () {
  await this.IQPage.clickByRole('Add Question');
  await this.IQPage.verifyHeading('Add New Question');
});

When('the Admin selects the "Cancel" option', async function () {
  await this.IQPage.clickByRole('Cancel', 30000);
});

Then('the modal closes', async function () {
  await this.IQPage.verifyHeading('Interview Questions Manager');
});

When('the Admin navigates to the Coding Problems page', async function () {
  await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  await this.page.getByRole('button', { name: 'Coding Problems' }).click();
  await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  await expect(this.page.getByRole('heading', { name: 'Coding Practice Administration' })).toBeVisible();
});

Then('the Admin should see all existing coding problems grouped by category', async function () {
  const categoryHeadings = this.page.locator('h6.MuiTypography-h6');
  await expect(categoryHeadings.first()).toBeVisible();
  const count = await categoryHeadings.count();
  expect(count).toBeGreaterThan(0);
});
