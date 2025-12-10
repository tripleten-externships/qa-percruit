import { Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class ProfilePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async gotoProfile(): Promise<void> {
    await this.page.goto(process.env.BASE_URL ? `${process.env.BASE_URL}/profile` : 'https://stage.tripleten.percruit.com/profile');
    await this.waitForPageLoad();
  }

  async isProfileTabActive(): Promise<boolean> {
    const tab = this.page.getByRole('tab', { name: 'Profile' });
    const attr = await tab.getAttribute('aria-selected');
    return attr === 'true';
  }

  async areTabsVisible(names: string[]): Promise<boolean> {
    const checks = names.map(name => this.page.getByText(name, { exact: true }).isVisible());
    const results = await Promise.all(checks);
    return results.every(Boolean);
  }

  async areSectionsVisible(names: string[]): Promise<boolean> {
    const checks = names.map(name => this.page.getByText(name, { exact: true }).isVisible());
    const results = await Promise.all(checks);
    return results.every(Boolean);
  }

  async isProfilePhotoVisible(): Promise<boolean> {
    return this.page.getByText('Profile Photo', { exact: true }).isVisible();
  }

  async getDisplayedName(): Promise<string> {
    return this.page.inputValue('input[aria-label="Full Name"]');
  }

  async getEmailValue(): Promise<string> {
    return this.page.inputValue('input[aria-label="Email"]');
  }

  async getTimezoneValue(): Promise<string> {
    return this.page.inputValue('select[aria-label="Timezone"]');
  }

  async isPhoneNumberEmpty(): Promise<boolean> {
    const val = await this.page.inputValue('input[aria-label="Phone Number"]');
    return val === '';
  }

  async isTextVisible(text: string): Promise<boolean> {
    return this.page.getByText(text, { exact: true }).isVisible();
  }

  async areLabelsVisible(labels: string[]): Promise<boolean> {
    const checks = labels.map(label => this.page.getByLabel(label).isVisible());
    const results = await Promise.all(checks);
    return results.every(Boolean);
  }

  async isTimezoneOptionVisible(optionText: string): Promise<boolean> {
    // open select and check option text
    await this.page.click('select[aria-label="Timezone"]');
    return this.page.getByText(optionText, { exact: false }).isVisible();
  }

  async isHelperTimezoneTextVisible(text: string): Promise<boolean> {
    return this.page.getByText(text, { exact: false }).isVisible();
  }
}
