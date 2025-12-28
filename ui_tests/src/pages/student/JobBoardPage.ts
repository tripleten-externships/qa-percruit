import { Page,expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class JobBoardPage extends BasePage {

  JobBoardSearchEditBox = '//input[@placeholder="Search pages..."]';
  SearchForJobsEditBox = '//input[@placeholder="Search for jobs by title, skills, or company"]';
   
  constructor(page: Page) {
    super(page)
  }
   async verifyPage(){
        await expect(this.page.locator(this.JobBoardSearchEditBox)).toBeVisible();
        await expect(this.page.locator(this.SearchForJobsEditBox)).toBeVisible();
  }
}