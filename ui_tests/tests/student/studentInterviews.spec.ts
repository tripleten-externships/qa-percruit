// Import Playwright classes and assertion utilities
import test, { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { InterviewPrepPage } from '../../src/pages/student/InterviewPrepPage';

// Declare variables to hold brosewr, page, and page objects instances
let loginPage: LoginPage;
let interviewPrepPage: InterviewPrepPage;

test.describe('Student Interview Prep', () => {
// Before hook: Launch a new browser and page before each scenario and initialize page objects
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    interviewPrepPage = new InterviewPrepPage(page);
   
  });

  test('When user goes to the page, the page loads as expected', async ({ page }) => {
    // Scenario: When user goes to the page, the page loads as expected
    //     Given the student is authenticated in the system
    //     When I add the title When user goes to the page, the page loads as expected. to the log
    //     When the user navigates to the Interview prep page
    //     Then the Interview Prep page displays
    await page.goto(`${env.getBaseUrl()}interview-prep`);
    await expect(page).toHaveURL(/interview-prep/);
    await interviewPrepPage.verifyPage();
    await page.waitForLoadState('networkidle');
    await page.goto(env.getBaseUrl() + 'interview-prep');
    await expect(page).toHaveURL(/interview-prep/);
    await interviewPrepPage.verifyPage();
  });

  test('student can schedule a peer interview session', async ({ page }) => {
    // Scenario: Student clicks on Peer Interview
    //     Given the student is authenticated in the system
    //     And the student is on the Interview Prep page
    //     When I add the title Student clicks on Peer Interview to the log
    //     When the student clicks on the Schedule Interview button
    //     And the student selects "Peer Interview"
    //     Then the student should see an option to join or schedule a Peer Interview session
    await interviewPrepPage.clickScheduleInterview();

    //await interviewPrepPage.selectInterviewOption('Peer Interview' | 'Expert Interview' | 'AI Practice');

    await interviewPrepPage.verifyPeerInterviewPage();

    await interviewPrepPage.verifyExpertInterviewPage();
  });
test('student can schedule a peer interview session1', async ({ page }) => {
    await interviewPrepPage.verifyAIPracticePage();
// Creating new peer interview sessions
    await interviewPrepPage.clickCreateNewSession();
    await interviewPrepPage.clickCreatePeerSession();
    await interviewPrepPage.verifyAIPracticePage();
    // Creating new peer interview sessions
    await interviewPrepPage.clickCreateNewSession();
    await interviewPrepPage.clickCreatePeerSession();
    await interviewPrepPage.verifyPage();
    await interviewPrepPage.UpcomingSessionsCount();
    const sessionCount = await interviewPrepPage.UpcomingSessionsCount();
    expect(sessionCount).toBeGreaterThan(0);
});

});

