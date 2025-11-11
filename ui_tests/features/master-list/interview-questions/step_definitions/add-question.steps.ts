// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';
//import { StudentDashboardPage } from '../../../src/pages/student/StudentDashboardPage';



       
Given('the Admin views the Interview Questions page', async function () {
    await this.page.getByRole('button', { name: 'Interview Questions' }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    await expect(this.page.getByRole('heading', { name: 'Interview Questions Manager' })).toBeVisible();
    // Wait for the Interview Questions page to load completely
    await this.page.waitForLoadState('networkidle');
    // Check if the cookie popup appears, if found, click accept all cookies button
    const cookiePopup = this.page.locator('div').filter({ hasText: 'This website uses cookies' }).nth(2);
    const cookieAccept = this.page.getByRole('button', { name: 'Accept all cookies' })

      if (await cookiePopup.isVisible()) {
         await expect(cookieAccept).toBeVisible();
         await cookieAccept.click();
         console.log('✅ Cookie popup closed successfully.');
} 
   
});  
       
When('the Admin adds a new interview question with valid details', async function () {
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    await this.page.getByRole('button', { name: 'Add Question' }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    await expect(this.page.getByRole('heading', { name: 'Add New Question' })).toBeVisible();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    // Fill the "Title" field
    await this.page.getByRole('textbox', { name: 'Title' }).fill('Automated test question!');
    // Fill the "Question" textarea
    await this.page.getByRole('textbox', { name: 'Question' }).fill('What is Playwright?');
    // Fill the "Solution" textarea
    await this.page.locator('.MuiBox-root.css-5qphk3').fill('Playwright is a browser automation tool.');
    // Verify jobTitleDropDown (comboBox) is visible and click on it; nth is comboBox index starting from 0
    const jobTitleDropDown = this.page.getByRole('combobox').nth(1);
    await expect(jobTitleDropDown).toBeVisible();
    await jobTitleDropDown.click();
    //Verify jobTitleDropDown list is visible; the text value with slashes,treated as a regex, and i makes it case-insensitive.
    await expect(this.page.getByText('Software EngineerCoding, algorithms, system designData ScientistStatistics, ML')).toBeVisible(); 
    // Select "SQL" option
    await this.page.getByText('SQLDatabase queries, joins,').click();
    // Click on backdrop (outside) of the comboBox to close the dropdown
    await this.page.locator('.MuiBackdrop-root.MuiBackdrop-invisible').click();
    // Verify the dropdown is closed
    await expect(this.page.locator('div').filter({ hasText: 'Add New QuestionTitle *Title' }).nth(1)).toBeVisible();
    // Verify "SQL" option is selected
    await expect(this.page.locator('div').filter({ hasText: /^SQL$/ }).nth(1)).toBeVisible();
    // Verify and difficultyDropdown(comboBox) is visible and click on it
    const difficultyDropdown = this.page.getByRole('combobox').filter({ hasText: 'Medium' });
    await expect(difficultyDropdown).toBeVisible();
    await difficultyDropdown.click();
    // Verify comboBox list is visible
    await expect(this.page.getByText('EasyMediumHard')).toBeVisible();
    // Select "Hard" option
    await this.page.getByRole('option', { name: 'Hard' }).click();
    // Verify Hard option is selected
    await expect(this.page.getByRole('combobox').filter({ hasText: 'Hard' })).toBeVisible();
    // Verify the dropdown is closed
    await expect(this.page.locator('div').filter({ hasText: 'Add New QuestionTitle *Title' }).nth(1)).toBeVisible();
    // Fill the Add Tags input field
    await this.page.getByRole('textbox', { name: 'Add a tag' }).fill('.js');
    // Click on Add button
    await this.page.getByRole('button', { name: 'Add', exact: true }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    // Fill the Add Tags input field with another tag
    await this.page.getByRole('textbox', { name: 'Add a tag' }).fill('.ts');
    // Click on Add button
    await this.page.getByRole('button', { name: 'Add', exact: true }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    
});
       

       
Then('the question is successfully saved', async function () {
    // Click on Save button to save the new question
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    // Verify the form modal closes after saving and the user is back on Interview Questions Manager page
    await expect(this.page.getByRole('heading', { name: 'Interview Questions Manager' })).toBeVisible();  
  
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

 
});
