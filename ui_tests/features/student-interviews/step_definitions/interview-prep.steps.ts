import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { InterviewPrepPage } from '../../../src/pages/student/InterviewPrepPage';

// Declare variables to hold brosewr, page, and page objects instances
let loginPage: LoginPage;
let interviewPrepPage: InterviewPrepPage;

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async function() {
    loginPage = new LoginPage(this.page);
    interviewPrepPage = new InterviewPrepPage(this.page);
});

When('the user navigates to the Interview prep page', async function() {
    await this.page.goto(`${env.getBaseUrl()}interview-prep`);
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL('/interview-prep/');
});

Then('the Interview Prep page displays', async function() {
    await this.page.waitForLoadState('networkidle');
    await interviewPrepPage.verifyPage();
});