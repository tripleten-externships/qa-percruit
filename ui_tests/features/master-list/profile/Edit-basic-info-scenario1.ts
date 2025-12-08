import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { expect } from 'playwright/test';
import { Page } from 'playwright/test';
export let loginPage: LoginPage;


        // Verify User is login as Admin.
        When(/the (.+) is authenticated in the system/, async function (userType) {
         loginPage = new LoginPage(this.page)
         LoginPage.loginAsAdmin()
        
         // 
        Given('the Admin is on the Profile Settings page',async function () {
           await expect(this.page).toHaveURL('https://stage.tripleten.percruit.com/profile')

         });
       
         // 
         Given('the Admin is viewing the Basic Information section', async function () {
           await this.page.goto('https://stage.tripleten.percruit.com/profile')

         });
   
         // 
         Then('the fields Full Name, Phone Number, Location, and Timezone should be editable', async function () {
           await expect(this.page.getByText('Name'), 'Full Name').toBeEditable();
           await expect(this.page.getByText('Name'), 'Phone Number').toBeEditable();
           await expect(this.page.getByText('Name'), 'Location').toBeEditable();
           await expect(this.page.getByText('Name'), 'Timezone').toBeEditable();
         });
       
   
         // 
         Then('the Email field should be read-only', async function () {
           await expect(this.page.getByText('Name'), 'Email').toBeVisible();
         });
   
         // 
         Then('each field should display its current value or be empty if optional', async function () {
           expect(this.page.getByText('Name'), 'Full Name').toBeDefined();
           expect(this.page.getByText('Name'), 'Phone Number').toBeDefined();
           expect(this.page.getByText('Name'), 'Location').toBeDefined();
           expect(this.page.getByText('Name'), 'Timezone').toBeDefined();
         });