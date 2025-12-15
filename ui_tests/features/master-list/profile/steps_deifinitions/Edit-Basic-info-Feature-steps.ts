// Step definitions for login feature using Cucumber and Playwright
// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, And } from '@cucumber/cucumber';
// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';
// Import environment configuration and Page Object Models
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';
import { ProfileSettingsPage } from '../../../../src/pages/admin/ProfileSettingPage';
import { profile } from 'console';
// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let profilePage: ProfileSettingsPage;

const phoneNumber = '123-456-7890';

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async function() {
    loginPage = new LoginPage(this.page);
    await this.page.goto(env.getBaseUrl());
    await loginPage.loginAsUserType('Admin');
    this.profilePage = new ProfileSettingsPage(this.page);
});
         
// Background:
Given('the Admin is authenticated in the system', async function() {
    // Login as Admin
    loginPage = new LoginPage(this.page);
    profilePage = new ProfileSettingsPage(this.page);
    loginPage.gotoLoginPage();
  await loginPage.loginAsAdmin();
});

And('the Admin is on the Profile Settings page', async function() {
  // Navigate to Profile Settings page
  await loginPage.gotoProfileSettings();
});

And('the Admin is viewing the Basic Information section', async function() {
  // Veify Admin is in the Basic Information section
    await loginPage.openBasicInfoSection(); 

});

// Scenario1: Editable fields are visible and correctly labeled
Then('the fields Full Name, Phone Number, Location, and Timezone should be editable', async function() {
  // All fields should be editable
   
    await profilePage.getFullName();
    await profilePage.getPhoneNumber();
    await profilePage.getLocation();
    await profilePage.getTimezone();

});

And('the Email field should be read-only', async function() {
  // The Email field should be read only
  await profilePage.isEmailReadOnly();

});

And('each field should display its current value or be empty if optional', async function() {
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
    await loginPage.waitForAutoSave();
});

And('the updated values should immediately appear in the Basic Information section', async function() {
  // Updated values should appear immediately

    await expect(profilePage.getFullName()).toBe('John Joe');
    await expect(profilePage.getLocation()).toBe('Los Angeles, USA');

});

And('the data should remain consistent after a page refresh', async function() {
  // Data should remain after page refresh
    await page.reload();
    await loginPage.reload();
    await expect(profilePage.getFullName()).toBe('John Joe');
    await expect(profilePage.getLocation()).toBe('Los Angeles, USA');

});

// Scenario2: Admin clears a field and decides to leave it blank
Given('the Phone Number field already contains a valid value', async function() {
  // The Phone Number field has already a valid value
    await this.page.getPhoneNumber().toHaveValue(phoneNumber);

When('the Admin clears the Phone Number field in the Basic Information section', async function() {
  // Admin clears the phone number field
    await this.page.phoneNumber.fill('');
});

Then('the change should automatically save as the Admin types', async function() {
  // Fields updates as the admin types
    await this.page.waitForAutoSave();

});

And('no validation or error message should appear', async function() {
  // No error message should appear
    await profilePage.phoneNumberError();
});

And('the section should continue displaying valid data for all other fields', async function() {
  // All other fields should retain their values
    await profilePage.getFullName();
    await profilePage.getLocation();
    await profilePage.getTimezone();  

});

And('the cleared Phone Number field should remain empty after a page refresh', async function() {
  // The Phone Number should empty after a page refresh
    await page.reload();
    await loginPage.reload();
    await expect(profilePage.getPhoneNumber()).toBe('');    

});

// Scenario3: Admin navigates away after making changes
When('the Admin updates one or more editable fields', async function() {
  // Admin update the full name and location fields
    await profilePage.updateFullName('Jane Smith');
    await profilePage.updateLocation('Chicago, USA');
});

And('navigates to another settings tab', async function() {
  // Admin go to another tab in the profile setting and this case is the proffesional tab
    await profilePage.gotoProfessionalTab();

});

Then('the updated values should already be saved', async function() {
    // The updated values should be saved
    await expect(profilePage.getFullName()).toBe('Jane Smith');
    await expect(profilePage.getLocation()).toBe('Chicago, USA');
    await expect(profilePage.getPhoneNumber()).toBe('');
});

And('returning to the Basic Information section should display the latest data', async function() {
    // Admin return to the basic info tab and verify the data is updated
   await profilePage.gotoProfileSettings();
    await profilePage.getPhoneNumber();
    await profilePage.getLocation();
    await profilePage.getTimezone();
 
});
});