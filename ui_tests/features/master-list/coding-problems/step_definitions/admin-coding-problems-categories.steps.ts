// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect, BrowserContext } from '@playwright/test';

// Import environment configuration and Page Object Models
import { env } from 'process';
   

Given ('the Admin is authenticated in the system', async function () {
  //Login and navigate to "coding problems" page
  await this.page.goto(env.BASE_URL);
  await this.page.getByRole('textbox', { name: 'user@example.com' }).click();
  await this.page.getByRole('textbox', { name: 'user@example.com' }).fill('qa+100119@qaexternship.testinator.com');
  await this.page.getByRole('textbox', { name: 'Enter your password' }).click();
  await this.page.getByRole('textbox', { name: 'Enter your password' }).fill('1Passw0rd!');
  await this.page.getByRole('button', { name: 'Sign In' }).click();
  await this.page.getByRole('button', { name: 'Coding Problems' }).click();
  await this.page.getByRole('button', { name: '×' }).click();
        
        
    });
  When('the Admin navigates to the Coding Problems page', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    await this.page.getByRole('button', { name: 'Coding Problems'}).click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    await expect(this.page.getByRole('heading', { name: 'Coding Practice Administration' })).toBeVisible();
});

  Then('the Admin should see all existing coding problems grouped by category', async function () {
    const categoryHeadings = this.page.locator('h6.MuiTypography-h6');
    await expect(categoryHeadings.first()).toBeVisible();
    // Log or count how many categories are visible
    const count = await categoryHeadings.count();
    console.log(`✅ ${count} categories are visible on the Categories tab.`);
    // Optional: assert that at least one category exists
    expect(count).toBeGreaterThan(0)
});

//Scenario Adding a new Category
  When('the Admin adds a new category with valid information', async function() {
    await this.page.getByRole('button', { name: 'Add Category' }).click();
    await this.page.getByRole('textbox', { name: 'Name' }).click();
    await this.page.getByRole('textbox', { name: 'Name' }).fill('Test');
    await this.page.getByRole('textbox', { name: 'Description' }).click();
    await this.page.getByRole('textbox', { name: 'Description' }).fill('Test');
    await this.page.getByRole('button', { name: 'Save' }).click();
 })

  Then('the new category should be visible along with the other Coding Problems categories', async function(){
    await this.page.getByRole('button', { name: 'Add Topic' }).click();
    await this.page.getByRole('textbox', { name: 'Name' }).click();
    await this.page.getByRole('textbox', { name: 'Name' }).fill('Ultramarine');
    await this.page.getByRole('textbox', { name: 'Name' }).press('Tab');
    await this.page.getByRole('textbox', { name: 'Description' }).fill('Blue');
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.getByRole('tab', { name: 'Units' }).click();
    await this.page.getByRole('combobox').nth(1).click();
    await this.page.getByRole('option', { name: 'Ultramarine' }).click();
    await this.page.getByRole('button', { name: 'Add Unit' }).click();
    await this.page.getByRole('textbox', { name: 'Name' }).click();
    await this.page.getByRole('textbox', { name: 'Name' }).fill('The Warp');
    await this.page.getByRole('textbox', { name: 'Name' }).press('Tab');
    await this.page.getByRole('textbox', { name: 'Description' }).fill('Chaos');
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.getByRole('tab', { name: 'Activities' }).click();
    await expect(this.page.getByText('No activities yet. Click "Add')).toBeVisible();
  })

  Then('coding problems can be associated with the new category', async function(){
    await this.page.getByRole('button', { name: 'Add Activity' }).click();
    await this.page.getByRole('tab', { name: 'Basic Info' }).click();
    await this.page.getByRole('textbox', { name: 'Title' }).click();
    await this.page.getByRole('textbox', { name: 'Title' }).fill('Tester');
    await this.page.getByRole('textbox', { name: 'Title' }).press('Tab');
    await this.page.getByRole('textbox', { name: 'Description' }).fill('Testing');
    await this.page.getByRole('button', { name: 'Create Problem' }).click();
  })

//Scenario updating an existing category
  When('the Admin edits a coding problem in a category with valid information', async function(){

  })
  Then('the details for the coding problems will be changed successfully', async function(){

  })
  Then('the updated category should be correctly displayed on the Categories page', async function(){

  })

//Deletion of an existing category
  When('the Admin deletes a specific category', async function(){

  })
  Then('the Admin should receive a message asking if they are sure they want to delete the specific category', async function(){

  })
  Then('the category should no longer exist on the Categories page after confirmation', async function(){

  })
//scenario No Categories present
  When('the Admin views the Categories tab', async function(){

  })
  Then('the Admin views the Categories tab', async function(){

  })
  Then('the Admin should not see any categories displayed on the Categories page', async function(){
    
  })