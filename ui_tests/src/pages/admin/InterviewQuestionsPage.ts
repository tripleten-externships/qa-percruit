import { Page, expect } from '@playwright/test';
//import * as env from '../../config/world';
import { BasePage } from '../common/BasePage';
import { TIMEOUT } from 'dns';

// Page Object Model (POM) class for the InterviewQuestionsPage
export class InterviewQuestionsPage extends BasePage {
  // Constructor to initialize the page object
  constructor(page: Page) {
    super(page);
  }
// Define element locators for Interview Questions page....

// Methods to carry out actions on the Interview Questions page...

// Click Button method
async clickByRole(buttonName: string, timeout = 30000): Promise<void> {
  const button = this.page.getByRole('button', { name: buttonName });
  await expect(button).toBeVisible({ timeout });
  await button.click();
  await this.page.waitForLoadState('networkidle', { timeout });
}

// Click by Text method
async clickByText(text: string, timeout = 30000): Promise<void> {
  const element = this.page.getByText(text);
  await expect(element).toBeVisible({ timeout });
  await element.click();
}

// Fill TextBox method
async fillTextBox(fieldName: string, value: string, timeout = 30000): Promise<void> {
  // Wait for the textbox with the correct name to appear
  await this.page.waitForSelector(`role=textbox[name="${fieldName}"]`, { timeout });
  const textbox = this.page.getByRole('textbox', { name: fieldName });
  await expect(textbox).toBeVisible({ timeout });
  await textbox.fill(value);
  await this.page.waitForLoadState('networkidle', { timeout });

}

// Fill TextArea method;(requires passing locator as there is no name for TextArea)
async fillTextArea(locator: string, value: string, timeout = 30000): Promise<void> {
  const textArea = this.page.locator(locator);
  await expect(textArea).toBeVisible({ timeout });
  await textArea.fill(value);
  await this.page.waitForLoadState('networkidle', { timeout });
}

// Verify Heading method
async verifyHeading(headingName: string, timeout = 30000): Promise<void> {
  const heading = this.page.getByRole('heading', { name: headingName });
  await expect(heading).toBeVisible({ timeout });
  }

// Handle cookie popup if visible
async handleCookiePopup(): Promise<void> {
   const cookiePopup = this.page.locator('div').filter({ hasText: 'This website uses cookies' }).nth(2);
   const cookieAccept = this.page.getByRole('button', { name: 'Accept all cookies' });

   if (await cookiePopup.isVisible()) {
     await expect(cookieAccept).toBeVisible();
     await cookieAccept.click();
     console.log('✅ Cookie popup closed successfully.');
     await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    }
  }


// Add question method
async addNewQuestion(
  title: string,
  question: string,
  solution: string,
  jobTitle: string,
  difficulty: string,
  tags: string[]
): Promise<void> {
  // Click Add Question button
  await this.clickByRole('Add Question');

  // Verify Add New Question heading
  await this.verifyHeading('Add New Question');

  // Fill Title and Question
  await this.fillTextBox('Title', title, 30000);
  await this.fillTextBox('Question', question, 30000);

  // Fill Solution textarea
  await this.fillTextArea('.MuiBox-root.css-5qphk3', solution);

  // Open Job Title dropdown
  const jobTitleDropDown = this.page.getByRole('combobox').nth(1);
  await expect(jobTitleDropDown).toBeVisible({ timeout: 30000 });
  await jobTitleDropDown.click();

  // Wait for the full dropdown list to be visible
  const dropdownList = this.page.getByText('Software EngineerCoding, algorithms, system designData ScientistStatistics, ML', { exact: false });
  await expect(dropdownList).toBeVisible({ timeout: 30000 });

  // Select job title using regex to match just the beginning of the option
  const jobOption = this.page.getByRole('option', { name: jobTitle });
  await expect(jobOption).toBeVisible({ timeout: 30000 });
  await jobOption.click();

  // Close dropdown by clicking outside (backdrop)
  const backdrop = this.page.locator('.MuiBackdrop-root.MuiBackdrop-invisible');
  await expect(backdrop).toBeVisible({ timeout: 30000 });
  await backdrop.click();
  await expect(backdrop).toBeHidden({ timeout: 30000 });
  console.log(await this.page.locator('div[role="combobox"]').nth(1).innerText());

  // Verify the selected job title is visible in the combo box
  await expect(this.page.locator('div').filter({ hasText: /^SQL$/ }).nth(1)).toBeVisible({ timeout: 30000 });
  

  // Open Difficulty dropdown
  const difficultyDropdown = this.page.getByRole('combobox').filter({ hasText: 'Medium' });
  await expect(difficultyDropdown).toBeVisible({ timeout: 30000 });
  await difficultyDropdown.click();

  // Verify the the difficulty list is opened
  const difficultyList = this.page.getByText('EasyMediumHard');
  await expect(difficultyList).toBeVisible({ timeout: 30000 });

  // Select the difficulty option 
  const difficultyOption = this.page.getByRole('option', { name: difficulty});
  await expect(difficultyOption).toBeVisible({ timeout: 30000 });
  await difficultyOption.click();

  // Verify the difficulty option is selected
  await expect(this.page.getByRole('combobox').filter({ hasText: difficulty })).toBeVisible({ timeout: 30000 });

  // Verify the dropdown is closed
  await expect(this.page.locator('div').filter({ hasText: 'Add New QuestionTitle *Title' }).nth(1)).toBeVisible({ timeout: 30000 });

  // Add tags one by one
  for (const tag of tags) {
    const tagInput = this.page.getByRole('textbox', { name: 'Add a tag' });
    await expect(tagInput).toBeVisible({ timeout: 30000 });
    await tagInput.fill(tag);

    const addButton = this.page.getByRole('button', { name: 'Add', exact: true });
    await expect(addButton).toBeVisible({ timeout: 30000 });
    await addButton.click();

    // Ensure textbox is cleared before next tag
    await expect(tagInput).toHaveValue('', { timeout: 30000 });
  }
}


// Verify form modal fields displayed correctly in Add Question modal method
async verifyFormFields(table: any): Promise<void> {
  const fields = table.hashes(); // Convert Gherkin table to array of objects

  for (const row of fields) {
    const fieldName = row['Field Name'];
    const fieldType = row['Type'];

    let fieldLocator;

    switch (fieldType) {

      case 'Text Field':
    // Matches the textbox based on field name   
    if (/tags/i.test(fieldName)) {
    fieldLocator = this.page.getByRole('textbox', { name: /Add a tag/i });
    } else {
    const escapedName = fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    fieldLocator = this.page.getByRole('textbox', { name: new RegExp(`^${escapedName}`, 'i') });
    }
    break;

     case 'Text Area':
    // Matxhes the textarea based on field name
    if (/solution/i.test(fieldName)) {
        // For Solution/Explanation block, just check the contenteditable div
        fieldLocator = this.page.locator('div[contenteditable="true"]').nth(0);
    } else if (/question/i.test(fieldName)) {
        // Question textarea has a label
        fieldLocator = this.page.getByLabel(new RegExp(`^${fieldName}\\s*\\*?$`, 'i'));
    } else {
        // fallback
        fieldLocator = this.page.locator('textarea');
    }
    break;
  
   case 'Dropdown':
  // Matches the combobox that either has the label or the current value inside
  fieldLocator = this.page.locator('div[role="combobox"]').filter({
  hasText: new RegExp(`(${fieldName}|Easy|Medium|Hard|Software Engineer|Data Scientist)`, 'i')
  });
  break;
  default:throw new Error(`Unknown field type: ${fieldType}`);
  }

  console.log(`🔍 Checking field: ${fieldName} (${fieldType})`);
  await expect(fieldLocator).toBeVisible({ timeout: 10000 });
  console.log(`✅ Verified field: ${fieldName} (${fieldType})`);
  }
}

// Verify add/remove container options in Add Question modal method
async verifyContainerOptions(table: any): Promise<void> {
  for (const row of table.hashes()) {
    const containerType = row['Container Type']; // "Text Container" or "Image Container"
    const shortType = containerType.split(' ')[0]; // "Text" or "Image"

    // Click Add block button
    const addButton = this.page.getByRole('button', { name: `Add ${shortType} Block` });
    await expect(addButton).toBeVisible({ timeout: 30000 });
    await addButton.click();
    console.log(`➡️ Clicked "Add ${shortType} Block"`);

    // Wait for the new block container to appear (last block of this type)
    const blockContainer = this.page.locator('div.MuiPaper-root').filter({ hasText: `${shortType} Block` }).last();
    await expect(blockContainer).toBeVisible({ timeout: 30000 });
    console.log(`✅ ${shortType} block added successfully`);

    // Get number of blocks before removal
    const blocksBefore = await this.page.locator('div.MuiPaper-root').filter({ hasText: `${shortType} Block` }).count();

    // Locate the "Remove" link scoped inside this block container
    const removeLink = blockContainer.getByText('Remove').first();
    await expect(removeLink).toBeVisible({ timeout: 30000 });

    // Click the Remove link
    await removeLink.click();
    console.log(`🗑️ Clicked "Remove" link to remove ${shortType} block`);

    // Wait for the block to be fully removed using waitForFunction
    const blockSelector = 'div.MuiPaper-root';
    await this.page.waitForFunction(
      ({ selector, type, previousCount }: { selector: string; type: string; previousCount: number }) => {
        const elements = Array.from(document.querySelectorAll(selector)).filter(el => el.textContent?.includes(type));
        return elements.length < previousCount;
      },
      { selector: blockSelector, type: `${shortType} Block`, previousCount: blocksBefore },
      { timeout: 15000 }
    );

    console.log(`✅ ${shortType} block removed successfully`);
    
  }
}

// Verify Save and Cancel buttons in Add Question modal method
async verifySaveCancelButtons(): Promise<void> {
  // Wait for modal to appear
await this.verifyHeading('Add New Question');
const saveButton = this.page.getByRole('button', { name: 'Save' }); 
const cancelButton = this.page.getByRole('button', { name: 'Cancel' }); 
await expect(saveButton).toBeVisible({ timeout: 30000 }); 
await expect(cancelButton).toBeVisible({ timeout: 30000 }); 
console.log('✅ Verified Save and Cancel buttons'); } 

}

