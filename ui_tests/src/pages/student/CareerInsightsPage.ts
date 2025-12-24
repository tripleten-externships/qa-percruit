import { Page,expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class CareerInsightsPage extends BasePage {

  CareerInsightsHeading = '//*[@id="root"]/div/main/div/div/main/div[1]/div/h5';
  PageText= '//*[@id="root"]/div/main/div/div/main/div[1]/div/p';
   
  constructor(page: Page) {
    super(page)
  }
   async verifyPage(){
        await expect(this.page.locator(this.CareerInsightsHeading)).toBeVisible();
        await expect(this.page.locator(this.PageText)).toBeVisible();
  }
}