import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { MentorMeetingPage } from '../../src/pages/mentor/MentorMeetingPage';
import { CookiesPolicyPage } from '../../src/pages/common/CookiesPolicyPage';

interface UpcomingMeetingInfo {
  meetingTitle: string;
  meetingDescription: string;
  studentName: string;
  meetingType: string;
  meetingDate: string;
  meetingDuration: string;
}

interface PastMeetingInfo {
  meetingTitle: string;
  // meetingDescription: string;
  studentName: string;
  meetingType: string;
  meetingDate: string;
  meetingStatus: string;
  meetingNotes: string;
}


// ⭐ RUN TESTS IN SERIAL (IMPORTANT) as the login user type and the basepage is the same, 
// it causes errors while executing tests in parallel
test.describe.serial('Mentor Meetings Information', () => {
  // page will hold the shared Playwright page; usageMetricsPage must be created after the page exists
  let page: Page;
  let mentorMeetingPage: MentorMeetingPage;
  let cookiesPolicyPage: CookiesPolicyPage;

  // ⭐ Shared variables across tests
  const loginUser = 'Mentor';
  let upcomingMeetingsList: UpcomingMeetingInfo[];
  let pastMeetingsList: PastMeetingInfo[];
  let upcomingMeetingsBadgeCount;
  let pastMeetingsBadgeCount;

  // Receives the Playwright browser instance and configured baseURL
  test.beforeEach(async ({ browser, baseURL }) => {
    console.log("Logging in as user type:", loginUser);
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

  // Get list of upcoming meetings by reading each row of upcoming meetings
  test('Upcoming Meetings List', {tag: '@smoke'}, async () => {
    console.log('Starting test: Get list of upcoming meetings');
    // page is created in beforeEach
    // Locate Meetings & Communications Heading to ensure the page has loaded
    await expect(mentorMeetingPage.meetingsAndCommunication).toBeVisible({ timeout: 5000 });
    // Click on Schedule and Manage Meetings link in the sidebar
    // Verify that the URL is correct after clicking the link  
    await mentorMeetingPage.clickOnscheduleAndManageMeetingsLink();
    const upcomingResult = await mentorMeetingPage.getUpcomingMeetingsList();
    upcomingMeetingsList = upcomingResult.upcomingMeetings
    console.log("Upcoming Meetings List:", upcomingMeetingsList);
  });

  // Get count of upcoming meetings using the value that is seen in Meeting Scheduler Page - using the locator value
  test('Upcoming Meetings Badge Count', {tag: '@smoke'}, async () => {
    console.log('Starting test: Get count of upcoming meetings');
    // page is created in beforeEach
    // Locate Meetings & Communications Heading to ensure the page has loaded
    await expect(mentorMeetingPage.meetingsAndCommunication).toBeVisible({ timeout: 5000 });
    // Click on Schedule and Manage Meetings link in the sidebar
    // Verify that the URL is correct after clicking the link  
    await mentorMeetingPage.clickOnscheduleAndManageMeetingsLink();
    upcomingMeetingsBadgeCount = await mentorMeetingPage.getUpcomingMeetingsBadgeCount();
    console.log("Count of Upcoming Meetings using Locator Value:", upcomingMeetingsBadgeCount);
  });

  // Verify if the count of upcoming meetings matches from the methods getUpcomingMeetingsList() and getUpcomingMeetingsBadgeCount()
  test('Validate Upcoming Count Matches Badge', async () => {
    console.log('Starting test: Upcoming Count Matches Badge Validation');
    // page is created in beforeEach
    // Locate Meetings & Communications Heading to ensure the page has loaded
    await expect(mentorMeetingPage.meetingsAndCommunication).toBeVisible({ timeout: 5000 });
    // Click on Schedule and Manage Meetings link in the sidebar
    // Verify that the URL is correct after clicking the link 
    await mentorMeetingPage.clickOnscheduleAndManageMeetingsLink();
    const { upComingMeetingsCount } = await mentorMeetingPage.getUpcomingMeetingsList();
    const upcomingMeetingsBadgeCount = await mentorMeetingPage.getUpcomingMeetingsBadgeCount();
    try {
      expect(upComingMeetingsCount).toBe(upcomingMeetingsBadgeCount);
      console.log(`🎉 Success: Upcoming Meetings Count (${upComingMeetingsCount}) matches Upcoming Meetings Badge Count (${upcomingMeetingsBadgeCount})`);
    } catch (error) {
      console.log(`❌ Mismatch: Upcoming Meetings Count (${upComingMeetingsCount}) does NOT match Upcoming Meetings Badge Count (${upcomingMeetingsBadgeCount})`);
      throw error; // rethrow so the test still fails
    }
  });

  // Get list of past meetings by reading each row of past meetings  
  test('Past Meetings List', {tag: '@smoke'}, async () => {
    console.log('Starting test: Get list of past meetings');
    // page is created in beforeEach
    // Locate Meetings & Communications Heading to ensure the page has loaded
    await expect(mentorMeetingPage.meetingsAndCommunication).toBeVisible({ timeout: 5000 });
    // Click on Schedule and Manage Meetings link in the sidebar
    // Verify that the URL is correct after clicking the link  
    await mentorMeetingPage.clickOnscheduleAndManageMeetingsLink();
    const pastResult = await mentorMeetingPage.getPastMeetingsList();
    pastMeetingsList = pastResult.pastMeetings
    console.log("Upcoming Meetings List:", pastMeetingsList);
  });

  // Get count of past meetings using the value that is seen in Meeting Scheduler Page - using the locator value
  test('Past Meetings Badge Count', {tag: '@smoke'}, async () => {
    console.log('Starting test: Get count of past meetings');
    // page is created in beforeEach
    // Locate Meetings & Communications Heading to ensure the page has loaded
    await expect(mentorMeetingPage.meetingsAndCommunication).toBeVisible({ timeout: 5000 });
    // Click on Schedule and Manage Meetings link in the sidebar
    // Verify that the URL is correct after clicking the link  
    await mentorMeetingPage.clickOnscheduleAndManageMeetingsLink();
    pastMeetingsBadgeCount = await mentorMeetingPage.getPastMeetingsBadgeCount();
    console.log("Count of Past Meetings using Locator Value:", pastMeetingsBadgeCount);
  });

  // Verify if the count of past meetings matches from the methods getPastMeetingsList() and getPastMeetingsBadgeCount()
  test('Validate Past Count Matches Badge', async () => {
    console.log('Starting test: Past Count Matches Badge Validation');
    // page is created in beforeEach
    // Locate Meetings & Communications Heading to ensure the page has loaded
    await expect(mentorMeetingPage.meetingsAndCommunication).toBeVisible({ timeout: 5000 });
    // Click on Schedule and Manage Meetings link in the sidebar
    // Verify that the URL is correct after clicking the link
    await mentorMeetingPage.clickOnscheduleAndManageMeetingsLink();
    const { pastMeetingsCount } = await mentorMeetingPage.getPastMeetingsList();
    const pastMeetingsBadgeCount = await mentorMeetingPage.getPastMeetingsBadgeCount();
    try {
      expect(pastMeetingsCount).toBe(pastMeetingsBadgeCount);
      console.log(`🎉 Success: Past Meetings Count (${pastMeetingsCount}) matches Past Meetings Badge Count (${pastMeetingsBadgeCount})`);
    } catch (error) {
      console.log(`❌ Mismatch: Past Meetings Count (${pastMeetingsCount}) does NOT match Past Meetings Badge Count (${pastMeetingsBadgeCount})`);
      throw error; // rethrow so the test still fails
    }
  });


  test.afterEach(async () => {
    console.log('Closing the page');
    await page.close();
  });

});

//   // test name
//   test('', {tag: '@smoke'}, async () => {
   
//   });
