import { Page, Locator, expect } from '@playwright/test';

export class PrivacyAIPage {
  readonly page: Page;

  readonly privacyAITab: Locator;
  readonly sectionTitle: Locator;
  readonly optOutLabel: Locator;
  // readonly optOutToggle: Locator;
  readonly descriptionText: Locator;
  readonly descriptionText2: Locator;

  readonly avatarMenu: Locator;
  readonly viewProfileButton: Locator;
  readonly backdrop: Locator;
  readonly aiToggle: Locator;

  

  constructor(page: Page) {    this.page = page;

    this.privacyAITab = page.getByRole('tab', { name: 'Privacy & AI' });
    this.sectionTitle = page.getByText('Privacy & AI Settings');
    this.optOutLabel = page.getByText('Opt Out of AI Features');
    this.descriptionText = page.getByText('When enabled, you will not have access to AI-powered features');
    this.descriptionText2 = page.getByText('AI Features Disabled: You have opted out of all AI-powered features. You can still access all other platform features.');
    this.aiToggle = page.getByRole('switch');
        // toggle near the label (robust locator)
    // this.optOutToggle = this.optOutLabel.locator('..').locator('button, input, span').first();
  
    this.avatarMenu = page.locator('.MuiAvatar-root').first();
    this.viewProfileButton = page.getByRole('menuitem', { name: 'View Profile' });
    this.backdrop = page.locator('.MuiBackdrop-root.MuiBackdrop-invisible');
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
        // If the toggle is Off, click to turn it On (opt-out)
  if (!(await this.aiToggle.isChecked())) {
    await this.optOutLabel.click();
  }}
  
   async verifyToggle() {
    await expect(this.sectionTitle).toBeVisible();
    await expect(this.optOutLabel).toBeVisible();
    await expect(this.descriptionText).toBeVisible();
    await expect(this.descriptionText2).toBeVisible();
   }

    async toggleOptIn() {
        // If the toggle is On, click to turn it Off (opt-in)
      if ((await this.aiToggle.isChecked())) {
      await this.optOutLabel.click();
   }}
  
  
}
