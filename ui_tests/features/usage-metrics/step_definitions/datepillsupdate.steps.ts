// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

 
         When('the user is on Real Time Activity tab', async function () {
          await this.page.getByRole('tab', { name: 'Real-time Activity' }).click();
         }); 
       
         When('apply the {string} time filter', async function (string) {
           await this.page.getByRole('button', { name: string }).click();
         });
       
         Then('user should see the usage counts updated for {string}', async function (string) {
           await this.page.getByRole('heading', { name: 'Activity Timeline -' + string });
           console.log("Activity Timeline -", string);
         });