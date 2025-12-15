// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { IndustryNewsPage2 } from '../../../src/pages/student/industryNewsPage2';

// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let industryNewsPage2: IndustryNewsPage2;

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async function () {
    loginPage = new LoginPage(this.page);
    industryNewsPage2 = new IndustryNewsPage2(this.page);
});

When('the user navigates to the Industry News webpage', async function () {
    await this.page.goto(env.getBaseUrl() + 'industry-news');
    await expect(this.page).toHaveURL(/industry-news/);
});

// Given('the user navigates to the Industry News webpage', async function () {
//     await this.page.goto(env.getBaseUrl() + 'industry-news');
//     await expect(this.page).toHaveURL(/industry-news/);
// });

Then('the Industry News webpage displays', async function () {
    await industryNewsPage2.verifyPage();
});

// When('the user selects 'preferences', async function () {
//     await industryNewsPage2.verifyPage();
// });

// When('the user selects a /keyword/ from the preferences dropdown', async function () {
//     await industryNewsPage2.verifyPage();
// });

// Then('the selected preferences keyword is displayed for each article', async function () {
//     await industryNewsPage2.verifyPage();
// });

// When('the user selects an article title', async function () {
//     await industryNewsPage2.verifyPage();
// });

// Then('the article opens in a new tab', async function () {
//     await industryNewsPage2.verifyPage();
// });

// When('the user selects teh comments button for an article', async function () {
//     await industryNewsPage2.verifyPage();
// });

// Then('the comments are displayed for that article', async function () {
//     await industryNewsPage2.verifyPage();
// });

// When('no preferences are applied', async function () {
//     await industryNewsPage2.verifyPage();
// });

// Then('all articles are displayed', async function () {
//     await industryNewsPage2.verifyPage();
// });

// When('the user applies a single field of interest preference', async function () {
//     await industryNewsPage2.verifyPage();
// });

// Then('only articles related to the field of interest are displayed', async function () {
//     await industryNewsPage2.verifyPage();
// });

// When('the user enters a keyword in the text box', async function () {
//     await industryNewsPage2.verifyPage();
// });

// Then('only articles containing that keyword are displayed', async function () {
//     await industryNewsPage2.verifyPage();
// });

// When('the user enters as non-matching keyword in the search box', async function () {
//     await industryNewsPage2.verifyPage();
// });

// Then('the user sees a "No articles found message"', async function () {
//     await industryNewsPage2.verifyPage();
// });
