import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { MentorMeetingPage } from '../../src/pages/mentor/MentorMeetingPage';
import { CookiesPolicyPage } from '../../src/pages/common/CookiesPolicyPage';


// Open one browser page in beforeAll
// Log in once
// Reuse the same page for all tests inside the describe.serial

test.describe.serial('Mentor Meeting Scheduler', () => {

  // page will hold the shared Playwright page; usageMetricsPage must be created after the page exists
  let page: Page;
  let mentorMeetingPage: MentorMeetingPage;
  let cookiesPolicyPage: CookiesPolicyPage;

  // ⭐ Shared variables across tests
  let selectedStudent: string;
  let meetingTitle: string;
  let selectedDateTime: string;
  let scheduleOrCancelResult: string;
  
  // Receives the Playwright browser instance and configured baseURL
  test.beforeAll(async ({ browser, baseURL }) => {
    // This page will be reused for all tests, and also the key to keep the login session alive
    // create instances of page objects that require the page after the page is created
    page = await browser.newPage();
    const loginPage = new LoginPage(page);
    cookiesPolicyPage = new CookiesPolicyPage(page);
    mentorMeetingPage = new MentorMeetingPage(page);
        
    // Navigate to base URL
    await page.goto(baseURL!, { waitUntil: 'domcontentloaded' });

    // Close cookies banner if it appears
    await cookiesPolicyPage.closeCookieBanner();

    // Perform login as Mentor
    await loginPage.loginAsUserType('Mentor');
  });

  // Locate Meetings & Communications Heading to ensure the page has loaded
  test('Schedule Meeting Work-Flow', {tag: '@smoke'}, async () => {
    console.log('Starting test: Schedule Meeting Work-Flow');
    // page is the shared page created in beforeAll
    // Locate Meetings & Communications Heading to ensure the page has loaded
    await expect(mentorMeetingPage.meetingsAndCommunication).toBeVisible({ timeout: 5000 });
    // Click on Schedule and Manage Meetings link in the sidebar
    // Verify that the URL is correct after clicking the link  
    await mentorMeetingPage.clickOnscheduleAndManageMeetingsLink();
    // Locate Schedule Meeting button and click on it
    await mentorMeetingPage.clickOnscheduleMeetingButton();
    // Verify that the Schedule New Meeting popup is visible
    await mentorMeetingPage.scheduleNewMeetingPopupIsVisible();
    // Verify that the Student text box is visible on Schedule New Meeting popup
    // Select student dynamically
    selectedStudent = await mentorMeetingPage.selectStudent();
    console.log("Selected Student:", selectedStudent);
    // Fill in the meeting title manually
    meetingTitle = await mentorMeetingPage.fillMeetingTitle();
    console.log("Meeting Title:", meetingTitle);
    // Fill in the meeting description manually if you want or can be skipped as it's not a mandatory field
    const meetingDescription = await mentorMeetingPage.fillMeetingDescription();
    console.log("Meeting Description:", meetingDescription);
    // Select meeting type
    const selectedMeetingType = await mentorMeetingPage.selectMeetingType();
    console.log("Selected Meeting Type:", selectedMeetingType);
    // Choose Meeting Duration in minutes
    const selectedDuration = await mentorMeetingPage.selectMeetingDuration();
    console.log("Selected Duration:", selectedDuration);
    // Choose Meeting Date and Time
    selectedDateTime = await mentorMeetingPage.selectMeetingDateTime();
    console.log("Selected Date and Time:", selectedDateTime);
    // Handle Schedule or Cancel Meeting based on the current state of the meeting (if already scheduled, it will cancel; if not scheduled, it will schedule)
    scheduleOrCancelResult = await mentorMeetingPage.handleScheduleOrCancelFlow();
    console.log("Schedule or Cancel Result:", scheduleOrCancelResult);
    // Verify the scheduled meeting is available in the list of upcoming meetings
  });

  // Scheduled Meeting Verification
  // test('Verify if the given meeting exists in upcoming meetings', {tag: '@smoke'}, async() => {
  //   // Fetch values of selectedStudent, meetingTitle and selectedDateTime from the above test
  //   if(scheduleOrCancelResult == 'scheduled'){
  //     await mentorMeetingPage.confirmMeetingScheduled(selectedStudent, meetingTitle, selectedDateTime); 
  //   }
  //   else {
  //     console.log('Scheduling meeting was not successful');
  //   }
  // });

  // Close the page after all tests are finished
  test.afterAll(async () => {
    await page.close();
  });

});
