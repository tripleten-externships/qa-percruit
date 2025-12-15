import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import * as env from '../../config/world';

export class ForumsPage extends BasePage {
  // Locators
  ForumsHeading = this.page.getByRole('heading', { name: 'Forums' });
  NewPostButton = this.page.locator('button', { hasText: 'New Post' });
// Flexible locator for the New Post button
  


  constructor(page: Page) {
    super(page); // call BasePage constructor
  }

  /** Navigate to the Forum page */
  async navigateTo() {
  const url = env.getBaseUrl() + 'forums';

  await Promise.all([
    this.page.goto(url),
    this.page.waitForResponse(response =>
      response.url().includes('/forums') && response.status() === 200
    )
  ]);

  await expect(
    this.page.getByRole('heading', { name: /forums/i })
  ).toBeVisible({ timeout: 15000 });
}


    /** Click the "New Post" button */
 // async clickNewPostButton() {
  //await expect(this.NewPostButton).toBeEnabled({ timeout: 15000 });
  //await this.NewPostButton.click();
//}

async clickNewPostButton() {
  await this.page.waitForLoadState('networkidle');

  // Scroll — REQUIRED
  await this.page.mouse.wheel(0, 1000);
  await this.NewPostButton.scrollIntoViewIfNeeded();

  await expect(this.NewPostButton).toBeVisible({ timeout: 15000 });
  await this.NewPostButton.click();
}



/** Locator for the New Post modal */
  newPostModal() {
    return this.page.getByRole('heading', { name: 'Create a New Topic' });
  }

  /** Click the "Cancel" button in the modal */
  async clickCancelInModal() {
    const cancelBtn = this.page.getByRole('button', { name: 'Cancel' });
    await expect(cancelBtn).toBeVisible();
    await cancelBtn.click();
  }

  /** Verify the New Post modal is visible */
  async expectNewPostModalVisible() {
    await expect(this.newPostModal()).toBeVisible();
  }
  /** Verify the New Post modal is hidden */
  async expectNewPostModalHidden() {
    await expect(this.newPostModal()).toBeHidden();
  }
}


 