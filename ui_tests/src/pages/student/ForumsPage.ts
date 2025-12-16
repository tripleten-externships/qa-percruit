//import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import * as env from '../../config/world';
import { Page, expect, Locator } from '@playwright/test';

export class ForumsPage extends BasePage {
  readonly ForumsHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.ForumsHeader = page.getByText(/forums/i, { exact: false });
  }

  async verifyPage() {
    await expect(this.page).toHaveURL(/\/forums$/);
    await expect(this.ForumsHeader).toBeVisible({ timeout: 15000 });
  }
}



 /*async verifyPage(){
       await expect(this.ForumsHeader).toBeVisible();
       await expect(this.NewPostButton).toBeVisible();
       await expect(this.SearchPostBox).toBeVisible();

    }
  /** Verify Forums page is displayed */
 // async verifyPage() {
    // First check URL
    //await expect(this.page).toHaveURL(/forums/i, { timeout: 30000 });
 //await expect(this.page.locator(this.ForumsHeader)).toBeVisible();
    // Then check main elements in parallel
    //await Promise.all([
     // expect(this.ForumsHeader).toBeVisible({ timeout: 30000 }),
     // expect(this.NewPostButton).toBeVisible({ timeout: 30000 }),
     // expect(this.SearchPostBox).toBeVisible({ timeout: 30000 }),
    //]);
  
  
/** Click the "New Post" button 
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




/** Locator for the New Post modal 
  newPostModal() {
    return this.page.getByRole('heading', { name: 'Create a New Topic' });
  }
  

  /** Click the "Cancel" button in the modal 
  async clickCancelInModal() {
    const cancelBtn = this.page.getByRole('button', { name: 'Cancel' });
    await expect(cancelBtn).toBeVisible();
    await cancelBtn.click();
  }

  /** Verify the New Post modal is visible 
  async expectNewPostModalVisible() {
    await expect(this.newPostModal()).toBeVisible();
  }*/
  /** Verify the New Post modal is hidden 
  async expectNewPostModalHidden() {
    await expect(this.newPostModal()).toBeHidden();
  }
  async expectForumsPageVisible() {
  await expect(
    this.page.getByRole('heading', { name: /forums/i })
  ).toBeVisible();
}
*/


  
