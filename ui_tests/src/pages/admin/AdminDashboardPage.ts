import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class AdminDashboardPage extends BasePage {
  readonly page: Page;

  readonly labels = {
    PROFILE_SETTINGS: 'Profile Settings',
  };

  readonly tabs = {
    PROFILE: 'Profile',
    PROFESSIONAL: 'Professional',
    SOCIAL_LINKS: 'Social Links',
    NOTIFICATIONS: 'Notification',
    PRIVACY_AI: 'Privacy & AI',
  }; 

  readonly profileSettingsHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.profileSettingsHeader = this.page.getByRole('heading', {
      name: this.labels.PROFILE_SETTINGS,
    });

  }

  // Navigate to Profile Settings Steps
  async navigateToProfileSettings(): Promise<void> {
    await this.page.getByAltText('Admin').click();
    await expect(this.page.getByRole('menuitem', { name: 'View Profile' })).toBeVisible();
    await this.page.getByRole('menuitem', { name: 'View Profile' }).click();
    await expect(this.profileSettingsHeader).toBeVisible();
  }


}
