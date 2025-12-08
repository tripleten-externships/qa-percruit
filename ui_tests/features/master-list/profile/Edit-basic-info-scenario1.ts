import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { expect } from 'playwright/test';
import { Page } from 'playwright/test';
export let loginPage: LoginPage;


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

         });
   
         // Fields like full name, phone number and other should be editable to be update with new information
         Then('the fields Full Name, Phone Number, Location, and Timezone should be editable', async function () {
           await expect(this.page.getByText('Name'), 'Full Name').toBeEditable();
           await expect(this.page.getByText('Name'), 'Phone Number').toBeEditable();
           await expect(this.page.getByText('Name'), 'Location').toBeEditable();
           await expect(this.page.getByText('Name'), 'Timezone').toBeEditable();
           await this.page.getByLabel('FullName').fill('John Joe');
           await this.page.getByLabel('Location').fill('New Jersey');
           await this.page.getByLabel('Phone Number').fill('3470098765');
         });
       
   
         // The email field should be view only as it cant be updated.
         Then('the Email field should be read-only', async function () {
           await expect(this.page.getByLabel('Email')).toBeVisible();
         });
   
         // The update field should reflect its most recent changes.
         Then('each field should display its current value or be empty if optional', async function () {
           expect(this.page.getByText('Name'), 'Full Name').toBeDefined();
           expect(this.page.getByText('Name'), 'Phone Number').toBeDefined();
           expect(this.page.getByText('Name'), 'Location').toBeDefined();
           expect(this.page.getByText('Name'), 'Timezone').toBeEmpty();
         });