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
         await expect(this.page).toHaveURL('https://stage.tripleten.percruit.com/profile')
         });
       
  // User Navigate to the profile setting page after signing in.
         Given('the Admin is viewing the Basic Information section', async function () {
          await this.page.goto('https://stage.tripleten.percruit.com/profile')
          await expect(this.page.getByText('Profile Settings')).toBeVisible();
          profilePage = new ProfileSettingsPage(this.page); 
          
          
          
          // await this.page.goto('https://stage.tripleten.percruit.com/profile')
          // await expect(this.page.getByText('Name'), 'Profile Setting').toBeVisible();
         });
       
   
       // In the profile settings Full name and location tabs are update with valid  information.
         When('the Admin updates the Full Name and Location with valid information', async function () {
           await this.page.getByLabel('FullName').fill('John Joe');
           await this.page.getByLabel('Location').fill('New Jersey');
         });
       
  
       // The update information entered in the previous tab should reflect its changes.
         Then('the changes should automatically save as the Admin types', async function () {
          
            expect(this.page.getByText('Name'), 'Full Name').toBeDefined();
            expect(this.page.getByText('Name'), 'Location').toBeDefined();
            await expect(this.page.getByLabel('Full Name')).toContainText(['John Joe']);
            await expect(this.page.getByLabel('Location')).toContainText(['New Jersey']);
         });
   
// The updates information should be saved immediately as it being entered.
         Then('the updated values should immediately appear in the Basic Information section', async function () {
          await expect(this.page.getByText('John Joe')).toBeVisible();
          await expect(this.page.getByText('New Jersey')).toBeVisible();
         });
   
// The information should be consistent after a page refresh and change of tab.
         Then('the data should remain consistent after a page refresh', async function () {
           
         });