import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class ForumPage extends BasePage {

    ForumsHeading = '//h5[text() = "Forums"]';
    SearchEditBox = '//input[@placeholder="Search posts..."]';
     SortByEditBox= '//input[@placeholder=" Filter by Topic"]';
     // New Post modal locators
    NewPostButton = '//button[text()="New Post"]';

  constructor(page: Page) {
    super(page);
  }

  async verifyPage(){
    await expect(this.page.locator(this.ForumsHeading)).toBeVisible();
    await expect(this.page.locator(this.SearchEditBox)).toBeVisible();
    await expect(this.page.locator(this.SortByEditBox)).toBeVisible();
    
  }
   /// Locator for modal
    newPostModal() {
        return this.page.locator('//h5[text()="Create a New Topic"]/ancestor::div[contains(@class, "modal")]');
    }

    // Locator for Cancel button inside modal
    cancelButtonInModal() {
        return this.newPostModal().locator('//button[text()="Cancel"]');
    }

    async clickNewPostButton() {
        await this.page.locator(this.NewPostButton).click();
    }

    async expectNewPostModalVisible() {
        await expect(this.newPostModal()).toBeVisible();
    }

    async clickCancelInModal() {
        await this.cancelButtonInModal().click();
    }

    async expectNewPostModalHidden() {
        await expect(this.newPostModal()).toHaveCount(0);
    }
}