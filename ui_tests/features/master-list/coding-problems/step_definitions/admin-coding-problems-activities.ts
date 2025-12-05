import { Given, Then, When} from "@cucumber/cucumber"
import { Page } from "playwright";
declare const page: Page;

        
    Given ('The admin is logged in using valid credentials and The admin is on the activites tab in coding problems', async function () {
        await page.goto('https://stage.tripleten.percruit.com/');
        await page.getByRole('textbox', { name: 'Enter your email' }).click();
        await page.getByRole('textbox', { name: 'Enter your email' }).fill('qa+100119@qaexternship.testinator.com');
        await page.getByRole('textbox', { name: 'Enter your password' }).click();
        await page.getByRole('textbox', { name: 'Enter your password' }).fill('1Passw0rd!');
        await page.getByRole('button', { name: 'Coding Problems' }).click();
        
    });
        When ('The admin views the activity tab in coding problems', async function(){
            await page.getByRole('tab', { name: 'Activities' }).click();
        });

        Then ('the admin should see all existing activities', async function(){

        });

   /* Given ('The admin is logged in using valid credentials and The admin is on the activites tab in coding problems', async function () {
        await page.goto('https://stage.tripleten.percruit.com/');
        await page.getByRole('textbox', { name: 'Enter your email' }).click();
        await page.getByRole('textbox', { name: 'Enter your email' }).fill('qa+100119@qaexternship.testinator.com');
        await page.getByRole('textbox', { name: 'Enter your password' }).click();
        await page.getByRole('textbox', { name: 'Enter your password' }).fill('1Passw0rd!');
        await page.getByRole('button', { name: 'Coding Problems' }).click();
        
    });
        When ('the admin filters a category using the category dropdown', async function(){

        });
        Then ('the admin should be abvle to select a category fro mthe existing category dropdown', async function(){

        });

    Given ('The admin is logged in using valid credentials and The admin is on the activites tab in coding problems', async function () {
        await page.goto('https://stage.tripleten.percruit.com/');
        await page.getByRole('textbox', { name: 'Enter your email' }).click();
        await page.getByRole('textbox', { name: 'Enter your email' }).fill('qa+100119@qaexternship.testinator.com');
        await page.getByRole('textbox', { name: 'Enter your password' }).click();
        await page.getByRole('textbox', { name: 'Enter your password' }).fill('1Passw0rd!');
        await page.getByRole('button', { name: 'Coding Problems' }).click();
        
    }); */