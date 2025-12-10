import { Given, Then, When, After} from "@cucumber/cucumber"
import { Page } from "playwright";
import {expect} from '@playwright/test'
import { env } from "process";
declare const page: Page;

//scenario View existing activities        
    Given ('The Admin is logged in using valid credentials', async function () {
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
        Given ('the Admin is on the Activities tab in Coding Problems', async function(){
            //selects the activities tab
            await this.page.getByRole('tab', { name: 'Activities' }).click();
        });
        
        When('the Admin views the Activities tab in Coding Problems', async function () {
          await expect(this.page.getByRole('heading', { name: 'Activities' })).toBeVisible();
         })
        Then ('the Admin should see all existing activities', async function(){
            //page should be devoid of activities therefore no locator is needed. I simply added the url
            await expect(this.page).toHaveURL('https://stage.tripleten.percruit.com/admin/coding-problems');
        });

  //sceneario selecting a category on the activities page
        When ('the Admin filters a category using the Category dropdown', async function(){
            await this.page.getByRole('combobox').first().click();
        });
        Then ('the Admin should be able to select a category from the existing Category dropdown list', async function(){
            await this.page.getByRole('option', { name: 'TypeScript' }).click();
        });

//scenario selecting a topic on activites page
        When ('the Admin wants to select a new topic from the existing Topic dropdown list', async function(){
            await this.page.getByRole('combobox').first().click();    
            await this.page.getByRole('option', { name: 'TypeScript' }).click();
        })
        When('a Category is already selected', async function(){
            await expect(this.page.getByText('TypeScript')).toBeVisible();
            })
        Then ('The Admin should be able to select a topic from the Topic dropdown list', async function(){
            await this.page.getByRole('combobox').nth(1).click();
            await this.page.getByRole('option', { name: 'Sample Topic' }).click();
        })
//scenario selecting a unit on activities page
        When ('the Admin wants to select a new unit from the existing Unit dropdown list', async function(){
            await this.page.getByRole('combobox').first().click();    
            await this.page.getByRole('option', { name: 'TypeScript' }).click();
            await this.page.getByRole('combobox').nth(1).click();
            await this.page.getByRole('option', { name: 'Sample Topic' }).click();
            
        })
        When('a Topic is already selected', async function (){
            await expect(this.page.locator('#coding-admin-tabpanel-3')).toContainText('Sample Topic');

            })
        Then ('the Admin should be able to select a unit from the Unit dropdown list', async function(){
            await this.page.getByRole('combobox').nth(2).click();
            await this.page.getByRole('option', { name: 'unit' }).click();
        })

//scenario adding an activiy 
        When ('the Admin wants to add a new activity',async function(){
        
        })
        When('the Admin selects a category from the existing Category dropdown list', async function(){
                await this.page.getByRole('combobox').first().click();
                await this.page.getByRole('option', { name: 'TypeScript' }).click();
            })
        When('the Admin selects a topic from the existing corresponding Topic dropdown list', async function(){
                await this.page.getByRole('combobox').nth(1).click();
                await this.page.getByRole('option', { name: 'Sample Topic' }).click();
            })
        Then('the Admin selects a unit from the existing Unit dropdown list', async function(){
            await this.page.getByRole('combobox').nth(2).click();
            await this.page.getByRole('option', { name: 'unit' }).click();
        })
        Then('the Admin should be able to add an activity with the valid information', async function(){

            
            await this.page.getByRole('button', { name: 'Add Activity' }).click();
            await this.page.getByRole('button', { name: 'Generate Template' }).click();
            await this.page.getByRole('tab', { name: 'Basic Info' }).click();
            await this.page.getByRole('textbox', { name: 'Title' }).click();
            await this.page.getByRole('textbox', { name: 'Title' }).fill('Test');
            await this.page.getByRole('textbox', { name: 'Title' }).press('Tab');
            await this.page.getByRole('textbox', { name: 'Description' }).fill('Test');
            await this.page.getByRole('combobox', { name: 'Difficulty Easy' }).click();
            await this.page.getByRole('option', { name: 'Easy' }).click();
            await this.page.getByRole('button', { name: 'Create Problem' }).click();
            
        
            Then('the added activity should be visible to the Admin on the Acitivities page', async function(){
                await expect(this.page.getByRole('cell', { name: '1', exact: true })).toBeVisible();
            })  
        })

//scenario updating an existing activity
        When('the Admin makes an edit to an existing activity with valid information', async function(){
            await this.page.getByRole('combobox').first().click();
            await this.page.getByRole('option', { name: 'TypeScript' }).click();
            await this.page.getByRole('combobox').nth(1).click();
            await this.page.getByRole('option', { name: 'Sample Topic' }).click();
            await this.page.getByRole('combobox').nth(2).click();
            await this.page.getByRole('option', { name: 'unit' }).click();
            await this.page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
            await this.page.getByRole('tab', { name: 'Basic Info' }).click();
            await this.page.getByRole('textbox', { name: 'Description' }).click();
            await this.page.getByRole('textbox', { name: 'Description' }).fill('Test me like one of your french girls');
        })
        Then('the Admin should be able to save the changes in the existing activity', async function(){
            await this.page.getByRole('button', { name: 'Update Problem' }).click();
           
        })
         Then('the updated activity should be correctly displayed on the Activities page', async function(){
                await expect(this.page.getByRole('cell', { name: 'Test me like one of your' })).toBeVisible();
            })

// scenario deletion of an existing activity    
        When('the Admin wants to delete a specific activity', async function(){

        })
        When('the Admin selects a category from the existing Category dropdown list', async function(){
                
            await page.getByRole('combobox').first().click();
            await page.getByRole('option', { name: 'TypeScript' }).click();
            })
        When('the Admin selects a topic from the existing corresponding Topic dropdown list', async function(){
                
            await page.getByRole('combobox').nth(1).click();
            await page.getByRole('option', { name: 'Sample Topic' }).click();
            })
        
        Then('the Admin selects a unit from the existing Unit dropdown list', async function(){

            await page.getByRole('combobox').nth(2).click();
            await page.getByRole('option', { name: 'unit' }).click();

        })
        Then('the admin should be able to delete an existing activity after confirmatoin of deletion', async function(){
        
            After('the topic should no longer exist on the Units page', async function(){
                
            })
        })

//scenario no units present
        When('The Admin views the Activities tab', async function(){
            await page.getByRole('tab', { name: 'Activities' }).click();
        
        })
        After('there are no existing activities', async function(){

            await expect(page.getByText('No activities yet. Click "Add')).toBeVisible();

            })
        Then('the admin should not see any activites displayed on the activiites page', async function(){
            
        })