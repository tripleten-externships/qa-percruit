import { Given, Then, When } from "@cucumber/cucumber"; 
import { expect } from "playwright/test";    
         Given('the admin is on the login page', async function () {
           // Write code here that turns the phrase above into concrete actions
            await this.page.goto('https://stage.tripleten.percruit.com/');
            await this.page.getByRole('heading', { name: 'Welcome to Percruit' }).click();
         });
    
         When('the admin clicks the {string} link', async function (string) {
           // Write code here that turns the phrase above into concrete actions
           await page.getByRole('button', { name: '×' }).click();
           await this.page.getByRole('button', { name: 'Forgot password?' }).click();
         });
  
         Then('the system should navigate to the password reset page', async function () {
           // Write code here that turns the phrase above into concrete actions  
            await this.page.getByRole('heading', { name: 'Reset Password' }).click();
        
         });
       
         Then('the page should display a form to enter the registered email address', async function () {
           // Write code here that turns the phrase above into concrete actions
           await this.page.getByRole('textbox', { name: 'user@example.com' }).click();
           await this.page.getByRole('textbox', { name: 'user@example.com' }).fill('cheyannejaileen16+admin@gmail.com');
         });