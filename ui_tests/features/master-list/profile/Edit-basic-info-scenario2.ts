import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { expect } from 'playwright/test';
let loginPage: LoginPage;
 
 
 
 
        Given('the Admin is on the Profile Settings page', async function () {
          loginPage = new LoginPage(this.page)
          LoginPage.loginAsAdmin() 
         await expect(this.page).toHaveURL('https://stage.tripleten.percruit.com/profile')
         });
       
  
         Given('the Admin is viewing the Basic Information section', async function () {
           await this.page.goto('https://stage.tripleten.percruit.com/profile')
           await expect(this.page.getByText('Name'), 'Profile Setting').toBeVisible();
         });
       
   
       
         When('the Admin updates the Full Name and Location with valid information', async function () {
           
         });
       
  
       
         Then('the changes should automatically save as the Admin types', async function () {
          
         });
   
         Then('the updated values should immediately appear in the Basic Information section', async function () {
           
         });
   
         Then('the data should remain consistent after a page refresh', async function () {
           
         });