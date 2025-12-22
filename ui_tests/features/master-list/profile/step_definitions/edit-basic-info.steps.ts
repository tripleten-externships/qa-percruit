// Step definitions for login feature using Cucumber and Playwright
// Import Cucumber hooks and step definition decorators
import { Before, Given, Then, When } from '@cucumber/cucumber';
export const And: typeof When = When;
// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect,test } from '@playwright/test';
// Import environment configuration and Page Object Models
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';
import { ProfileSettingsPage } from '../../../../src/pages/admin/ProfileSettingPage';
import { profile } from 'console';
// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let profilePage: ProfileSettingsPage;

const phoneNumber = '123-456-7890';
const timezone = ' Eastern Time (US & Canada)';

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async function() {
      loginPage = new LoginPage(this.page);
      await this.page.goto(env.getBaseUrl());
      //await loginPage.loginAsUserType('Admin');
      this.profilePage = new ProfileSettingsPage(this.page);
});
         
// Background:
// Given('the Admin is authenticated in the system', async function() {
    // Login as Admin
      //loginPage = new LoginPage(this.page);
      //profilePage = new ProfileSettingsPage(this.page);

      //await loginPage.loginAsUserType('Admin');
// });

Given('the Admin is on the Profile Settings page', async function() {
      profilePage = new ProfileSettingsPage(this.page);
  // Navigate to Profile Settings page
      await profilePage.gotoProfileSettings();
});

Given('the Admin is viewing the Basic Information section', async function() {
  // Veify Admin is in the Basic Information section
      await profilePage.openBasicInfoSection();     
    
});

// Scenario1: Editable fields are visible and correctly labeled
Then('the fields Full Name, Phone Number, Location, and Timezone should be editable', async function() {
  // All fields should be editable
  
      await profilePage.PhonefieldEditable();
      await profilePage.FullnamefieldEditable();
      await profilePage.LocationfieldEditable();
      await profilePage.TimezonefieldEditable();  

});



Then('the Email field should be read-only', async function() {
  // The Email field should be read only

      await profilePage.isEmailReadOnly();

});

Then('each field should display its current value or be empty if optional', async function() {
  // All fields should display current value or be empty

      await profilePage.getFullName();
      await profilePage.getPhoneNumber();
      await profilePage.getLocation();
      await profilePage.getTimezone();

});

// Scenario: Admin updates profile details successfully
When('the Admin updates the Full Name and Location with valid information', async function() {
    // Admin update the full name and location fields

      await profilePage.updateFullName('John Joe');
      await profilePage.updateLocation('Los Angeles, USA');

});

Then('the changes should automatically save as the Admin types', async function() {
  // Fields updates as the admin types
      await expect(profilePage.getFullName()).toBe('John Joe');
      await expect(profilePage.getLocation()).toBe('Los Angeles, USA');
});

Then('the updated values should immediately appear in the Basic Information section', async function() {
  // Updated values should appear immediately

      await expect(profilePage.getFullName()).toBe('John Joe');
      await expect(profilePage.getLocation()).toBe('Los Angeles, USA');

});

Then('the data should remain consistent after a page refresh', async function() {
  // Data should remain after page refresh
      await profilePage.refresh();
      await expect(profilePage.getFullName()).toBe('John Joe');
      await expect(profilePage.getLocation()).toBe('Los Angeles, USA');

});

// Scenario2: Admin clears a field and decides to leave it blank
Given('the Phone Number field already contains a valid value', async function() {
  // The Phone Number field has already a valid value
      await this.page.phoneNumber().toHaveValue('123-456-7890');

When('the Admin clears the Phone Number field in the Basic Information section', async function() {
  // Admin clears the phone number field
      await this.page.phoneNumber().fill('');
});

Then('the change should automatically save as the Admin types', async function() {
  // Fields updates as the admin types
      await this.page.waitForAutoSave();

});

Then('no validation or error message should appear', async function() {
  // No error message should appear

      await profilePage.errormessages();
});


Then('the section should continue displaying valid data for all other fields', async () => {
  // All other fields should retain their values
      await expect((profilePage.getFullName())).toBe('John Joe');
      await expect((profilePage.getLocation())).toBe('Los Angeles, USA');
      await expect(this.page.timezone()).toHaveValue(' Eastern Time (US & Canada)');

});

Then('the cleared Phone Number field should remain empty after a page refresh', async () => {
  // The Phone Number should empty after a page refresh
   
      await profilePage.refresh();  
      await expect(this.page.phoneNumber()).toHaveValue('');

});

// Scenario3: Admin navigates away after making changes
When('the Admin updates one or more editable fields', async function() {
  // Admin update the full name and location fields

      await profilePage.updateFullName('Jane Smith');
      await profilePage.updateLocation('Chicago, USA');
});

When('navigates to another settings tab', async function() {
  // Admin go to another tab in the profile setting and this case is the proffesional tab
      await profilePage.gotoProfessionalTab();

});

Then('the updated values should already be saved', async function() {
    // The updated values should be saved
      await profilePage.gotoProfileSettings();
      await expect(profilePage.getFullName()).toBe('Jane Smith');
      await expect(profilePage.getLocation()).toBe('Chicago, USA');
      await expect(this.page.phoneNumber()).toHaveValue('');
    
});

Then('returning to the Basic Information section should display the latest data', async () => {
    // Admin return to the basic info tab and verify the data is updated
      await profilePage.gotoProfileSettings();
      await profilePage.openBasicInfoSection();
      await expect(profilePage.getFullName()).toBe('Jane Smith');
      await expect(profilePage.getLocation()).toBe('Chicago, USA');
      await expect(this.page.phoneNumber()).toHaveValue('');
      await expect(this.page.timezone()).toHaveValue(' Eastern Time (US & Canada)');
   });
});
