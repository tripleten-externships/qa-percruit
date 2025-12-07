import { Page } from '@playwright/test';
export class DashboardPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForLoaded(): Promise<void> {
    const baseUrl = 'https://stage.tripleten.percruit.com';
    await this.page.waitForURL(`${baseUrl}/dashboard`);
    await this.page.getByText('Dashboard').waitFor().catch(() => {});
}

  async isVisible() {
    return this.page.getByText('Dashboard');
  }
}
