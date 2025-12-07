import { Given, Then, When } from "@cucumber/cucumber";
import { Page } from 'playwright';
declare const page: Page;

        Given('the admin is on the home page', async function () {
            await page.goto('https://stage.tripleten.percruit.com/'),
            await page.getByRole('textbox', { name: 'Enter your email' }).click(),
            await page.getByRole('textbox', { name: 'Enter your email' }).fill('cheyannejaileen16+admin@gmail.com'),
            await page.getByRole('textbox', { name: 'Enter your password' }).click(),
            await page.getByRole('textbox', { name: 'Enter your password' }).fill('Externship22');
            await page.getByRole('button', { name: 'Sign In' }).click();
         });
       
  
         When('the admin initiates a logout', async function () {
            await page.locator('#root').getByText('Cheyanne Martinez-Darbycheyannejaileen16+admin@gmail.com').click();
            await page.getByRole('menuitem', { name: 'Sign Out' }).click();
           
         });
       
         Then('the admin should be signed out successfully', async function () {
           
         });
       
       
         Then('the login page should be displayed', async function () {
           
            await page.getByRole('heading', { name: 'Welcome to Percruit' }).click();
         });
         
        
        
         
         
        
         
         