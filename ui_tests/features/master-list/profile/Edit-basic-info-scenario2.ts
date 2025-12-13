import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { expect } from 'playwright/test';
import { ProfileSettingsPage } from '../../../src/pages/admin/ProfileSettingPage';
let loginPage: LoginPage;
let profilePage: ProfileSettingsPage;
 
 
 
 // User Signs in with the valid admin credentials
        Given('the Admin is on the Profile Settings page', async function () {
          loginPage = new LoginPage(this.page)
          LoginPage.loginAsAdmin() 
         await expect(this.page).toHaveURL('https://stage.tripleten.percruit.com/dashboard')
         });
       
  // User Navigate to the profile setting page after signing in.
         Given('the Admin is viewing the Basic Information section', async function () {
          await this.page.getByRole('heading', { name: 'Profile Settings' }).click();
           await this.page.getByRole('heading', { name: 'Basic Information' }).toBeVisible();
           profilePage = new ProfileSettingsPage(this.page);
         });
       
   
       // In the profile settings Full name and location tabs are update with valid  information.
         When('the Admin updates the Full Name and Location with valid information', async function () {
           await this.page.getByRole('textbox', { name: 'Full Name' }).click();
           await this.page.fill('[data-test="input-full-name"]', 'John Joe');
           await this.page.getByRole('textbox', { name: 'Location' }).click();
           await this.page.fill('[data-test="input-location"]', 'New Jersey');
         });
       
  
       // The update information entered in the previous tab should reflect its changes.
         Then('the changes should automatically save as the Admin types', async function () {
          expect(this.page.inputValue('[data-test="input-full-name"]')).toBe('John Joe');
          expect(this.page.inputValue('[data-test="input-location"]')).toBe('New Jersey');
          await profilePage.getFullName();
          await profilePage.getLocation();
         });
   
// The updates information should be saved immediately as it being entered.
         Then('the updated values should immediately appear in the Basic Information section', async function () {
          return await this.page.inputValue('[data-test="input-full-name"]'); 
          return await this.page.inputValue('[data-test="input-location"]');
          
         });
   
// The information should be consistent after a page refresh and change of tab.
         Then('the data should remain consistent after a page refresh', async function () {
           return await this.page.reload();
         });