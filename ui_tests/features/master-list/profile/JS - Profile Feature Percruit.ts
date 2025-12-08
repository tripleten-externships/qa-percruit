// Import necessary functions from Cucumber
import { Given, Then, When } from '@cucumber/cucumber';
export const And: typeof When = When;

// Import Playwright classes and assertion library

// Import Page Object Model for Profile Settings
import { expect } from 'playwright/test';
import { CustomWorld } from '../../../src/config/world';



        Given('The profile tab is the default view with key sections', async function (this: CustomWorld) {  
           await this.page.goto('https://stage.tripleten.percruit.com/profile'); 
         });

         Then('the Profile tab is active', async function (this: CustomWorld) {
           return this.page.locator('<button class="MuiButtonBase-root MuiTab-root MuiTab-labelIcon MuiTab-textColorPrimary Mui-selected css-1j4ozr0" tabindex="0" type="button" role="tab" aria-selected="true"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiTab-iconWrapper MuiTab-icon css-q7mezt" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"></path></svg>Profile<span class="MuiTouchRipple-root css-4mb1j7"></span></button>').isVisible();
         });

         And('the tabs Professional, Social Links, Notifications, and Privacy & AI are available', async function (this: CustomWorld) {
           await expect(this.page.locator('text=Professional')).toBeVisible()
           await expect(this.page.locator('text=Social Links')).toBeVisible()
           await expect(this.page.locator('text=Notifications')).toBeVisible()
           await expect(this.page.locator('text=Privacy & AI')).toBeVisible()
         });

         And('the sections Profile Photo, Basic Information, and About Me are visible', async function (this: CustomWorld) {
           await expect(this.page.locator('text=Profile Photo')).toBeVisible()
           await expect(this.page.locator('text=Basic Information')).toBeVisible()
           await expect(this.page.locator('text=About Me')).toBeVisible()
         });
        

         Given('Profile photo area provides identity and guicdance', async function (this: CustomWorld) {
                await this.page.goto('https://stage.tripleten.percruit.com/profile');
            });

         When('The Admin views the Profile photo section', async function (this: CustomWorld) {
                return this.page.locator('text=Profile Photo').isVisible();
            });
            
         Then('The admins display name and email are shown', async function (this: CustomWorld) {   
                await expect(this.page.locator('text=Admin User')).toBeVisible()
                await expect(this.page.locator('text=admin@example.com')).toBeVisible()
            });

         And('guidance is displayed for uploading a professional headshot with a recommneded minimum size', async function (this: CustomWorld) {
                await expect(this.page.locator('text=Upload a professional headshot that represents you well. Recommended: Sqaure image, at least 400x400 px')).toBeVisible()
            });
            
            
        Given('Basic Information shows required and optional fields', async function (this: CustomWorld) {
                await this.page.goto('https://stage.tripleten.percruit.com/profile');
            });
        
        When('The Admin views the Basic Information section', async function (this: CustomWorld) {
                return this.page.locator('text=Basic Information').isVisible();
            });
            
        Then('The fields Full Name, Email, Phone Number, Location, and Timezone are visible', async function (this: CustomWorld) {
                await expect(this.page.locator('text=Full Name')).toBeVisible()
                await expect(this.page.locator('text=Email')).toBeVisible()
                await expect(this.page.locator('text=Phone Number')).toBeVisible()
                await expect(this.page.locator('text=Location')).toBeVisible()
                await expect(this.page.locator('text=Timezone')).toBeVisible()
            });
            
        And('Email is read-only with helper text that it cannot be changed', async function (this: CustomWorld) {
                await expect(this.page.locator('text=Email cannot be changed')).toBeVisible()
            });
            
        And('Phone Number is marked optional', async function (this: CustomWorld) {
                await expect(this.page.locator('text=Optional')).toBeVisible()
            });
            
        And('Timezone is seleectable from a list', async function (this: CustomWorld) {
                await this.page.click('select[aria-label="Timezone"]');
                await expect(this.page.locator('text=(UTC-08:00) Pacific Time (US & Canada)')).toBeVisible()
            });
            
        And('Helper text indicates the browser-detected timezone', async function (this: CustomWorld) {
                await expect(this.page.locator('text=Your detected timezone is (UTC-07:00) Mountain Time (US & Canada)')).toBeVisible()
            });


        Given('The Admin is viewing the Basic Information section', async function (this: CustomWorld) {
                // Write code here that turns the phrase above into concrete actions
                await this.page.goto('https://stage.tripleten.percruit.com/profile');
            });
            
        Then('The Phone Number field may be empty', async function (this: CustomWorld) {
                const phoneNumberValue = await this.page.inputValue('input[aria-label="Phone Number"]');
                expect(phoneNumberValue).toBe('');
            });
            
        And('No validation error is displayed for leaving optionnal fields blank', async function (this: CustomWorld) {
                const phoneNumberError = await this.page.locator('text=Phone Number is required').isVisible();
                expect(phoneNumberError).toBeFalsy();
            });
            
        Given('Data on screen reflects the stored account values', async function (this: CustomWorld) {
                await this.page.goto('https://stage.tripleten.percruit.com/profile');
                 });
            
        When('The Admin views the profile', async function (this: CustomWorld) {

                return this.page.goto('https://stage.tripleten.percruit.com/profile');
            });

        Then('The displayed name, email, and timezone match the accounts stored values', async function (this: CustomWorld) {
                // Write code here that turns the phrase above into concrete actions
                await expect(this.page.locator('input[aria-label="Full Name"]')).toHaveValue('Admin User')
                await expect(this.page.locator('input[aria-label="Email"]')).toHaveValue('admin@percruit.com')
                await expect(this.page.locator('select[aria-label="Timezone"]')).toHaveValue('America/Denver')
            });
            
