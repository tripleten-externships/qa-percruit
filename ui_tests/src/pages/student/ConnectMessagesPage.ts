import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class ConnectMessagesPage extends BasePage {
  gotoMessagesPage() {
    throw new Error('Method not implemented.');
  }

    MessagesTitle = '//h5[text() = "Welcome to Messages"]';
    SelectaConversationLabel =  '//span[text()="Select a conversation"]';
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

  async verifyPage(){
    await expect(this.page.locator(this.MessagesTitle)).toBeVisible();
    await expect(this.page.locator(this.SelectaConversationLabel)).toBeVisible();
    await expect(this.page.locator(this.SearchConversationsInput)).toBeVisible();
  

    
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