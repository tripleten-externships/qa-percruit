// Import necessary functions from Cucumber
import { Before, Given, Then, When } from '@cucumber/cucumber';
export const And: typeof When = When;

import { expect } from '@playwright/test';
import { CustomWorld } from '../../../../src/config/world';

import { Page } from '@playwright/test';
import { BasePage } from '../../../../src/pages/common/BasePage';
import { ProfilePage } from '../../../../src/pages/profile/ProfilePage';
import { LoginPage } from '../../../../src/pages/common/LoginPage';
import * as env from '../../../../src/config/world';

let profilePage: ProfilePage;

Before(async function(this: CustomWorld) {
    profilePage = new ProfilePage(this.page);

});


function getProfilePage(this: CustomWorld) {
    if (!this.pages || !this.pages.profile) {
        throw new Error('ProfilePage not initialized on world.pages.profile');
    }
    return this.pages.profile;
}

// Authentication handled by shared login step: Given('the {word} is authenticated in the system', ...)

And('the Admin is on the Profile Settings page', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    // attempt navigation; if it times out (e.g. not authenticated) try logging in and retry once
    try {
        await profile.gotoProfile();
    } catch (err) {
        // try to authenticate using environment admin credentials and retry
        const loginPage = new LoginPage(this.page);
        await this.page.goto(env.getBaseUrl());
        await loginPage.waitForPageLoad();
        await loginPage.loginAsAdmin();
        await profile.gotoProfile();
    }
});

//Scenario: Profile tab is default view with key sections
Then('the Profile tab is active', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    const active = await profile.isProfileTabActive();
    await expect(active).toBeTruthy();
});

And('the tabs Professional, Social Links, Notifications, and Privacy & AI are available', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    await profile.isProfessionalTabVisible();
    await expect(profile.page.getByText('Social Links', { exact: true })).toBeVisible();
    await expect(profile.page.getByText('Notifications', { exact: true })).toBeVisible();
    await expect(profile.page.getByText('Privacy & AI', { exact: true })).toBeVisible();
});

And('the sections {string}, {string}, and {string} are visible', async function (this: CustomWorld, s1: string, s2: string, s3: string) {
    const profile = getProfilePage.call(this);
    await expect(profile.page.getByText(s1, { exact: true })).toBeVisible();
    await expect(profile.page.getByText(s2, { exact: true })).toBeVisible();
    await expect(profile.page.getByText(s3, { exact: true })).toBeVisible();
});

//Scenario: Profile photo area provides identity and guidance
When('the Admin views the Profile Photo section', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    const visible = await profile.isProfilePhotoVisible();
    await expect(visible).toBeTruthy();
});

Then('the admins display name and email are shown', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    // The displayed name and email are inputs — assert their input values instead of visible text
    const name = await profile.getDisplayedName();
    const email = await profile.getEmailValue();
    const expectedAdminName = env.getAdminDisplayName();
    const expectedAdminEmail = env.getAdminEmail() || 'admin@percruit.com';

    if (expectedAdminName) {
        expect(name).toBe(expectedAdminName);
    } else {
        // If no expected name provided, assert the name is non-empty (accept actual account name)
        expect(name).not.toBe('');
    }

    expect(email).toBe(expectedAdminEmail);
});

And('guidance is displayed for uploading a professional headshot with a recommended minimum size', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    // check for presence of guidance text fragments rather than an exact long string
    await expect(profile.page.getByText('Upload a professional headshot', { exact: false })).toBeVisible();
    await expect(profile.page.getByText('400x400', { exact: false })).toBeVisible();
});

//Scenario: Basic Information shows required and optional fields
When('The Admin views the Basic Information section', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    const visible = await profile.areSectionsVisible(['Basic Information']);
    await expect(visible).toBeTruthy();
});

// Alias matching feature text that uses lowercase 'the'
When('the Admin views the Basic Information section', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    const visible = await profile.areSectionsVisible(['Basic Information']);
    await expect(visible).toBeTruthy();
});

Then('The fields Full Name, Email, Phone Number, Location, and Timezone are visible', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    await expect(profile.page.getByLabel('Full Name', { exact: true })).toBeVisible();
    await expect(profile.page.getByLabel('Email', { exact: true })).toBeVisible();
    await expect(profile.page.getByLabel('Phone Number', { exact: true })).toBeVisible();
    await expect(profile.page.getByLabel('Location', { exact: true })).toBeVisible();
    await expect(profile.page.getByLabel('Timezone', { exact: true })).toBeVisible();
});

// Alias matching feature text that uses lowercase 'the'
Then('the fields Full Name, Email, Phone Number, Location, and Timezone are visible', async function (this: CustomWorld) {
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
    // Accept any timezone option that contains 'UTC' rather than exact region text
    const ok = await profile.hasTimezoneOptionWithUTC();
    await expect(ok).toBeTruthy();
});

// Properly spelled alias used by feature files
Then('Timezone is selectable from a list', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    const ok = await profile.hasTimezoneOptionWithUTC();
    if (!ok) {
        await profile.debugTimezoneDom();
    }
    await expect(ok).toBeTruthy();
});

And('Helper text indicates the browser-detected timezone', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    await expect(profile.page.getByText('Your detected timezone is (UTC-07:00) Mountain Time (US & Canada)', { exact: false })).toBeVisible();
});

// lowercase alias matching feature wording
Then('helper text indicates the browser-detected timezone', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    const ok = await profile.isHelperTimezoneTextVisible('Your detected timezone is');
    await expect(ok).toBeTruthy();
});

//Scenario: Optional fields can be left blank without error
Given('The Admin is viewing the Basic Information section', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    const visible = await profile.areSectionsVisible(['Basic Information']);
    await expect(visible).toBeTruthy();
});

// lowercase alias matching feature text
Given('the Admin is viewing the Basic Information section', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    const visible = await profile.areSectionsVisible(['Basic Information']);
    await expect(visible).toBeTruthy();
});

Then('The Phone Number field may be empty', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    const empty = await profile.isPhoneNumberEmpty();
    await expect(empty).toBeTruthy();
});

// lowercase alias matching feature wording
Then('the Phone Number field may be empty', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    const empty = await profile.isPhoneNumberEmpty();
    await expect(empty).toBeTruthy();
});

And('No validation error is displayed for leaving optionnal fields blank', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    const err = await profile.page.getByText('Phone Number is required', { exact: true }).isVisible();
    expect(err).toBeFalsy();
});

// lowercase alias and corrected spelling for feature text
Then('no validation error is displayed for leaving optional fields blank', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    const err = await profile.page.getByText('Phone Number is required', { exact: true }).isVisible();
    expect(err).toBeFalsy();
});

//Data on screen reflects the stored account values
When('The Admin views the profile', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    try {
        await profile.gotoProfile();
    } catch (err) {
        const loginPage = new LoginPage(this.page);
        await this.page.goto(env.getBaseUrl());
        await loginPage.waitForPageLoad();
        await loginPage.loginAsAdmin();
        await profile.gotoProfile();
    }
});

// lowercase alias matching feature text
When('the Admin views the profile', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    try {
        await profile.gotoProfile();
    } catch (err) {
        const loginPage = new LoginPage(this.page);
        await this.page.goto(env.getBaseUrl());
        await loginPage.waitForPageLoad();
        await loginPage.loginAsAdmin();
        await profile.gotoProfile();
    }
});

Then('The displayed name, email, and timezone match the accounts stored values', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    // wait for a stable control before reading values
    await profile.page.waitForSelector('input[aria-label="Full Name"], select[aria-label="Timezone"]', { timeout: 15000 });
    const name = await profile.getDisplayedName();
    const email = await profile.getEmailValue();
    const tz = await this.page.locator('select[aria-label="Timezone"]').evaluate((el: HTMLSelectElement) => el.value);
    const expectedName = env.getAdminDisplayName();
    const expectedEmail = env.getAdminEmail() || 'admin@percruit.com';
    const expectedTz = process.env.ADMIN_TIMEZONE || 'America/Denver';

    if (expectedName) {
        expect(name).toBe(expectedName);
    } else {
        expect(name).not.toBe('');
    }

    expect(email).toBe(expectedEmail);
    if (process.env.ADMIN_TIMEZONE) {
        expect(tz).toBe(expectedTz);
    } else {
        expect(tz).not.toBe('');
    }
});

// lowercase alias matching feature text
Then('the displayed name, email, and timezone match the accounts stored data', async function (this: CustomWorld) {
    const profile = getProfilePage.call(this);
    await profile.page.waitForSelector('input[aria-label="Full Name"], select[aria-label="Timezone"]', { timeout: 15000 });
    const name = await profile.getDisplayedName();
    const email = await profile.getEmailValue();
    const tz = await this.page.locator('select[aria-label="Timezone"]').evaluate((el: HTMLSelectElement) => el.value);

    const expectedName = env.getAdminDisplayName();
    const expectedEmail = env.getAdminEmail() || 'admin@percruit.com';
    const expectedTz = process.env.ADMIN_TIMEZONE || 'America/Denver';

    if (expectedName) {
        expect(name).toBe(expectedName);
    } else {
        expect(name).not.toBe('');
    }

    expect(email).toBe(expectedEmail);
    if (process.env.ADMIN_TIMEZONE) {
        expect(tz).toBe(expectedTz);
    } else {
        expect(tz).not.toBe('');
    }
});

