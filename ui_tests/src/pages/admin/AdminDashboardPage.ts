import { Page, expect } from '@playwright/test';
import * as env from '../../config/world';

export class AdminDashboardPage {
  readonly page: Page;


  constructor(page: Page) {
    this.page = page;
  }

  async waitForDashboard(timeout = 40000) {
    await expect(this.page.locator('h1:has-text("Admin Dashboard")')).toBeVisible({ timeout });
  }
}

