//import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import * as env from '../../config/world';
import { Page, expect, Locator } from '@playwright/test';

export class ForumsPage extends BasePage {
  readonly ForumsHeader: Locator;
  readonly NewPostButton: Locator;
  readonly CancelButton: Locator;
  readonly CreateTopicButton: Locator;
  readonly NewPostModal: Locator;
  readonly TitleInput: Locator;
  readonly TitleError: Locator;
 
  

  constructor(page: Page) {
    super(page);
    
    this.ForumsHeader = page.getByText(/forums/i, { exact: false });
    this.NewPostButton = this.page.locator('button', { hasText: '+ New Post' });
    this.CancelButton = page.getByRole('button', { name: /Cancel/i });
    this.CreateTopicButton = page.getByRole('button', { name: /Create Topic/i });
    this.NewPostModal = this.page.locator('div.MuiDialogContent-root:has-text("Create a New Topic")');
    this.TitleInput = this.NewPostModal.locator('input[name="title"]'); // adjust if needed
    this.TitleError = this.NewPostModal.locator('text=Title is required'); // adjust if needed

    
  }

  async verifyPage() {
    await expect(this.page).toHaveURL(/\/forums$/);
    await expect(this.ForumsHeader).toBeVisible({ timeout: 15000 });

    

 
}
  
 // Open New Post modal safely
  async openNewPostModal() {
    await this.NewPostButton.scrollIntoViewIfNeeded();
    await this.NewPostButton.waitFor({ state: 'attached', timeout: 15000 });
    await this.NewPostButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.NewPostButton.click();
    await expect(this.NewPostModal).toBeVisible({ timeout: 5000 });
  }

  // Attempt to create post without title to trigger validation
  async createPostWithoutTitle() {
    await this.CreateTopicButton.click();
    await expect(this.TitleError).toBeVisible({ timeout: 5000 });
  }

  // Cancel New Post modal
  async cancelNewPost() {
    await this.CancelButton.click();
    await expect(this.NewPostModal).toHaveCount(0); // modal closed
  }
}




 