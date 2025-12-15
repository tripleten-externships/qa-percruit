import { Page } from '@playwright/test';
import { ENV } from '../../../../src/config/world';

export class DashboardPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForLoaded(): Promise<void> {
    await this.page.waitForURL(`${ENV.baseUrl}dashboard`);

    
    await this.page.getByRole('heading', { name: /dashboard/i }).waitFor();
  }

  async isVisible(): Promise<boolean> {
    return this.page.getByRole('heading', { name: /dashboard/i }).isVisible();
  }
}

