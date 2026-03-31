// Import Playwright classes and assertion utilities
import { test, chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { JobBoardPage } from '../../src/pages/student/JobBoardPage';
import { ConnectMessagesPage } from '../../src/pages/student/ConnectMessagesPage';
import { BasePage } from '../../src/pages/common/BasePage';
// Declare variables to hold browser, page, and page objects instances
let loginPage: LoginPage;
let connectMessagesPage: ConnectMessagesPage;

test.describe('Student Connect Messages', () => {
  // Before hook: Launch a new browser and page before each scenario and initialize page objects
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    connectMessagesPage = new ConnectMessagesPage(page);
  });

  test('the user navigates to the Industry News page and industry news page displays', async ({
    page,
  }) => {
    // ------------------------ Navigation Steps ------------------------
    await connectMessagesPage.gotoMessagesPage();
    // ------------------------ Messages Page Verification ------------------------
    await connectMessagesPage.verifyPage();
    await connectMessagesPage.verifyPage();
    await expect(page.locator(connectMessagesPage.MessagesTitle)).toBeVisible();
    // ------------------------ Conversation Steps ------------------------
    await connectMessagesPage.selectConversation('Test Mentor'); // use a sample mentor
    // verify conversation thread loaded (could check first message visible)
    await connectMessagesPage.verifyMessageVisible('Hello'); // example
    // ------------------------ Send Message Steps ------------------------
    await connectMessagesPage.sendMessage('Hello, Mentor!');
    await connectMessagesPage.verifyMessageVisible('Hello, Mentor!');
    // ------------------------ New Message Steps ------------------------
    await connectMessagesPage.clickNewMessage();
    await expect(
      page.locator(connectMessagesPage.MentorSearchInput)
    ).toBeVisible();
    await expect(page.locator(connectMessagesPage.MessageInput)).toBeVisible();
    // ------------------------ Mentor Search Steps -----------------------
    await connectMessagesPage.searchMentor('Test Mentor');
    await connectMessagesPage.selectConversation('Test Mentor'); // ensures filtered correctly
    await connectMessagesPage.verifyMentorInfoUnavailable();
    // ------------------------ Mentor Info Not Available Steps ------------------------
    await connectMessagesPage.searchMentor('Nonexistent Mentor');
    // optionally press Escape or click outside to close search box
    // verify search box not visible
    await expect(
      page.locator(connectMessagesPage.MentorSearchInput)
    ).toHaveCount(0); // or hidden
    await expect(page.locator(connectMessagesPage.MessagesTitle)).toBeVisible();
    // ------------------------ Filter Unread ------------------------
    await connectMessagesPage.filterUnreadMessages();
    // ------------------------ Archived Messages ------------------------
    await connectMessagesPage.viewArchivedMessages();
    // optionally verify conversations in archived tab
    // ------------------------ Archive Conversation ------------------------
    await connectMessagesPage.archiveConversation();
    await connectMessagesPage.viewArchivedMessages();
    // verify the archived conversation exists
  });
});
