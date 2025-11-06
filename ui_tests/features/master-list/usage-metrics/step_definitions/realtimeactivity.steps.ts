// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';
import { StudentDashboardPage } from '../../../../src/pages/student/StudentDashboardPage';
 
        Given('the user is on Admin Dashboard page', async function () {
           // Write code here that turns the phrase above into concrete actions
           await this.page.getByRole('button',{name:'Usage Metrics'}).click;
           await expect(this.page.getByRole('heading',{name:'Admin Usage Metrics'})).toBeVisible();
         });
       

         When('the user click on the Usage Metrics tab', async function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
       

         When('apply the {string} time filter', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
       
       
         Then('user should see the usage counts updated for {string}', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });