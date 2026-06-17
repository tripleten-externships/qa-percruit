import { test, expect } from '@playwright/test';
import { InterviewQuestionsPage } from '../../src/pages/admin/InterviewQuestionsPage';
import { LoginPage } from '../../src/pages/common/LoginPage';


test.describe('Admin - Interview Questions Management', () => {
  let iqPage: InterviewQuestionsPage;
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
     await loginPage.loginAsUserType('Admin');
     iqPage = new InterviewQuestionsPage(page);
    // Navigate to Interview Questions page
    await iqPage.clickByRole('Interview Questions');
    await iqPage.verifyHeading('Interview Questions Manager');
    await iqPage.handleCookiePopup();
  });

  /* 
  Scenario: Adding a new question 
    When I add the title "Scenario: Adding a new question" to the log
    And the Admin adds a new interview question with valid details
    Then the question is successfully saved
    And the Admin should see the added question correctly displayed on Interview Questions page*/

  test('Admin can add a new interview question successfully', async ({ page }) => {
    await iqPage.addNewQuestion(
      'Automated test question!',
      'What is Playwright?',
      'Playwright is a browser automation tool.',
      'SQL',
      'Hard',
      ['.js', '.ts']
    );

    await iqPage.clickByRole('Save');
    await iqPage.verifyHeading('Interview Questions Manager');

    // Verify question appears in table
    const qlistTable = page.locator('tbody');
    const qlistFirstRow = qlistTable.locator('tr').first();

    await expect(
      qlistFirstRow.getByRole('heading', { name: /Automated test question/i })
    ).toBeVisible();

    await expect(
      qlistFirstRow.getByText(/Playwright/i)
    ).toBeVisible();
  });

  /*Scenario: Displaying the Add Question form modal fields correctly
    When I add the title "Scenario: Displaying the Add Question form modal fields correctly" to the log
    When the admin selects the "Add Question" option
    Then a form modal is displayed containing the following fields:
      | Field Name                                       | Type        |
      | Title                                            | Text Field  |
      | Question                                         | Text Area   |
      | Solution/Explanation                             | Text Area   |
      | Tags                                             | Text Field  |
      | Difficulty                                       | Dropdown    |
      | Job Titles (Select Multiple)                     | Dropdown    |
      And the form provides options to add or remove following containers:
      | Container Type  |
      | Text Container  |
      | Image Container |
    And the form displays "Save" and "Cancel" options
     */

  test('Add Question modal displays correct fields and options', async () => {
    await iqPage.clickByRole('Add Question');
    await iqPage.verifyHeading('Add New Question');

    // Replace DataTable with array equivalent
    // const expectedFields = [
    //   'Question Title',
    //   'Question Text',
    //   'Solution',
    //   'Job Title',
    //   'Difficulty',
    //   'Tags'
    // ];
    const expectedFields = [
  { 'Field Name': 'Title', Type: 'Text Field' as const },
  { 'Field Name': 'Question', Type: 'Text Area' as const },
  { 'Field Name': 'Solution', Type: 'Text Area' as const },
  { 'Field Name': 'Job Titles', Type: 'Dropdown' as const },
  { 'Field Name': 'Difficulty', Type: 'Dropdown' as const },
  { 'Field Name': 'Tags', Type: 'Text Field' as const }
];

    await iqPage.verifyFormFields(expectedFields);

    const expectedContainers = [
      'Add Text Container',
      'Add Image Container'
    ];

    await iqPage.verifyContainerOptions(expectedContainers);

    await iqPage.verifySaveCancelButtons();
  });

  /* Scenario: Cancelling the add question process
    Given the Add Question form modal is open
    When I add the title "Scenario: Cancelling the add question process" to the log
    When the Admin selects the "Cancel" option
    Then the modal closes */

  test('Admin can cancel Add Question modal', async () => {
    await iqPage.clickByRole('Add Question');
    await iqPage.verifyHeading('Add New Question');

    await iqPage.clickByRole('Cancel');
    await iqPage.verifyHeading('Interview Questions Manager');
  });


  test('Editing a question', { tag: '@smoke', }, async ({ page }) => {
    //visit await page.goto('https://stage.tripleten.percruit.com/');
    await page.goto('https://stage.tripleten.percruit.com/');
    //Login as admin
    await page.getByRole('textbox', { name: 'user@example.com' }).click();
    await page.getByRole('textbox', { name: 'user@example.com' }).fill('build.brandy+admin@proton.me');
    await page.getByRole('textbox', { name: 'Enter your password' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('Admin.testing25');
    await page.getByRole('button', { name: 'Sign In' }).click();
    //Navigate to "Interview Questions" and page displays
    await page.getByRole('link', { name: 'Interview Questions' }).click();
    //Select a question and click edit button
    await page.locator('tr:nth-child(33) > .MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignCenter > .MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorPrimary').click();
    await page.locator('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorError.MuiIconButton-sizeSmall.css-1iqjz52[tabindex="0"]').click();
    //Make changes to an existing question
    await page.getByRole('textbox', { name: 'Title' }).click();
    await page.getByRole('textbox', { name: 'Title' }).fill('Brandy Testing for playwright file editing testing');
    await page.getByRole('textbox', { name: 'Question' }).click();
    await page.getByRole('textbox', { name: 'Question' }).fill('Testing Testing, editing testing');
    await page.getByRole('combobox').filter({ hasText: 'QA Analyst' }).click();
    await page.getByRole('option', { name: 'Software Engineer Coding,' }).getByRole('paragraph').click();
    await page.locator('.MuiBackdrop-root.MuiBackdrop-invisible').click();
    await page.locator('.MuiBox-root.css-yi3mkw').click();
    await page.getByRole('option', { name: 'QA Analyst Testing strategies' }).getByRole('paragraph').click();
    await page.getByRole('paragraph').filter({ hasText: 'Cybersecurity' }).click();
    await page.locator('.MuiBackdrop-root.MuiBackdrop-invisible').click();
    //Click "update" button
    await page.getByRole('button', { name: 'Update' }).click();
  });

  test('Deleting a question', { tag: '@smoke' }, async ({ page }) => {
    // The beforeEach hook already handles navigation and setup
    const deleteButton = page.locator('tr:nth-child(1) > .MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignCenter > .MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorError');
    
    const [dialog] = await Promise.all([
      page.waitForEvent('dialog'),
      deleteButton.click()
    ]);

    await dialog.accept();
  });

  
});




