import { Page, Locator, expect } from '@playwright/test';

export class PrivacyAIPage {
  readonly page: Page;

  readonly privacyAITab: Locator;
  readonly sectionTitle: Locator;
  readonly optOutLabel: Locator;
  readonly optOutToggle: Locator;
  readonly descriptionText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.privacyAITab = page.getByRole('tab', { name: 'Privacy & AI' });

    this.sectionTitle = page.getByText('Privacy & AI Settings');

    this.optOutLabel = page.getByText('Opt Out of AI Features');

    // toggle near the label (robust locator)
    this.optOutToggle = this.optOutLabel.locator('..').locator('button, input, span').first();

    this.descriptionText = page.getByText('When enabled, you will not have access to AI-powered features');
  }

  async openPrivacyAITab() {
    await this.privacyAITab.click();
  }

  async verifyPageLoaded() {
    await expect(this.sectionTitle).toBeVisible();
    await expect(this.optOutLabel).toBeVisible();
    await expect(this.descriptionText).toBeVisible();
  }

  async toggleOptOut() {
    await this.optOutToggle.click();
  }
}
