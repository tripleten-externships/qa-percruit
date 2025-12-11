import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Page } from 'playwright/test';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { ProfileSettingsPage } from '../../../src/pages/admin/ProfileSettingPage';
let loginPage: LoginPage;
let profilePage: ProfileSettingsPage;

        // User is login as Admin.
        When(/the (.+) is authenticated in the system/, async function (userType) {
         loginPage = new LoginPage(this.page)
         LoginPage.loginAsAdmin()
         await expect(this.page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
        });

         // Verify that user in the right tab/ profile setting
        Given('the Admin is on the Profile Settings page',async function () {
           await expect(this.page).toHaveURL('https://stage.tripleten.percruit.com/profile')

         });
       
         // The user is in the Basic Information tab and have access to view its information.
         Given('the Admin is viewing the Basic Information section', async function () {
           await this.page.goto('https://stage.tripleten.percruit.com/profile')
           await expect(this.page.getByText('Profile Settings')).toBeVisible();
           profilePage = new ProfileSettingsPage(this.page);

         });
   
         // Fields like full name, phone number and other should be editable to be update with new information
         Then('the fields Full Name, Phone Number, Location, and Timezone should be editable', async function () {
          expect(await profilePage.isFieldEditable('[data-test="full-name-input"]')).toBe(true);
          expect(await profilePage.isFieldEditable('[data-test="phone-input"]')).toBe(true);
          expect(await profilePage.isFieldEditable('[data-test="location-input"]')).toBe(true);
          expect(await profilePage.isFieldEditable('[data-test="timezone-select"]')).toBe(true); 
        
          //await expect(this.page.getByText('Name'), 'Full Name').toBeEditable();
           //await expect(this.page.getByText('Name'), 'Phone Number').toBeEditable();
          // await expect(this.page.getByText('Name'), 'Location').toBeEditable();
           ///await expect(this.page.getByText('Name'), 'Timezone').toBeEditable();
          // await this.page.getByLabel('FullName').fill('John Joe');
           //await this.page.getByLabel('Location').fill('New Jersey');
           //await this.page.getByLabel('Phone Number').fill('3470098765');
         });
       
   
         // The email field should be view only as it cant be updated.
         Then('the Email field should be read-only', async function () {
           await expect(this.page.getByLabel('Email')).toBeVisible();
         });
   
         // The update field should reflect its most recent changes.
         Then('each field should display its current value or be empty if optional', async function () {
           const fullName = await profilePage.getFullName();
           const phone = await profilePage.getPhoneNumber();
           const location = await profilePage.getLocation();
           const timezone = await profilePage.getTimezone();
           expect(fullName).not.toBeUndefined();
           expect(phone).not.toBeUndefined();
           expect(location).not.toBeUndefined();
           expect(timezone).not.toBeUndefined();
          
          
          
          //expect(this.page.getByText('Name'), 'Full Name').toBeDefined();
           //expect(this.page.getByText('Name'), 'Phone Number').toBeDefined();
           //expect(this.page.getByText('Name'), 'Location').toBeDefined();
           //expect(this.page.getByText('Name'), 'Timezone').toBeEmpty();
         });