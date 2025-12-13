import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { expect } from 'playwright/test';
import { ProfileSettingsPage } from '../../../src/pages/admin/ProfileSettingPage';
let loginPage: LoginPage;
let profilePage: ProfileSettingsPage;

 
// User is login as Admin.
When(/the (.+) is authenticated in the system/, async function (userType) {
  loginPage = new LoginPage(this.page);
  profilePage = new ProfileSettingsPage(this.page);
  loginPage.gotoLoginPage();
  await loginPage.loginAsAdmin();
  await expect(this.page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
});

         Given('the Admin is on the Profile Settings page', async function () {
           await expect(this.page).toHaveURL('https://stage.tripleten.percruit.com/profile')
         });
       
  
         Given('the Admin is viewing the Basic Information section', async function () {
            await this.page.goto('https://stage.tripleten.percruit.com/profile')
            await expect(this.page.getByText('Name'), 'Profile Setting').toBeVisible();
         });
       
  
         When('the Admin updates one or more editable fields', async function () {
           await expect(this.page.getByText('Name'), 'Full Name').toBeEditable();
           await expect(this.page.getByText('Name'), 'Full name').toBeEditable();
           await expect(this.page.getByText('Name'), 'Phone Number').toBeEditable();
           await expect(this.page.getByText('Name'), 'Location').toBeEditable();
           await expect(this.page.getByText('Name'), 'Timezone').toBeEditable();
           await this.page.getByLabel('FullName').fill('John Joe');
           await this.page.getByLabel('Location').fill('New Jersey');
           await this.page.getByLabel('Phone Number').fill('3470098765');
         });
       
   // Navigate to another tab in the profile setting for ex, the proffesional tab
         When('navigates to another settings tab', async function () {
          await this.page.goto('https://stage.tripleten.percruit.com/profile?tab=professional')
          await expect(this.page.getByText('Name'), 'Professional').toBeVisible();
         });
       
   
       
         Then('the updated values should already be saved', async function () {
           expect(this.page.getByText('Name'), 'Full Name').toBeDefined();
           expect(this.page.getByText('Name'), 'Phone Number').toBeDefined();
           expect(this.page.getByText('Name'), 'Location').toBeDefined();
           expect(this.page.getByText('Name'), 'Timezone').toBeEmpty();
         });
   
       
        Then('returning to the Basic Information section should display the latest data', async function () {
           await this.page.goto('https://stage.tripleten.percruit.com/profile')
         });