import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class ForumPage extends BasePage {

    IndustryNewsHeading = '//h1[text() = "Industry News"]';
    SearchEditBox = '//input[@placeholder="Search articles..."]';
    TitleInputBox= '//input[@placeholder=" What\'s your topic about?"]';
   
    SortByEditBox = '//input[@value="relevance"]';

  constructor(page: Page) {
    super(page);
  }

  async verifyPage(){
    await expect(this.page.locator(this.IndustryNewsHeading)).toBeVisible();
    await expect(this.page.locator(this.SearchEditBox)).toBeVisible();
    await expect(this.page.locator(this.SortByEditBox)).toBeVisible();
    
  }

}