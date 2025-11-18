// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After, DataTable } from '@cucumber/cucumber';
// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';
// Import environment configuration and Page Object Models
import * as env from '../../../../src/config/world';
//import { LoginPage } from '../../../../src/pages/common/LoginPage';
import { InterviewQuestionsPage } from '../../../../src/pages/admin/InterviewQuestionsPage';
import { TIMEOUT } from 'dns';


Before(async function () {
  //Initialize the InterviewQuestionsPage object POM with the current browser page context
  this.IQPage = new InterviewQuestionsPage(this.page);
});


// Calling methods from InterviewQuestionsPage POM   

// Scenario: Adding a new question   
Given('the Admin views the Interview Questions page', async function () {
    // Click on the Interview Questions link/button to navigate to the Interview Questions page
    await this.IQPage.clickByRole('Interview Questions');   
    // Verify the Admin is on Interview Questions Manager page by heading
    await this.IQPage.verifyHeading('Interview Questions Manager');
    // Check the cookie popup appears, if found, click accept all cookies button
    await this.IQPage.handleCookiePopup();
});        
When('the Admin adds a new interview question with valid details', async function () {
    // Call the addNewQuestion method from InterviewQuestionsPage POM to fill in the form fields
    await this.IQPage.addNewQuestion(
      'Automated test question!',                     // question title
      'What is Playwright?',                          // question text
      'Playwright is a browser automation tool.',     //solution/explanation test
      'SQL',                                          // job title dropdown
      'Hard',                                         // difficulty dropdown
      ['.js', '.ts']                                  // tags
  );
});       
Then('the question is successfully saved', async function () {
    // Click on Save button to save the new question
    await this.IQPage.clickByRole('Save');   
    // Verify the form modal closes after saving and the user is back on Interview Questions Manager page
    await this.IQPage.verifyHeading('Interview Questions Manager'); 
});        
Then('the Admin should see the added question correctly displayed on Interview Questions page', async function () {
    // Verify the newly added question appears in the Questions Management list;
    // Locate the qauestion list table body
    const qlistTable = this.page.locator('tbody');
    // Locate the top (first) row of the questions list table
    const qlistFirstRow = qlistTable.locator('tr').first();
    // Verify the question title appears in the first cell
    await expect(qlistFirstRow.getByRole('heading', { name: /Automated test question/i })).toBeVisible();
    // Verify the question text appears in the first cell
    await expect(qlistFirstRow.getByText(/Playwright/i)).toBeVisible();
    console.log('✅ Verified newly added question appears correctly in the Questions Management list.');
});


//Scenario: Displaying the Add Question form modal fields correctly      
When('the admin selects the "Add Question" option', async function () {
    await this.IQPage.clickByRole('Add Question');
    // Verify Add New Question heading
    await this.IQPage.verifyHeading('Add New Question');
});
Then('a form modal is displayed containing the following fields:', async function (table: DataTable) {
    // Verify the form modal displays the correct fields
    await this.IQPage.verifyFormFields(table);      
});   
Then('the form provides options to add or remove following containers:', async function (table) {
    // Verify the add or remove options Text/Image containers in form modal are functional   
    await this.IQPage.verifyContainerOptions(table);      
});     
Then('the form displays "Save" and "Cancel" options', async function () {
    // Verify Save and Cancel buttons on modal exist  
    await this.IQPage.verifySaveCancelButtons();
});


//Scenario: Cancelling the add question process
Given('the Add Question form modal is open', async function () {
    // Click on the Add Question button to open the form modal
    await this.IQPage.clickByRole('Add Question');   
    // Verify the Add New Question heading appears
    await this.IQPage.verifyHeading('Add New Question');
});
When('the Admin selects the "Cancel" option', async function () {
    // Click on the Cancel button to close the form modal
    await this.IQPage.clickByRole('Cancel', 30000);   
});
Then ('the modal closes', async function () {
    // Verify the modal closes successfully after clicking Cancel
    await this.IQPage.verifyHeading('Interview Questions Manager');
    console.log('✅ Verified Cancel button functionality - modal closed successfully.');
});