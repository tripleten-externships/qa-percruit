import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import * as env from '../../config/world';

export class ForumPage extends BasePage {
  // Locators
  ForumsHeading = '//h5[text() = "Forums"]';
  NewPostButton = '//button[text()="New Post"]';
  TitleField = '//input[@placeholder="What\'s your topic about?"]';
  ContentField = '//div[@data-placeholder="Type your text here..."]';
  CreateTopicButton = '//button[text()="Create Topic"]';
  TitleRequiredError = '//p[contains(text(), "Title is required")]';

  constructor(page: Page) {
    super(page); // call BasePage constructor
  }

  /** 
   * Navigate to the Forum page 
   */
  async navigateTo() {
    const url = env.getBaseUrl() + 'forums';
    await this.page.goto(url);
    await expect(this.page.locator(this.ForumsHeading)).toBeVisible();
  }

  /** Locator for the New Post modal */
  newPostModal() {
    return this.page.locator(
      '//h5[text()="Create a New Topic"]/ancestor::div[contains(@class, "modal")]'
    );
  }

  /** Locator for Cancel button inside modal */
  cancelButtonInModal() {
    return this.newPostModal().locator('//button[text()="Cancel"]');
  }

  /** Click the "New Post" button to open modal */
  async clickNewPostButton() {
    await this.page.locator(this.NewPostButton).click();
  }

  /** Verify the New Post modal is visible */
  async expectNewPostModalVisible() {
    await expect(this.newPostModal()).toBeVisible();
  }

  /** Click the "Cancel" button in the New Post modal */
  async clickCancelInModal() {
    await this.cancelButtonInModal().click();
  }

  /** Verify the New Post modal is hidden */
  async expectNewPostModalHidden() {
    await expect(this.newPostModal()).toHaveCount(0);
  }

  /** Optional: Enter content into modal */
  async enterContent(content: string) {
    const editor = this.page.locator(this.ContentField);
    await editor.click();
    await editor.fill(content).catch(async () => {
      // fallback for rich editors
      await this.page.keyboard.type(content);
    });
  }

  /** Click "Create Topic" button */
  async clickCreateTopicButton() {
    await this.page.locator(this.CreateTopicButton).click();
  }

  /** Verify "Title is required" error is visible */
  async expectTitleRequiredError() {
    await expect(this.page.locator(this.TitleRequiredError)).toBeVisible();
  }
}