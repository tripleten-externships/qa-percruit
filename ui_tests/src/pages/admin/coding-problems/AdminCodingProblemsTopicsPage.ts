import { Page, Locator } from '@playwright/test';

export class AdminCodingProblemsTopicsPage {
  readonly page: Page;
  readonly topicsTab: Locator;
  readonly topicsTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topicsTab = page.locator('text=Topics');
    this.topicsTable = page.locator('table');
  }

  async openTopicsTab() {
    await this.topicsTab.click();
  }

  async areTopicsVisible(): Promise<boolean> {
    return await this.topicsTable.isVisible();
  }
}
