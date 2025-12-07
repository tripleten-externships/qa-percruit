// Import necessary functions from Cucumber
import { Given, Then, When, And } from '@cucumber/cucumber';

// Import Playwright classes and assertion library
import { Page } from 'playwright'

// Import Page Object Model for Profile Settings
import { ProfileSettingsPage } from '../../../pages/master-list/profile/profile-settings-page';
import { expect } from 'playwright/test';
import { CustomWorld } from '../../../src/config/world';



        Given('The profile tab is the default view with key sections', async function (this: CustomWorld) {  
           // Write code here that turns the phrase above into concrete actions
           await this.page.goto('https://stage.tripleten.percruit.com/profile'); 
         });

         Then('the Profile tab is active', async function (this: CustomWorld) {
           // Write code here that turns the phrase above into concrete actions
           return this.page.locator('<button class="MuiButtonBase-root MuiTab-root MuiTab-labelIcon MuiTab-textColorPrimary Mui-selected css-1j4ozr0" tabindex="0" type="button" role="tab" aria-selected="true"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiTab-iconWrapper MuiTab-icon css-q7mezt" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"></path></svg>Profile<span class="MuiTouchRipple-root css-4mb1j7"></span></button>').isVisible();
         });

         And('the tabs Professional, Social Links, Notifications, and Privacy & AI are available', async function (this: CustomWorld) {
           // Write code here that turns the phrase above into concrete actions
           await expect(this.page.locator('text=Professional')).toBeVisible()
           await expect(this.page.locator('text=Social Links')).toBeVisible()
           await expect(this.page.locator('text=Notifications')).toBeVisible()
           await expect(this.page.locator('text=Privacy & AI')).toBeVisible()
         });

         And('the sections Profile Photo, Basic Information, and About Me are visible', async function (this: CustomWorld) {
           // Write code here that turns the phrase above into concrete actions
           await expect(this.page.locator('text=Profile Photo')).toBeVisible()
           await expect(this.page.locator('text=Basic Information')).toBeVisible()
           await expect(this.page.locator('text=About Me')).toBeVisible()
         });
        

         Given('Profile photo area provides identity and guicdance', async function (this: CustomWorld) {
              // Write code here that turns the phrase above into concrete actions
                await this.page.goto('https://stage.tripleten.percruit.com/profile');
            });

         When('The Admin views the Profile photo section', async function (this: CustomWorld) { 
                // Write code here that turns the phrase above into concrete actions
                return this.page.locator('text=Profile Photo').isVisible();
            });
            
         Then('The admins display name and email are shown', async function (this: CustomWorld) {
                // Write code here that turns the phrase above into concrete actions    
                await expect(this.page.locator('text=Admin User')).toBeVisible()
                await expect(this.page.locator('text=admin@example.com')).toBeVisible()
            });

         And('guidance is displayed for uploading a professional headshot with a recommneded minimum size', async function (this: CustomWorld) {
                // Write code here that turns the phrase above into concrete actions
                await expect(this.page.locator('text=Upload a professional headshot that represents you well. Recommended: Sqaure image, at least 400x400 px')).toBeVisible()
            });  