import { Page, Locator, expect } from '@playwright/test';

export class AdminCodingProblemsTopicsPage {
  readonly page: Page;

  // Tabs & headings
  readonly topicsTab: Locator;
  readonly topicsHeading: Locator;

  // Controls
  readonly selectCategoryDropdown: Locator;
  readonly addTopicButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Topics tab
    this.topicsTab = page.getByRole('tab', { name: 'Topics' });

    // Page elements
    this.topicsHeading = page.getByRole('heading', { name: 'Topics' });
    this.selectCategoryDropdown = page.getByRole('button', {
      name: 'Select Category',
    });
    this.addTopicButton = page.getByRole('button', {
      name: '+ Add Topic',
    });
  }

  /* ---------- Page Actions ---------- */

  async openTopicsTab() {
    await this.topicsTab.click();
    await expect(this.topicsHeading).toBeVisible();
  }

  async isTopicsPageVisible() {
    await expect(this.topicsHeading).toBeVisible();
  }

  async openCategoryDropdown() {
    await this.selectCategoryDropdown.click();
  }

  async selectCategory(categoryName: string) {
    await this.openCategoryDropdown();
    await this.page
      .getByRole('option', { name: categoryName })
      .click();
  }

  async isAddTopicButtonVisible() {
    await expect(this.addTopicButton).toBeVisible();
  }

  async clickAddTopic() {
    await this.addTopicButton.click();
  }
}
