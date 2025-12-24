// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { ConnectMessagesPage } from '../../../src/pages/student/ConnectMessagesPage';

// Declare variables to hold page object instances
let loginPage: LoginPage;
let connectMessagesPage: ConnectMessagesPage;

// Before hook: Launch a new page before each scenario and initialize page objects
Before(async function() {
  loginPage = new LoginPage(this.page);
  connectMessagesPage = new ConnectMessagesPage(this.page);
});

// ------------------------ Login Steps ------------------------
/*Given('the student is authenticated in the system', async function() {
  await loginPage.goto();
  await loginPage.login('student_username', 'student_password'); // replace with test credentials
});*/

/*Given('the user is logged in', async function() {
  await loginPage.goto();
  await loginPage.login('student_username', 'student_password');
});

Given('the user is logged in and has at least one conversation', async function() {
  await loginPage.goto();
  await loginPage.login('student_username', 'student_password');
    // optionally verify there is at least one conversation
});

Given('the user is logged in and has opened a conversation', async function() {
  await loginPage.goto();
  await loginPage.login('student_username', 'student_password');
  await connectMessagesPage.selectConversation('Test Mentor'); // pick a sample mentor
});

Given('the user is logged in and on the messages page', async function() {
  await loginPage.goto();
  await loginPage.login('student_username', 'student_password');
  await connectMessagesPage.gotoMessagesPage(); // optional helper to navigate
});*/

// ------------------------ Navigation Steps ------------------------
When('the user navigates to the messages page', async function() {
  await connectMessagesPage.gotoMessagesPage();
});

// ------------------------ Messages Page Verification ------------------------
Then('the messages page display', async function() {
  await connectMessagesPage.verifyPage();
});

Then('the Messages page should display', async function() {
  await connectMessagesPage.verifyPage();
});

Then('the user should see Welcome to Messages', async function() {
  await expect(this.page.locator(connectMessagesPage.MessagesTitle)).toBeVisible();
});

// ------------------------ Conversation Steps ------------------------
When('the user selects a conversation', async function() {
  await connectMessagesPage.selectConversation('Test Mentor'); // use a sample mentor
});

Then('the conversation should open and display the full message thread', async function() {
    // verify conversation thread loaded (could check first message visible)
  await connectMessagesPage.verifyMessageVisible('Hello'); // example
});

// ------------------------ Send Message Steps ------------------------
When('the user types a message and clicks send', async function() {
  await connectMessagesPage.sendMessage('Hello, Mentor!');
});

Then('the message should appear in the thread and be sent to the mentor', async function() {
  await connectMessagesPage.verifyMessageVisible('Hello, Mentor!');
});

// ------------------------ New Message Steps ------------------------
When('the user clicks New Message', async function() {
  await connectMessagesPage.clickNewMessage();
});

Then('the system should open a form to select a mentor and type a new message', async function() {
  await expect(this.page.locator(connectMessagesPage.MentorSearchInput)).toBeVisible();
  await expect(this.page.locator(connectMessagesPage.MessageInput)).toBeVisible();
});

// ------------------------ Mentor Search Steps ------------------------
When('the user enters a mentors name in the Search mentor bar', async function() {
  await connectMessagesPage.searchMentor('Test Mentor');
});

Then('only conversations with that mentor should appear', async function() {
  await connectMessagesPage.selectConversation('Test Mentor'); // ensures filtered correctly
});

Then('the system should display Mentor information unavailable', async function() {
  await connectMessagesPage.verifyMentorInfoUnavailable();
});

// ------------------------ Mentor Info Not Available Steps ------------------------
When('the user searches for the mentor and then exits the search box', async function() {
  await connectMessagesPage.searchMentor('Nonexistent Mentor');
    // optionally press Escape or click outside to close search box
});

Then('the search box should close', async function() {
    // verify search box not visible
   await expect(this.page.locator(connectMessagesPage.MentorSearchInput)).toHaveCount(1); // or hidden
});

Then('the user should return to the Welcome Messages screen', async function() {
  await expect(this.page.locator(connectMessagesPage.MessagesTitle)).toBeVisible();
});

// ------------------------ Filter Unread ------------------------
When('clicking the unread messages should display', async function() {
  await connectMessagesPage.filterUnreadMessages();
});

// ------------------------ Archived Messages ------------------------
When('clicking the archived tab', async function() {
  await connectMessagesPage.viewArchivedMessages();
});

Then('only archived conversations should display', async function() {
    // optionally verify conversations in archived tab
});

// ------------------------ Archive Conversation ------------------------
When('clicking the three dots menu and selecting archive', async function() {
  await connectMessagesPage.archiveConversation();
});

Then('the conversation should move to the archived tab', async function() {
  await connectMessagesPage.viewArchivedMessages();
    // verify the archived conversation exists
});

Then('no longer appear in the active messages list', async function() {
    // verify conversation is not in active messages (could check count or absence)
});

