import { Given, Then, When, After} from "@cucumber/cucumber"
import { Page } from "playwright";
import {expect} from '@playwright/test'
import { env } from "process";
declare const page: Page;

//scenario View existing activities        
    Given ('The admin is logged in using valid credentials and The admin is on the activites tab in coding problems', async function () {
        //Login and navigate to "coding problems" page
        await this.page.goto(env.BASE_URL);
        await page.getByRole('textbox', { name: 'Enter your email' }).click();
        await page.getByRole('textbox', { name: 'Enter your email' }).fill('qa+100119@qaexternship.testinator.com');
        await page.getByRole('textbox', { name: 'Enter your password' }).click();
        await page.getByRole('textbox', { name: 'Enter your password' }).fill('1Passw0rd!');
        await page.getByRole('button', { name: 'Coding Problems' }).click();
        
    });
        When ('The admin views the activity tab in coding problems', async function(){
            //selects the activities tab
            await page.getByRole('tab', { name: 'Activities' }).click();
        });

        Then ('the admin should see all existing activities', async function(){
            //page should be devoice of activities therefore no locator is needed. I simply added the url
            await expect(page).toHaveURL('https://stage.tripleten.percruit.com/admin/coding-problems');
        });

  //sceneario selecting a category on the activities page
        When ('the admin filters a category using the category dropdown', async function(){
            await page.getByRole('combobox').first().click();
        });
        Then ('the admin should be abvle to select a category from the existing category dropdown', async function(){
            await page.getByRole('option', { name: 'TypeScript' }).click();
        });

//scenario selecting a topic on activites page
        When ('The admin wants to select a new topic from the existing topic dropdown list', async function(){
            After('a category is already selected', async function(){
                 await page.getByText('TypeScript').click();
            })
        })
        Then ('The Admin should be able to select a topic from the topic dropdown list', async function(){
            await page.getByRole('combobox').nth(1).click();
            await page.getByRole('option', { name: 'Sample Topic' }).click();
        })
//scenario selecting a unit on activities page
        When ('The admin wants to select a new unit from the existing unit dropdwon list', async function(){
            After('a topic is already selected', async function (){
                await page.getByText('Sample Topic').click();
            })
        })
        Then ('The admin should be able to select a unit from the Unit dropdown list', async function(){
            await page.getByRole('combobox').nth(2).click();
            await page.getByRole('option', { name: 'unit' }).click();
        })

//scenario adding an activiy 
        When ('the admin wants to add a new activity',async function(){
            After('the admin selects a category from the existing category dropdwon list', async function(){
                await page.getByRole('combobox').first().click();
                await page.getByRole('option', { name: 'TypeScript' }).click();
            })
            After('the admin selects a topic from the existing corresponding Topic dropdwon list', async function(){
                await page.getByRole('combobox').nth(1).click();
                await page.getByRole('option', { name: 'Sample Topic' }).click();
            })
        })
        Then('the Admin selects a unit from the existing Unit dropdwon list', async function(){
            await page.getByRole('combobox').nth(2).click();
            await page.getByRole('option', { name: 'unit' }).click();
        })
        Then('the admin should be abvle to add an activity with the valid information', async function(){

            
            await page.getByRole('button', { name: 'Add Activity' }).click();
            await page.getByRole('button', { name: 'Generate Template' }).click();
            await page.getByRole('tab', { name: 'Basic Info' }).click();
            await page.getByRole('textbox', { name: 'Title' }).click();
            await page.getByRole('textbox', { name: 'Title' }).fill('Test');
            await page.getByRole('textbox', { name: 'Title' }).press('Tab');
            await page.getByRole('textbox', { name: 'Description' }).fill('Test');
            await page.getByRole('combobox', { name: 'Difficulty Easy' }).click();
            await page.getByRole('option', { name: 'Easy' }).click();
            await page.getByRole('button', { name: 'Create Problem' }).click();
            
        
            After('the added activity should be visible to the admin on the Acitivities page', async function(){
                await expect(page.getByRole('cell', { name: '1', exact: true })).toBeVisible();
            })  
        })

//scenario updating an existing activity
        When('the admin makes an edit to an existing activity with valid information', async function(){

            await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
            await page.getByRole('textbox', { name: 'Description' }).click();
            await page.getByRole('textbox', { name: 'Description' }).fill('Test me like one of your french girls');
        })
        Then('the admin should be able to save the changes in the existing activity', async function(){
            await page.getByRole('button', { name: 'Update Problem' }).click();
            After('the updated activity should be correctly displayed on the Activities page', async function(){
                await expect(page.getByRole('cell', { name: 'Test me like one of your' })).toBeVisible();
            })
        })

// scenario deletion of an existing activity    
        When('Admin wants to delete a specific activity', async function(){
            After('The admin selects a category from the existing Category dropdown list', async function(){
                
                await page.getByRole('combobox').first().click();
                await page.getByRole('option', { name: 'TypeScript' }).click();
            })
            After('the admin selects a topic from the existing corresponding topic dropdown list', async function(){
                
                await page.getByRole('combobox').nth(1).click();
                await page.getByRole('option', { name: 'Sample Topic' }).click();
            })
        })
        Then('the admin selects a unitt from the existing unit dropdown list', async function(){

            await page.getByRole('combobox').nth(2).click();
            await page.getByRole('option', { name: 'unit' }).click();

        })
        Then('the admin should be able to delete an existing activity after confirmatoin of deletion', async function(){
            if(true){
                page.once('dialog', dialog => {
                    console.log(`Dialog message: ${dialog.message()}`);
                    dialog.dismiss().catch(() => {});
            });
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
        }
        else
        {
            
        page.once('dialog', dialog => {
          console.log(`Dialog message: ${dialog.message()}`);
          dialog.dismiss().catch(() => {});
        });
        await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
        }
            After('the topic should no longer exist on the Units page', async function(){
                
            })
        })

//scenario no units present
        When('The admin views the activities tab', async function(){
            After('there are no existing activities', async function(){
                
            })
        })
        Then('the admin should not see any activites displayed on the activiites page', async function(){
            
        })