// Import necessary functions from Cucumber
import { Given, Then, When } from '@cucumber/cucumber';
export const And: typeof When = When;

import { expect } from '@playwright/test';
import { CustomWorld } from '../../../../src/config/world';

import { Page } from '@playwright/test';
import { BasePage } from '../../../../src/pages/common/BasePage';
import { ProfilePage } from '../../../../src/pages/profile/ProfilePage';

let profilePage: ProfilePage;

Before(async function() {
  profilePage = new ProfilePage(this.page);
  
});

function getProfilePage(this: CustomWorld) {
    if (!this.pages || !this.pages.profile) {
        throw new Error('ProfilePage not initialized on world.pages.profile');
    }
    return this.pages.profile;
}



//Scenario: Profile tab is default view with key sections
Then('the Profile tab is active', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    const active = await profile.isProfileTabActive();
    await expect(active).toBeTruthy();
});

And('the tabs Professional, Social Links, Notifications, and Privacy & AI are available', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    await profilePage.isProfessionalTabVisible();
    await expect(profile.page.getByText('Social Links', { exact: true })).toBeVisible();
});

And('the sections Profile Photo, Basic Information and About Me are visible', async function (this: CustomWorld, s1: string, s2: string, s3: string) {
    const profile = getProfilePage.call(this);
    await expect(profile.page.getByText(s1, { exact: true })).toBeVisible();
    await expect(profile.page.getByText(s2, { exact: true })).toBeVisible();
    await expect(profile.page.getByText(s3, { exact: true })).toBeVisible();
});

//Scenario: Profile photo area provides identity and guidance
When('The Admin views the Profile photo section', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    const visible = await profile.isProfilePhotoVisible();
    expect(visible).toBeTruthy();
});

Then('The admins display name and email are shown', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    await expect(profile.page.getByText('Admin User', { exact: true })).toBeVisible();
    await expect(profile.page.getByText('admin@percruit.com', { exact: true })).toBeVisible();
});

And('guidance is displayed for uploading a professional headshot with a recommneded minimum size', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    await expect(profile.page.getByText('Upload a professional headshot that represents you well. Recommended: Sqaure image, at least 400x400 px', { exact: true })).toBeVisible();
});

//Scenario: Basic Information shows required and optional fields
When('The Admin views the Basic Information section', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    const visible = await profile.areSectionsVisible(['Basic Information']);
    expect(visible).toBeTruthy();
});

Then('The fields Full Name, Email, Phone Number, Location, and Timezone are visible', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    await expect(profile.page.getByLabel('Full Name', { exact: true })).toBeVisible();
    await expect(profile.page.getByLabel('Email', { exact: true })).toBeVisible();
    await expect(profile.page.getByLabel('Phone Number', { exact: true })).toBeVisible();
    await expect(profile.page.getByLabel('Location', { exact: true })).toBeVisible();
    await expect(profile.page.getByLabel('Timezone', { exact: true })).toBeVisible();
});

And('Email is read-only with helper text that it cannot be changed', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    await expect(profile.page.getByText('Email cannot be changed', { exact: true })).toBeVisible();
});

And('Phone Number is marked optional', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    await expect(profile.page.getByText('Optional', { exact: true })).toBeVisible();
});

And('Timezone is seleectable from a list', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    await profile.page.click('select[aria-label="Timezone"]');
    await expect(profile.page.getByText('(UTC-08:00) Pacific Time (US & Canada)')).toBeVisible();
});

And('Helper text indicates the browser-detected timezone', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    await expect(profile.page.getByText('Your detected timezone is (UTC-07:00) Mountain Time (US & Canada)', { exact: false })).toBeVisible();
});

//Scenario: Optional fields can be left blank without error
Given('The Admin is viewing the Basic Information section', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    await profile.gotoProfile();
});

Then('The Phone Number field may be empty', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    const empty = await profile.isPhoneNumberEmpty();
    expect(empty).toBeTruthy();
});

And('No validation error is displayed for leaving optionnal fields blank', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    const err = await profile.page.getByText('Phone Number is required', { exact: true }).isVisible();
    expect(err).toBeFalsy();
});

//Data on screen reflects the stored account values
When('The Admin views the profile', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    await profile.gotoProfile();
});

Then('The displayed name, email, and timezone match the accounts stored values', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    const name = await profile.getDisplayedName();
    const email = await profile.getEmailValue();
    const tz = await this.page.locator('select[aria-label="Timezone"]').evaluate((el: HTMLSelectElement) => el.value);

    expect(name).toBe('Admin User');
    expect(email).toBe('admin@percruit.com');
    expect(tz).toBe('America/Denver');
});

function Before(arg0: () => Promise<void>) {
    throw new Error('Function not implemented.');
}
    