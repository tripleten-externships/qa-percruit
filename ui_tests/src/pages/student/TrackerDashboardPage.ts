import { Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';

// <span class="ant-menu-title-content">Interview Study</span>
// <span class="ant-menu-title-content">Job Board</span>

export class TrackerDashboardPage extends BasePage {
  

  constructor(page: Page) {
    super(page);
  }

  async verifyPage(){
    await expect(this.page.locator('text=Tracker Dashboard')).toBeVisible();
  }

}