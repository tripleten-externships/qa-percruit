//import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import * as env from '../../config/world';
import { Page, expect, Locator } from '@playwright/test';

export class ForumsPage extends BasePage {
  readonly ForumsHeader: Locator;
  readonly NewPostButton: Locator;
  //readonly NewPostModal: Locator;
  //readonly NewPostModalTitle: Locator;
  //readonly CancelButton: Locator;
  
  constructor(page: Page) {
    super(page);
    
    // heading locator for Forums page
    this.ForumsHeader = page.getByRole('heading', { name: 'Forums' });

    // New Post button
    this.NewPostButton = page.getByRole('button', { name: /new post/i });
    
  }
// ===== MODAL GETTERS =====
  get NewPostModal() {
    // Scoped to dialog to avoid stale / hidden elements
    return this.page.getByRole('dialog');
  }

  get NewPostModalTitle() {
    return this.NewPostModal.getByRole('heading', {
      name: /create a new topic/i,
    });
  }

  get CancelButton() {
    return this.NewPostModal.getByRole('button', { name: 'Cancel' });
  }
  
 // Navigate to Forums page
  async navigateToForums() {
    await this.page.goto(env.getBaseUrl() + 'community/forums');
    await expect(this.page).toHaveURL(/\/community\/forums$/);
  }

  // Verify Forums page loaded
  async verifyPage() {
    await expect(this.page).toHaveURL(/\/community\/forums$/);
    await expect(this.ForumsHeader).toBeVisible({ timeout: 15000 });
  }
  
  // Click New Post button
  async clickNewPostButton() {
  await expect(this.NewPostButton).toBeVisible({ timeout: 15000 });
  await this.NewPostButton.click();
}


  async verifyNewPostModalVisible() {
  await this.NewPostModal.waitFor({ state: 'visible', timeout: 10000 });
  await expect(this.NewPostModalTitle).toBeVisible({ timeout: 5000 });
}


async clickCancelButton() {
  const cancel = this.CancelButton;

  await expect(this.NewPostModal).toBeVisible({ timeout: 15000 });
  await expect(cancel).toBeVisible({ timeout: 15000 });
  await expect(cancel).toBeEnabled({ timeout: 15000 });

  // Scroll and click
  await cancel.scrollIntoViewIfNeeded();
  await cancel.click({ force: true });

  // Wait longer for modal fade-out
  await this.page.waitForTimeout(500); // adjust as needed

  await expect(this.NewPostModal).toBeHidden({ timeout: 15000 });
}

  async verifyNewPostModalHidden() {
    await expect(this.NewPostModal).toBeHidden({ timeout: 5000 });
  }


}





 