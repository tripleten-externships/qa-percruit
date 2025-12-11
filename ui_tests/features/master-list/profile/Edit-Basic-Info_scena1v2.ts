import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { ProfileSettingsPage } from '../../../src/pages/admin/ProfileSettingPage';




let loginPage: LoginPage;
export let profilePage: ProfileSettingsPage;




// Background step 1

When('the Admin is authenticated in the system', async function () {
loginPage = new LoginPage(this.page);
profilePage = new ProfileSettingsPage(this.page);
loginPage.gotoLoginPage();
await loginPage.loginAsAdmin();
await expect(this.page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();

});




// Background step 2

Given('the Admin is on the Profile Settings page', async function () {
await this.page.goto('https://stage.tripleten.percruit.com/profile');
await expect(this.page).toHaveURL(/profile/);

});


// Background step 3

Given('the Admin is viewing the Basic Information section', async function () {
await profilePage.openBasicInfoSection();
await expect(this.page.getByText('Basic Information')).toBeVisible();

});




// Scenario 1 — editable fields

//might have to update the locators run it first if it gives error copy the locators i sent you earlier

Then('the fields Full Name, Phone Number, Location, and Timezone should be editable', async function () {
expect(await profilePage.isFieldEditable('[data-test="full-name-input"]')).toBe(true);
expect(await profilePage.isFieldEditable('[data-test="phone-input"]')).toBe(true);
expect(await profilePage.isFieldEditable('[data-test="location-input"]')).toBe(true);
expect(await profilePage.isFieldEditable('[data-test="timezone-select"]')).toBe(true);

});




// Scenario 1 — email read-only

// might give you error here cuz i didnt find any locator for email field 

Then('the Email field should be read-only', async function () {

 expect(await profilePage.isEmailReadOnly()).toBe(true);

});




// Scenario 1 — current values displayed

Then('each field should display its current value or be empty if optional', async function () {

const fullName = await profilePage.getFullName();
const phone = await profilePage.getPhoneNumber();
const location = await profilePage.getLocation();
const timezone = await profilePage.getTimezone();
expect(fullName).not.toBeUndefined();
expect(phone).not.toBeUndefined();
expect(location).not.toBeUndefined();
expect(timezone).not.toBeUndefined();

});