import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class ProfilePage extends BasePage {

    ProfessionalButton = '//button[text()="Professional"]';

  constructor(page: Page) {
    super(page);
  }

  async isProfessionalTabVisible(){
    await expect(this.page.getByRole('tab',{name:'Professional'})).toBeVisible();
  }
  async clickAvatar(){
    await this.page.locator('.ant-avatar').click();
  }
  async clickViewProfile(){
    await this.page.getByRole('link',{name:'View Profile'}).click();  
  }
}