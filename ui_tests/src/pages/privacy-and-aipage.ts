import { expect, Locator, Page } from '@playwright/test';

export class PrivacyAIPage {
  readonly page: Page;
  readonly avatarMenu: Locator;
  readonly viewProfileButton: Locator;

  readonly profileSettingsHeading: Locator;
  readonly profileTab: Locator;
  readonly professionalTab: Locator;
  readonly socialLinksTab: Locator;
  readonly notificationsTab: Locator;
  readonly privacyAITab: Locator;

  constructor(page: Page) {
    this.page = page;

    this.avatarMenu = page.getByText(/Ashley Cichy/i).first();
    this.viewProfileButton = page.getByText('View Profile').first();

    this.profileSettingsHeading = page.getByRole('heading', {
      name: /Profile Settings/i,
    });

    this.profileTab = page.getByText(/^Profile$/i).first();
    this.professionalTab = page.getByText(/^Professional$/i).first();
    this.socialLinksTab = page.getByText(/^Social Links$/i).first();
    this.notificationsTab = page.getByText(/^Notifications$/i).first();

    this.privacyAITab = page
      .getByRole('tab', { name: /Privacy\s*(?:&|and)\s*AI/i })
      .or(page.getByRole('button', { name: /Privacy\s*(?:&|and)\s*AI/i }))
      .or(page.getByText(/Privacy\s*(?:&|and)\s*AI/i))
      .first();
  }

  async openPrivacyAITab() {
    await expect(this.privacyAITab).toBeVisible({ timeout: 15000 });
    await this.privacyAITab.click();
  }

  async verifyPageLoaded() {
    await expect(this.profileSettingsHeading).toBeVisible();
  }
}