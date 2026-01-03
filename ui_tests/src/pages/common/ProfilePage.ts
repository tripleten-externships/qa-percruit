import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class ProfilePage extends BasePage {

    ProfessionalButton = '//button[text()="Professional"]';

  constructor(page: Page) {
    super(page);
  }

  async verifyPage(){
    await expect(this.page.locator(this.ProfessionalButton)).toBeVisible();
  }

}