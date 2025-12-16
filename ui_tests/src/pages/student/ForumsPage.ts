import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import * as env from '../../config/world';
export class ForumsPage extends BasePage { 
  async verifyPage() {
  await expect(this.page).toHaveURL(/forums/i);

  const forumsHeading = this.page.locator('h5', { hasText: 'Forums' });
  await forumsHeading.waitFor({ state: 'visible', timeout: 15000 });

  await expect(forumsHeading).toBeVisible();
  await expect(this.page.getByPlaceholder('Search posts...')).toBeVisible();
  await expect(this.page.getByRole('combobox')).toBeVisible();
}



  
  // Locators
  //ForumsHeading = this.page.getByRole('heading', { name: 'Forums' });
  //NewPostButton = this.page.locator('button:has-text("New Post")');
  // Locators

  NewPostButton = this.page.getByRole('button', { name: /New Post/i });
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
  async clickNewPostButton() {
    // ✅ FIX: We only need to wait for the button to be visible/enabled and click it.
    // getByRole automatically waits for the element to be found and actionable.
    await expect(this.NewPostButton).toBeVisible({ timeout: 15000 });
    await this.NewPostButton.click();
    
    // You can remove the old, problematic lines:
    // await expect(this.NewPostButton).toHaveCount(1, { timeout: 15000 });
    // await this.NewPostButton.scrollIntoViewIfNeeded();
    // await this.NewPostButton.click({ force: true });
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
  async expectForumsPageVisible() {
  await expect(
    this.page.getByRole('heading', { name: /forums/i })
  ).toBeVisible();
}

}


 