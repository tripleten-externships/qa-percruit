import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "playwright/test";
       
         Given('the admin is logged into the system', async function () {
         // user logs in as an admin
            await this.page.goto('https://stage.tripleten.percruit.com/');
            await this.page.getByRole('textbox', { name: 'user@example.com' }).click();
            await this.page.getByRole('textbox', { name: 'user@example.com' }).fill('cheyannejaileen16+admin@gmail.com');
            await this.page.getByRole('textbox', { name: 'Enter your password' }).click();
            await this.page.getByRole('textbox', { name: 'Enter your password' }).fill('Externship22');
            await this.page.getByRole('button', { name: 'Sign In' }).click();
         });
       
         Given('the admin is on the home page', async function () {
         // user confirms they are on the admin dashboard
            await expect(this.page).toHaveURL('https://stage.tripleten.percruit.com/dashboard');

         });
      
         When('the admin initiates a logout', async function () {
         // the user begins to logout
            await this.page.locator('div').filter({ hasText: /^Cheyanne Martinez-Darbycheyannejaileen16\+admin@gmail\.com$/ }).nth(1).click();
            await this.page.getByRole('menuitem', { name: 'Sign Out' }).click();
         });
       
         Then('the admin should be signed out successfully', function () {
         // the user confirms log out was successful
         });
       
         Then('the login page should be displayed', async function () {
         // the user is on the login page and sees "Welcome to Percruit"
            await this.page.getByRole('heading', { name: 'Welcome to Percruit' }).click();
         });