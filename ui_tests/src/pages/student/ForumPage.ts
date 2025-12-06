import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class ForumPage extends BasePage {

    ForumsHeading = '//h5[text() = "Forums"]';
    SearchEditBox = '//input[@placeholder="Search posts..."]';
     SortByEditBox= '//input[@placeholder=" Filter by Topic"]';
   
  constructor(page: Page) {
    super(page);
  }

  async verifyPage(){
    await expect(this.page.locator(this.ForumsHeading)).toBeVisible();
    await expect(this.page.locator(this.SearchEditBox)).toBeVisible();
    await expect(this.page.locator(this.SortByEditBox)).toBeVisible();
    
  }

}