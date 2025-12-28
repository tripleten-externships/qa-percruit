import { Page,expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class ResumeManagerPage extends BasePage {

  ResumeManagerHeading = '//*[@id="root"]/div/main/div/div/main/div[2]/div/div[1]/h4';
  UploadButton = '//*[@id="root"]/div/main/div/div/main/div[1]/div/div/div[2]/div[2]/button[1]';
   
  constructor(page: Page) {
    super(page)
  }
   async verifyPage(){
        await expect(this.page.locator(this.ResumeManagerHeading)).toBeVisible();
        await expect(this.page.locator(this.UploadButton)).toBeVisible();
  }
}