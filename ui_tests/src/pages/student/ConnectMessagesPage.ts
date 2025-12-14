import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class ConnectMessagesPage extends BasePage {

    MessagesTitle = '//h5[text() = "Welcome to Messages"]';
    SelectaConversationLabel =  '//span[text()="Select a conversation"]';
    SearchConversationsInput = '//input[@placeholder="Search conversations..."]';

  constructor(page: Page) {
    super(page);
  }

  async verifyPage(){
    await expect(this.page.locator(this.MessagesTitle)).toBeVisible();
    await expect(this.page.locator(this.SelectaConversationLabel)).toBeVisible();
    await expect(this.page.locator(this.SearchConversationsInput)).toBeVisible();
    
  }
  MessagesHeading(MessagesHeading: any): any {
    throw new Error('Method not implemented.');
  }

}