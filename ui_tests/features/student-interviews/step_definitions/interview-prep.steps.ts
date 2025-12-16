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

// Navigation area

Given('the student is on the Interview Prep page', async function () {
    await this.page.goto(`${env.getBaseUrl()}interview-prep`);
    await expect(this.page).toHaveURL(/interview-prep/);
    await interviewPrepPage.verifyPage();
});

When('the user navigates to the Interview prep page', async function() {
    await this.page.waitForLoadState('networkidle');
    await this.page.goto(env.getBaseUrl() + 'interview-prep');
    await expect(this.page).toHaveURL(/interview-prep/);
});

Then('the Interview Prep page displays', async function() {
    await interviewPrepPage.verifyPage();
});

// Scheduling different interview types
When('the student clicks on the Schedule Interview button', async function() {
    await interviewPrepPage.clickScheduleInterview();
});

When('the student selects {string}', async function(option: string) {
    await interviewPrepPage.selectInterviewOption(option as 'Peer Interview' | 'Expert Interview' | 'AI Practice');
});

// Verification of different interview pages
Then('the student should see an option to join or schedule a Peer Interview session', async function() {
    await interviewPrepPage.verifyPeerInterviewPage();
});

Then('the student should see an option to join or schedule an Expert Interview session', async function() {
    await interviewPrepPage.verifyExpertInterviewPage();
});

Then('the student should see an option to start or end an AI Practice session', async function() {
    await interviewPrepPage.verifyAIPracticePage();
});

// Creating new peer interview sessions
When('the student clicks on the Create New Session option', async function() {
    await this.page.click(interviewPrepPage.CreateNewSessionButton);
});

When('inputs a valid date and time for the interview', async function() {
    await this.page.click(interviewPrepPage.DatePickerIconButton);
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
    await interviewPrepPage.clickCreatePeerSession();
});  

// Creating new expert interview sessions
When('inputs a valid date for the interview', async function() {
    await interviewPrepPage.inputMentorDate('12/31/2025');
}); 

When('selects a valid time slot for the interview', async function() {
    await interviewPrepPage.selectTimeSlot();
});

When('inputs a valid mentor interview topic', async function() {
    await interviewPrepPage.inputMentorInterviewTopic('Behavioral');
});

When('clicks on the Schedule Interview button on the Expert Interview form', async function() {
    await interviewPrepPage.clickMentorScheduleInterview();
});  

// Verification of upcoming sessions
Then('Upcoming Sessions list shows the newly scheduled Peer Interview with correct details', async function() {
    await interviewPrepPage.verifyUpcomingSession();
});

Then('Upcoming Sessions list shows the newly scheduled Expert Interview with correct details', async function() {
    await interviewPrepPage.verifyUpcomingSession();
});