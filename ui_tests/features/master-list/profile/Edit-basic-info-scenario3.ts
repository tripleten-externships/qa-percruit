import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { expect } from 'playwright/test';
let loginPage: LoginPage;

 // 
        Given('the Admin is on the Profile Settings page', async function () {
           await expect(this.page).toHaveURL('https://stage.tripleten.percruit.com/profile')
         });
       
   
         Given('the Admin is viewing the Basic Information section', async function () {
           await this.page.goto('https://stage.tripleten.percruit.com/profile')
            await expect(this.page.getByText('Name'), 'Profile Setting').toBeVisible();
         });
       
 
       
         Given('the Phone Number field already contains a valid value', async function () {
            expect(this.page.getByText('Name'), 'Phone Number').toBeDefined();
         });
       
  
         When('the Admin clears the Phone Number field in the Basic Information section', async function () {
          await this.page.getByLabel('Phone Number').clears();
         });
    
       
         Then('the change should automatically save as the Admin types', async function () {
           await expect(this.page.getByText('Name'), 'Phone Number').toBeEmpty();
         });
       
 
         Then('no validation or error message should appear', async function () {
           
         });
       
  
       
         Then('the section should continue displaying valid data for all other fields', async function () {
           expect(this.page.getByText('Name'), 'Full Name').toBeDefined();
           expect(this.page.getByText('Name'), 'Phone Number').toBeDefined();
           expect(this.page.getByText('Name'), 'Location').toBeDefined();
           expect(this.page.getByText('Name'), 'Timezone').toBeEmpty();
         });
  
         Then('the cleared Phone Number field should remain empty after a page refresh', async function () {
            await this.page.goto('https://stage.tripleten.percruit.com/profile')
            await expect(this.page.getByText('Name'), 'Phone Number').toBeEmpty();
         });