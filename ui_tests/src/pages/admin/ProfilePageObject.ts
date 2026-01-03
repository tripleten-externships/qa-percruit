import { Page, Locator } from '@playwright/test';
import { ProfilePage } from './ProfilePage';
import * as env from '../../config/world';

export class ProfilePageObject {
  readonly page: Page;
  readonly profile: ProfilePage;

  constructor(page: Page) {
    this.page = page;
    this.profile = new ProfilePage(page);
  }

  // Navigate directly to the canonical profile URL with the professional tab query
  // then ensure the Professional section is visible and stable.
  async openProfessional(timeout = 30000): Promise<void> {
    const target = new URL('profile?tab=professional', env.getBaseUrl()).toString();
    try {
      // Install an init-script lock before navigating so it runs during page load
      try { await this.profile.addPersistentLockInit().catch(() => {}); } catch (e) {}
      await this.page.goto(target, { waitUntil: 'domcontentloaded', timeout: 8000 }).catch(() => {});
    } catch (e) {}
    // primary enforcement in POM
    await this.profile.ensureOnProfessionalTab(timeout);
    try {
      await this.page.waitForURL(/profile.*tab=professional/, { timeout: 5000 }).catch(() => {});
    } catch (e) {}
  }

  // Common locators for assertions or interactions
  fieldOfInterest(): Locator { return this.page.locator('input[name="fieldOfInterest"]'); }
  skills(): Locator { return this.page.locator('textarea[name="skills"]'); }
  experience(): Locator { return this.page.locator('textarea[name="experience"]'); }
  education(): Locator { return this.page.locator('textarea[name="education"]'); }

  // Convenience checks
  async isProfessionalVisible(timeout = 5000): Promise<boolean> {
    return this.profile.waitForProfessionalSection(timeout).catch(() => false);
  }

  // Tear down any locks/guards this POM may have installed
  async clearLocks(): Promise<void> {
    try { await this.profile.clearProfileLock().catch(() => {}); } catch (e) {}
    try { await this.profile.clearProfileGuard().catch(() => {}); } catch (e) {}
  }
}

export default ProfilePageObject;
