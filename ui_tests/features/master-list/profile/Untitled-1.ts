// Import necessary functions from Cucumber
import { Given, Then, And } from '@cucumber/cucumber';

// Import Playwright classes and assertion library
import { Page } from 'playwright'

// Import Page Object Model for Profile Settings
import { ProfileSettingsPage } from '../../../pages/master-list/profile/profile-settings-page';



 Given('the Admin is on the Profile Settings page', function () {  
           // Write code here that turns the phrase above into concrete actions
           await this.page.goto('https://stage.tripleten.percruit.com/profile'); 
         });

    Then the Profile tab is active
       Undefined. Implement with the following snippet:

         Then('the Profile tab is active', function () {
           // Write code here that turns the phrase above into concrete actions
           return this.page.locator('<button class="MuiButtonBase-root MuiTab-root MuiTab-labelIcon MuiTab-textColorPrimary Mui-selected css-1j4ozr0" tabindex="0" type="button" role="tab" aria-selected="true"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiTab-iconWrapper MuiTab-icon css-q7mezt" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"></path></svg>Profile<span class="MuiTouchRipple-root css-4mb1j7"></span></button>').isVisible();
         });

   ? And the tabs Professional, Social Links, Notifications, and Privacy & 
AI are available
       Undefined. Implement with the following snippet:

         Then('the tabs Professional, Social Links, Notifications, and Privacy & AI are available', function () {
           // Write code here that turns the phrase above into concrete actions
           return this;
         });

   ? And the sections "Profile Photo", "Basic Information", and "About Me" 
are visible
       Undefined. Implement with the following snippet:

         Then('the sections {string}, {string}, and {string} are visible', 
function (string, string2, string3) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

         