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

// This for the 1st Scenario
When('the user navigates to the Interview prep page', async function() {
    await this.page.waitForLoadState('networkidle');
    await this.page.goto(env.getBaseUrl() + 'interview-prep');
    await expect(this.page).toHaveURL(/interview-prep/);
});

Then('the Interview Prep page displays', async function() {
    await interviewPrepPage.verifyPage();
});

// This is for the 2nd Scenario

Given('the student is on the Interview Prep page', async function () {
    await this.page.goto(`${env.getBaseUrl()}interview-prep`);
    await expect(this.page).toHaveURL(/interview-prep/);
    await interviewPrepPage.verifyPage();
});

When('the student clicks on the Schedule Interview button', async function() {
    await interviewPrepPage.clickScheduleInterview();
});

When('the student selects Peer Interview', async function() {
    await interviewPrepPage.selectPeerInterview();
    console.log(await this.page.content());
});

Then('the student should see an option to join or schedule a peer interview session', async function() {
    await interviewPrepPage.verifyPeerInterviewsPage();
});

// This is for the 3rd Scenario

Given('the student has clicked on the Schedule Interview button', async function() {
    await interviewPrepPage.clickScheduleInterview();
});

Given('the student has selected Peer Interview', async function() {
    await interviewPrepPage.clickScheduleInterview();
    await interviewPrepPage.selectPeerInterview();
});

When('the student clicks on the Create New Session option', async function() {
    await interviewPrepPage.createNewSession();
});

When('inputs a valid date and time for the interview', async function() {
    await this.page.fill(interviewPrepPage.DateInputField, '12/31/2025');
    await this.page.fill(interviewPrepPage.TimeInputField, '10:00');
});

When('inputs a valid interview topic', async function() {
    await interviewPrepPage.inputInterviewTopic('Technical Coding');
});     
When('inputs a valid difficulty level', async function() {
    await interviewPrepPage.selectDifficultyLevel('Intermediate');
});

When('clicks on the Create Session button', async function() {
    await interviewPrepPage.clickCreateSession();
});  

Then('Upcoming Sessions list shows the newly scheduled peer interview with correct details', async function() {
    await interviewPrepPage.verifySessionInUpcomingList('Technical Coding', '12/31/2025', '10:00');
});