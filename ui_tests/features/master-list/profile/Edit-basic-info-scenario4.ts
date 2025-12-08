import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { expect } from 'playwright/test';
let loginPage: LoginPage;

 
        Given('the Admin is on the Profile Settings page', async function () {
           await expect(this.page).toHaveURL('https://stage.tripleten.percruit.com/profile')
         });
       
  
         Given('the Admin is viewing the Basic Information section', async function () {
            await this.page.goto('https://stage.tripleten.percruit.com/profile')
            await expect(this.page.getByText('Name'), 'Profile Setting').toBeVisible();
         });
       
  
        When('the Admin updates one or more editable fields', async function () {
           await expect(this.page.getByText('Name'), 'Full Name').toBeEditable();
           await expect(this.page.getByText('Name'), 'Full name').
           await expect(this.page.getByText('Name'), 'Phone Number').toBeEditable();
           await expect(this.page.getByText('Name'), 'Location').toBeEditable();
           await expect(this.page.getByText('Name'), 'Timezone').toBeEditable();
         });
       
   
        When('navigates to another settings tab', async function () {
          
         });
       
   
       
        Then('the updated values should already be saved', async function () {
           
         });
   
       
        Then('returning to the Basic Information section should display the latest data', async function () {
           
         });