import { Page, expect } from '@playwright/test';

export class AdminDashboardPage {
  readonly page: Page;


  constructor(page: Page) {
    this.page = page;
  }

  async waitForDashboard(timeout = 40000) {
    await expect(this.page.getByRole('heading', { level: 1, name: /,\s*Admin$/ })).toBeVisible({ timeout });
  }
}

