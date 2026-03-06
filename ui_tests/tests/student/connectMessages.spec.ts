// Import Playwright classes and assertion utilities
import { test, chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { JobBoardPage } from '../../src/pages/student/JobBoardPage';
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
export class ConnectMessagesPage extends BasePage {
  async gotoMessagesPage() {
    const url = env.getBaseUrl() + '/student/messages';
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });

    const messagesLocator = this.page.locator(this.MessagesTitle);
    try {
      await messagesLocator.waitFor({ state: 'visible', timeout: 5000 });
      return;
    } catch {
      // Possibly redirected to login — attempt to authenticate and retry
      const loginButton = this.page.locator('button:has-text("Sign In")');
      if ((await loginButton.count()) > 0) {
        const loginPage = new LoginPage(this.page);
        await loginPage.loginAsUserType('Student');
        // After login, try navigating via dashboard and clicking the Messages menu
        await this.page.goto(env.getBaseUrl() + '/dashboard', {
          waitUntil: 'domcontentloaded',
        });
        const menuLocator = this.page.locator(
          'li.ant-menu-item >> .ant-menu-title-content',
          { hasText: 'Messages' }
        );
        if ((await menuLocator.count()) > 0) {
          await menuLocator.first().click();
        } else {
          // Fallback: try direct navigation to messages URL again
          await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        }
        await expect(messagesLocator).toBeVisible({ timeout: 30000 });
        return;
      }

      // If not login redirect, fail with helpful message
      throw new Error('Unable to reach Messages page or detect login flow.');
    }
  }

  MessagesTitle = '//h5[text() = "Welcome to Messages"]';
  SelectaConversationLabel = '//span[text()="Select a conversation"]';
  SearchConversationsInput = '//input[@placeholder="Search conversations..."]';
  NewMessageButton = '//button[text()="New Message"]';
  MentorSearchInput = '//input[@placeholder="Search mentor..."]';
  ConversationItem = (mentorName: string) => `//span[text()="${mentorName}"]`;
  MessageInput = '//textarea[@placeholder="Type your message"]';
  SendButton = '//button[text()="Send"]';
  UnreadFilterButton = '//button[text()="Unread"]';
  ArchivedTab = '//button[text()="Archived"]';
  ArchiveMenuButton = '//button[@aria-label="More options"]';
  ArchiveOption = '//button[text()="Archive"]';
  MentorInfoUnavailable = '//span[text()="Mentor information unavailable"]';

  constructor(page: Page) {
    super(page);
  }

  async verifyPage() {
    await expect(this.page.locator(this.MessagesTitle)).toBeVisible();
    await expect(
      this.page.locator(this.SelectaConversationLabel)
    ).toBeVisible();
    await expect(
      this.page.locator(this.SearchConversationsInput)
    ).toBeVisible();
  }

  async clickNewMessage() {
    await this.page.locator(this.NewMessageButton).click();
  }

  async searchMentor(name: string) {
    await this.page.fill(this.MentorSearchInput, name);
    await this.page.press(this.MentorSearchInput, 'Enter');
  }

  async selectConversation(mentorName: string) {
    await this.page.locator(this.ConversationItem(mentorName)).click();
  }

  async sendMessage(message: string) {
    await this.page.fill(this.MessageInput, message);
    await this.page.click(this.SendButton);
  }

  async filterUnreadMessages() {
    await this.page.locator(this.UnreadFilterButton).click();
  }

  async viewArchivedMessages() {
    await this.page.locator(this.ArchivedTab).click();
  }

  async archiveConversation() {
    await this.page.locator(this.ArchiveMenuButton).click();
    await this.page.locator(this.ArchiveOption).click();
  }

  async verifyMentorInfoUnavailable() {
    await expect(this.page.locator(this.MentorInfoUnavailable)).toBeVisible();
  }

  async verifyMessageVisible(message: string) {
    await expect(this.page.locator(`//div[text()="${message}"]`)).toBeVisible();
  }
}
