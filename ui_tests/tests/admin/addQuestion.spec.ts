import { test, expect } from '@playwright/test';
import { InterviewQuestionsPage } from '../../src/pages/admin/InterviewQuestionsPage';

test.describe('Admin - Interview Questions Management', () => {
  let iqPage: InterviewQuestionsPage;

  test.beforeEach(async ({ page }) => {
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
    const expectedFields = [
      'Question Title',
      'Question Text',
      'Solution',
      'Job Title',
      'Difficulty',
      'Tags'
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

});