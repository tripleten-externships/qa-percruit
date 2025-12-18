//import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import * as env from '../../config/world';
import { Page, expect, Locator } from '@playwright/test';

export class ForumsPage extends BasePage {
  readonly ForumsHeader: Locator;
  readonly NewPostButton: Locator;
  readonly NewPostModal: Locator;
  readonly NewPostModalTitle: Locator;
  readonly CancelButton: Locator;
  readonly CreateTopicButton: Locator;
  readonly TitleInput: Locator;
  readonly TitleError: Locator;
  readonly SuccessMessage: Locator;

  

  constructor(page: Page) {
    super(page);
    
    // heading locator for Forums page
    this.ForumsHeader = page.getByRole('heading', { name: 'Forums' });

    // New Post button
    this.NewPostButton = page.getByRole('button', { name: /new post/i });
    this.CancelButton = page.getByRole('button', { name: /cancel/i });
    this.CreateTopicButton = page.getByRole('button', { name: /create topic/i });


    // New Post modal
   
  this.NewPostModal = page.getByRole('dialog');
  this.NewPostModalTitle = this.NewPostModal.locator('text=Create a New Topic');
 // Input and validation
    this.TitleInput = this.NewPostModal.locator('input[placeholder="What\'s your topic about?"]');

    this.TitleError = page.locator('.MuiAlert-message'); 
    this.SuccessMessage = page.locator('.MuiSnackbarContent-message'); 


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
    await this.NewPostButton.click();
  }

  async verifyNewPostModalVisible() {
  await this.NewPostModal.waitFor({ state: 'visible', timeout: 10000 });
  await expect(this.NewPostModalTitle).toBeVisible({ timeout: 5000 });
}

//enter title
 async enterPostTitle(title: string) {
    await expect(this.TitleInput).toBeVisible({ timeout: 10000 });
    await this.TitleInput.fill(title);
}



 async clickCreateTopicButton() {
    await this.CreateTopicButton.click();
  }

 async verifySuccessMessage(message: string) {
    await expect(this.SuccessMessage).toHaveText(message, { timeout: 5000 });
}


  async clickCancelButton() {
    await this.CancelButton.click();
  }

  async verifyNewPostModalHidden() {
    await expect(this.NewPostModal).toBeHidden({ timeout: 5000 });
  }

  async verifyTitleError(message: string) {
    await expect(this.TitleError).toHaveText(message, { timeout: 5000 });
}

}





 