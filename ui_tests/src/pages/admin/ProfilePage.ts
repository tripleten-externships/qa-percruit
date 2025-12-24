import { Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import * as env from '../../config/world';

export class ProfilePage extends BasePage {
  readonly PROFESSIONAL_SECTION = '//h2[text()="Professional Information"]';

  constructor(page: Page) {
    super(page);
  }

  async gotoProfile(): Promise<void> {
    const path = 'settings/profile';
    const url = new URL(path, env.getBaseUrl()).toString();

    // 1) Try a standard navigation
    try {
      await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 8000 });
      const visible = await this.waitForProfessionalSection(3000).catch(() => false);
      if (visible) return;
    } catch (e) {
      // ignore and try other strategies
    }

    // 2) Try clicking a link or menu item that leads to profile (client-side routing)
    try {
      const linkSelectors = [`a[href$="/${path}"i]`, `a[href*="/profile"i]`, 'a:has-text("Profile")', 'button:has-text("Profile")'];
      for (const sel of linkSelectors) {
        const link = this.page.locator(sel).first();
        if (await link.count() > 0) {
          await link.scrollIntoViewIfNeeded().catch(() => {});
          await link.click({ timeout: 3000 }).catch(() => {});
          const ok = await this.waitForProfessionalSection(3000).catch(() => false);
          if (ok) return;
        }
      }
    } catch (e) {
      // continue
    }

    // 3) Force client-side navigation using history API (for SPA routers)
    try {
      await this.page.evaluate((p) => {
        try {
          window.history.pushState({}, '', '/' + p);
          window.dispatchEvent(new PopStateEvent('popstate'));
        } catch (err) {
          // swallow
        }
      }, path);
      const ok = await this.waitForProfessionalSection(3000).catch(() => false);
      if (ok) return;
    } catch (e) {
      // final fallback: ensure we attempted direct goto
      await this.page.goto(url).catch(() => {});
    }
  }

  async openProfessionalTab(): Promise<boolean> {
    const selectors = [
      'role=tab[name="Professional Information"]',
      'role=tab[name="Professional"]',
      'button:has-text("Professional Information")',
      'button:has-text("Professional")',
      'a:has-text("Professional Information")',
      'a:has-text("Professional")',
      `xpath=${this.PROFESSIONAL_SECTION}`
    ];

    for (const sel of selectors) {
      try {
        const loc = this.page.locator(sel).first();
        await loc.waitFor({ state: 'visible', timeout: 3000 });
        await loc.scrollIntoViewIfNeeded().catch(() => {});
        await loc.click({ timeout: 4000 });
        const ok = await this.page.locator(`xpath=${this.PROFESSIONAL_SECTION}`).first().waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
        if (ok) return true;
      } catch (e) {
        // continue
      }
    }
    return false;
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return this.page.locator(selector).first().isVisible().catch(() => false);
  }

  async waitForProfessionalSection(timeout = 5000): Promise<boolean> {
    return this.page.locator(`xpath=${this.PROFESSIONAL_SECTION}`).first().waitFor({ state: 'visible', timeout }).then(() => true).catch(() => false);
  }
}
