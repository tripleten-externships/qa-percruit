import { Given, Then, When} from "@cucumber/cucumber"
import { Page } from "playwright";
import {expect} from '@playwright/test'
import { env } from "process";
declare const page: Page;

        
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

   /* Given ('The admin is logged in using valid credentials and The admin is on the activites tab in coding problems', async function () {
        await this.page.goto(env.BASE_URL);
        await page.getByRole('textbox', { name: 'Enter your email' }).click();
        await page.getByRole('textbox', { name: 'Enter your email' }).fill('qa+100119@qaexternship.testinator.com');
        await page.getByRole('textbox', { name: 'Enter your password' }).click();
        await page.getByRole('textbox', { name: 'Enter your password' }).fill('1Passw0rd!');
        await page.getByRole('button', { name: 'Coding Problems' }).click();
        
    });
        When ('the admin filters a category using the category dropdown', async function(){

        });
        Then ('the admin should be abvle to select a category from the existing category dropdown', async function(){

        });

    Given ('The admin is logged in using valid credentials and The admin is on the activites tab in coding problems', async function () {
        await page.goto('https://stage.tripleten.percruit.com/');
        await page.getByRole('textbox', { name: 'Enter your email' }).click();
        await page.getByRole('textbox', { name: 'Enter your email' }).fill('qa+100119@qaexternship.testinator.com');
        await page.getByRole('textbox', { name: 'Enter your password' }).click();
        await page.getByRole('textbox', { name: 'Enter your password' }).fill('1Passw0rd!');
        await page.getByRole('button', { name: 'Coding Problems' }).click();
        
    }); */