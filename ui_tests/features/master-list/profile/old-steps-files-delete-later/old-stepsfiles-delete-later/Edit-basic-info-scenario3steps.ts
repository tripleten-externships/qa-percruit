import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../../../../src/pages/common/LoginPage';
import { expect } from 'playwright/test';
import { ProfileSettingsPage } from '../../../../../src/pages/admin/ProfileSettingPage';
let loginPage: LoginPage;
let profilePage: ProfileSettingsPage;

 // // User is login as Admin.
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
       
 
       
        Given('the Phone Number field already contains a valid value', async function () {
          await expect(this.page.getByText('Name'), 'Phone Number').toBeDefined();
          await expect(this.page.inputValue('[data-test="input-phone-number"]')).not.toBe('');
          
          
         });
       
  
        When('the Admin clears the Phone Number field in the Basic Information section', async function () {
          await this.page.getByRole('textbox', { name: 'Phone Number' }).click();
          await this.page.fill('[data-test="input-phone-number"]', '');
         
         });
    
       
        Then('the change should automatically save as the Admin types', async function () {
           await expect(this.page.getByText('Name'), 'Phone Number').toBeEmpty();
           await this.page.inputValue('[data-test="input-phone-number"]');
           expect(this.page.inputValue('[data-test="input-phone-number"]')).toBe('');
         });
       
 
         Then('no validation or error message should appear', async function () {
           await expect(this.page.getByText('Name'), 'Phone Number').not.toHaveAttribute('aria-invalid', 'true');});
       
  
        Then('the section should continue displaying valid data for all other fields', async function () {
          await expect(this.page.getByText('Name'), 'Full Name').toBeDefined();
          await expect(this.page.getByText('Name'), 'Phone Number').toBeDefined();
          await expect(this.page.getByText('Name'), 'Location').toBeDefined();
          await expect(this.page.getByText('Name'), 'Timezone').toBeEmpty();
         });
  
        Then('the cleared Phone Number field should remain empty after a page refresh', async function () {
            await this.page.reload();
            await expect(this.page.inputValue('[data-test="input-phone-number"]')).toBe('');  
            
         });