import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class ConnectMessagePage extends BasePage {

    IndustryNewsHeading = '//h1[text() = "Messages"]';
    SearchMessagesInput = '//input[@placeholder="Search messages..."]';
    NewMessagesButton = '//input[@value="newmessage"]';

  constructor(page: Page) {
    super(page);
  }

  async verifyPage(){
    await expect(this.page.locator(this.MessageHeading)).toBeVisible();
    await expect(this.page.locator(this.SearchMessagesInput)).toBeVisible();
    await expect(this.page.locator(this.NewMessagesButton)).toBeVisible();
    
  }
  MessagesHeading(MessagesHeading: any): any {
    throw new Error('Method not implemented.');
  }

}