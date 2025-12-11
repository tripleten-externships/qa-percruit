import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import * as env from '../../config/world';
export class ForumPage extends BasePage {

    ForumsHeading = '//h5[text() = "Forums"]';
    SearchEditBox = '//input[@placeholder="Search posts..."]';
     SortByEditBox= '//input[@placeholder=" Filter by Topic"]';
     // New Post button locators
    NewPostButton = '//button[text()="New Post"]';
    // New Post modal locators
    TitleField = '//input[@placeholder="What\'s your topic about?"]';
    ContentField = '//div[@data-placeholder="Type your text here..."]';
    CreateTopicButton = '//button[text()="Create Topic"]';
    TitleRequiredError = '//p[contains(text(), "Title is required")]';


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
// Methods to interact with the New Post modal to cancel a new post

// Navigate to the Forum page dynamically using base URL
  async navigateTo() {
    const url = env.getBaseUrl() + 'forums';
    await this.page.goto(url);
    await expect(this.page.locator(this.ForumsHeading)).toBeVisible();
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

// Additional methods to interact with the New Post modal to create a new post without title

async clearTitleField() {
    await this.page.locator(this.TitleField).fill('');
  }

  async enterContent(content: string) {
    const editor = this.page.locator(this.ContentField);
    await editor.click();
    await editor.fill(content).catch(async () => {
      // fallback for rich editors
      await this.page.keyboard.type(content);
    });
  }

  async clickCreateTopicButton() {
    await this.page.locator(this.CreateTopicButton).click();
  }

  async expectTitleRequiredError() {
    await expect(this.page.locator(this.TitleRequiredError)).toBeVisible();
  }
}