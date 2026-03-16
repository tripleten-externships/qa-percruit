import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { MentorMeetingPage } from '../../src/pages/mentor/MentorMeetingPage';
import { CookiesPolicyPage } from '../../src/pages/common/CookiesPolicyPage';

interface MeetingInfo {
  meetingTitle: string;
  meetingDescription: string;
  studentName: string;
  meetingType: string;
  meetingDate: string;
  meetingDuration: string;
}

test.describe('Mentor Meetings Information', () => {
  // page will hold the shared Playwright page; usageMetricsPage must be created after the page exists
  let page: Page;
  let mentorMeetingPage: MentorMeetingPage;
  let cookiesPolicyPage: CookiesPolicyPage;

  // ⭐ Shared variables across tests
  let meetingsList: MeetingInfo[];

  // Receives the Playwright browser instance and configured baseURL
  test.beforeEach(async ({ browser, baseURL }) => {
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

  // Get list of upcoming meetings
  test('Upcoming Meetings List', {tag: '@smoke'}, async () => {
    console.log('Starting test: Get list of upcoming meetings');
    // page is created in beforeEach
    // Locate Meetings & Communications Heading to ensure the page has loaded
    await expect(mentorMeetingPage.meetingsAndCommunication).toBeVisible({ timeout: 5000 });
    // Click on Schedule and Manage Meetings link in the sidebar
    // Verify that the URL is correct after clicking the link  
    await mentorMeetingPage.clickOnscheduleAndManageMeetingsLink();
    meetingsList = await mentorMeetingPage.getUpcomingMeetings();
    // console.log("Final meetings list:", meetingsList);
  });

  test.afterEach(async () => {
    console.log('Closing the page');
    await page.close();
  });

});
