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
    await this.page.waitForLoadState('networkidle');
    await this.page.goto(env.getBaseUrl() + 'interview-prep');
    await expect(this.page).toHaveURL(/interview-prep/);
});

Then('the Interview Prep page displays', async function() {
    await interviewPrepPage.verifyPage();
});

Given('the student is on the Interview Prep page', async function () {
    await this.page.goto(`${env.getBaseUrl()}interview-prep`);
    await expect(this.page).toHaveURL(/interview-prep/);
    await interviewPrepPage.verifyPage();
});

When('the student clicks on the "Schedule Your First Interview" button', async function() {
    await interviewPrepPage.clickScheduleFirstInterview();
});

When('the student selects "Peer Interviews"', async function() {
    await interviewPrepPage.selectPeerInterviews();
    console.log(await this.page.content());
});

Then('the student should see an option to join or schedule a peer interview session', async function() {
    await interviewPrepPage.verifyPeerInterviewsPage();
});

