import { Given, Then, When, And} from "@cucumber/cucumber"
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

        });
         Then ('the admin should be abvle to select a category from the existing category dropdown', async function(){

        });

//scenario selecting a topic on activites page
        When ('The admin wants to select a new topic from the existing topic dropdown list', async function(){
            And('a category is already selected', async function(){

            })
        })
        Then ('The Admin should be able to select a unit from the Unit dropdwon list', async function(){

        })
//scenario selecting a unit on activities page
        When ('The admin wants to select a new unit from the existing unit dropdwon list', async function(){
            And('a topic is already selected', async function (){
                
            })
        })
        Then ('The admin should be able to select a unit from the Unit dropdown list', async function(){

        })

//scenario adding an activiy 
        When ('the admin wants to add a new activity',async function(){
            And('the admin selects a category from the existing category dropdwon list', async function(){

            })
            And('the admin selects a topic from the existing corresponding Topic dropdwon list', async function(){

            })
        })
        Then('the Admin selects a unit from the existing Unit dropdwon list', async function(){

        })
        Then('the admin should be abvle to add an activity with the valid information', async function(){
            And('the added activity should be visible to the admin on the Acitivities page', async function(){

            })  
        })

//scenario updating an existing activity
        When('the admin makes an edit to an existing activity with valid information', async function(){

        })
        Then('the admin should be able to save the changes in the existing activity', async function(){
            And('the updated activity should be correctly displayed on teh Activities page', async function(){

            })
        })

// scenario deletion of an existing activity    
        When('Admin wants to delete a specific activity', async function(){
            And('The admin selects a category from the existing Category dropdown list', async function(){

            })
            And('the admin selects a topic from the existing corresponding topic dropdown list', async function(){
                
            })
        })
        Then('the admin selects a unitt from the existing unit dropdown list', async function(){

        })
        Then('the admin should be able to delete an existing activity after confirmatoin of deletion', async function(){
            And('the topic should no longer exist on the Units page', async function(){

            })
        })

//scenario no units present
        When('The admin views the activities tab', async function(){
            And('there are no existing activities', async function(){

            })
        })
        Then('the admin should not see any activites displayed on the activiites page', async function)