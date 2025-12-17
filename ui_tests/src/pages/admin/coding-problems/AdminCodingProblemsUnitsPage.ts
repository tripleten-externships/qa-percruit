import { Page, Locator, expect } from '@playwright/test';

export class AdminCodingProblemsUnitsPage {
  readonly page: Page;

  // Tabs & heading
  readonly unitsTab: Locator;
  readonly unitsHeading: Locator;

  // Filters
  readonly categoryDropdown: Locator;
  readonly topicDropdown: Locator;

  // Buttons
  readonly addUnitButton: Locator;

  // Content area
  readonly unitsContent: Locator;

  constructor(page: Page) {
    this.page = page;

    // Tabs
    this.unitsTab = page.getByRole('tab', { name: 'Units' });

    // Heading
    this.unitsHeading = page.getByRole('heading', { name: 'Units' });

    // Dropdowns
    this.categoryDropdown = page.getByLabel('Category');
    this.topicDropdown = page.getByLabel('Topic');

    // Button
    this.addUnitButton = page.getByRole('button', { name: 'Add Unit' });

    // Main units area (safe for empty & non-empty states)
    this.unitsContent = page.locator('main');
  }

  /* ---------- Actions ---------- */

  async openUnitsTab() {
    await this.unitsTab.click();
    await expect(this.unitsHeading).toBeVisible();
  }

  async verifyUnitsPageLoaded() {
    await expect(this.categoryDropdown).toBeVisible();
    await expect(this.topicDropdown).toBeVisible();
    await expect(this.addUnitButton).toBeVisible();
  }
}
