import { Locator, Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class ProfilePage extends BasePage {
  readonly professionalTab: Locator;
  readonly socialLinksTab: Locator;
  readonly notificationsTab: Locator;
  readonly privacyAndAITab: Locator;
  readonly profilePhotoSection: Locator;
  readonly basicInformationSection: Locator;
  readonly aboutMeSection: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly guidanceText: Locator;
  readonly phoneNumberInput: Locator;
  readonly locationInput: Locator;
  readonly timezoneSelect: Locator;


  constructor(page: Page) {
    super(page);
    this.professionalTab = page.getByText('Professional', { exact: true });
    this.socialLinksTab = page.getByText('Social Links', { exact: true });
    this.notificationsTab = page.getByText('Notifications', { exact: true });
    this.privacyAndAITab = page.getByText('Privacy & AI', { exact: true });
    this.profilePhotoSection = page.getByText('Profile Photo', { exact: true });
    this.basicInformationSection = page.getByText('Basic Information', { exact: true });
    this.aboutMeSection = page.getByText('About Me', { exact: true });
    this.nameInput = page.getByLabel('Full Name', { exact: true });
    this.emailInput = page.getByLabel('Email', { exact: true });
    this.guidanceText = page.getByText('Uphold a professional headshot that represents you well. Recommended: Square image, at least 400x400 px', { exact: true });
    this.phoneNumberInput = page.getByLabel('Phone Number', { exact: true });
    this.locationInput = page.getByLabel('Location', { exact: true });
    this.timezoneSelect = page.getByLabel('Timezone', { exact: true });
    
  }
  async isProfessionalTabVisible(): Promise<boolean> {
    return this.professionalTab.isVisible();
  }

  async gotoProfile(): Promise<void> {
    const url = process.env.BASE_URL ? `${process.env.BASE_URL}/profile` : 'https://stage.tripleten.percruit.com/profile';
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Wait for a stable, page-specific element rather than networkidle which can hang
    try {
      await this.page.waitForSelector('text=Profile Photo', { timeout: 10000 });
    } catch (err) {
      // give a clearer error when navigation doesn't reach expected UI
      throw new Error(`Profile page did not load or expected element not found after navigating to ${url}: ${err}`);
    }
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
    return this.nameInput.inputValue();
  }

  async getEmailValue(): Promise<string> {
    return this.emailInput.inputValue();
  }

  async getTimezoneValue(): Promise<string> {
    return this.timezoneSelect.inputValue();
  }

  async isPhoneNumberEmpty(): Promise<boolean> {
    const val = await this.phoneNumberInput.inputValue();
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
    // Prefer checking native <select> options directly (works for standard selects)
    const selectHandle = await this.page.$('select[aria-label="Timezone"]');
    if (selectHandle) {
      try {
        const opts: string[] = await selectHandle.evaluate((el: HTMLSelectElement) => Array.from(el.options).map(o => (o.text || '').trim()));
        // Log options for debugging when tests run in CI or locally
        // eslint-disable-next-line no-console
        console.log('ProfilePage: timezone select options:', opts);
        const found = opts.some(o => o === optionText || o.includes(optionText));
        return Boolean(found);
      } catch (err) {
        // fall through to other checks
      }
    }

    // Fallback: try to open a combobox or check for visible option-like text
    try {
      const combo = this.page.getByRole('combobox', { name: 'Timezone' });
      if (await combo.count() > 0) {
        await combo.first().click().catch(() => undefined);
      } else {
        // attempt to click the labeled element to surface options
        await this.page.click('label:has-text("Timezone")', { timeout: 2000 }).catch(() => undefined);
      }
      // Brief wait and then check for the option text
      await this.page.waitForTimeout(300);
      return await this.page.getByText(optionText, { exact: false }).isVisible().catch(() => false);
    } catch (err) {
      return false;
    }
  }

  async isHelperTimezoneTextVisible(text: string): Promise<boolean> {
    return this.page.getByText(text, { exact: false }).isVisible();
  }

  async hasTimezoneOptionWithUTC(): Promise<boolean> {
    // 1) Check native <select> options first
    const selectHandle = await this.page.$('select[aria-label="Timezone"]');
    if (selectHandle) {
      try {
        const opts: string[] = await selectHandle.evaluate((el: HTMLSelectElement) => Array.from(el.options).map(o => (o.text || '').trim()));
        // eslint-disable-next-line no-console
        console.log('ProfilePage: timezone select options (UTC check):', opts);
        if (opts.some(o => o.includes('UTC') || o.includes('(UTC'))) return true;
      } catch (err) {
        // continue to other strategies
      }
    }

    // 2) Attempt to open common custom dropdowns/comboboxes near the timezone label
    const toggleSelectors = [
      'button[aria-haspopup="listbox"]',
      '[data-testid*="timezone"] button',
      '.react-select__indicators',
      '.select__toggle',
      '.mantine-Select-rightSection',
      '.chakra-select__menu',
      'label:has-text("Timezone")'
    ];

    for (const s of toggleSelectors) {
      try {
        const el = await this.page.$(s);
        if (el) {
          // eslint-disable-next-line no-console
          console.log('ProfilePage: attempting to click toggle', s);
          await el.click().catch(() => undefined);
          await this.page.waitForTimeout(300);
        }
      } catch (err) {
        // ignore and continue
      }
    }

    // 3) Search for option-like elements rendered by custom dropdowns
    const optionSelectors = [
      '[role="option"]',
      '[role="listbox"] [role="option"]',
      '.react-select__option',
      '.select__option',
      '.chakra-select__menu [role="option"]',
      '[data-testid*="option"]',
      '.mantine-Select-dropdown [role="option"]',
      '.ant-select-item'
    ];

    for (const sel of optionSelectors) {
      try {
        const locator = this.page.locator(sel, { hasText: 'UTC' });
        const count = await locator.count();
        if (count > 0) {
          // eslint-disable-next-line no-console
          console.log('ProfilePage: found timezone option by', sel, 'count=', count);
          return true;
        }
      } catch (err) {
        // ignore and continue
      }
    }

    // 4) Final fallback: search page text for 'UTC' or '(UTC'
    try {
      const found = await this.page.locator('text=/\bUTC\b/').count();
      if (found > 0) {
        // eslint-disable-next-line no-console
        console.log('ProfilePage: found UTC text on page; count=', found);
        return true;
      }
    } catch (err) {
      // ignore
    }

    return false;
  }

  // Debug helper: log relevant DOM around the Timezone control to assist troubleshooting
  async debugTimezoneDom(): Promise<void> {
    try {
      const select = await this.page.$('select[aria-label="Timezone"]');
      if (select) {
        const outer = await select.evaluate(el => el.outerHTML);
        // eslint-disable-next-line no-console
        console.log('DEBUG: timezone <select> outerHTML:\n', outer);
      } else {
        // log any labeled element and nearby container
        const label = await this.page.$('label:has-text("Timezone")');
        if (label) {
          const outer = await label.evaluate(el => el.outerHTML);
          // eslint-disable-next-line no-console
          console.log('DEBUG: timezone <label> outerHTML:\n', outer);
          const parent = await label.evaluateHandle(el => el.parentElement);
          if (parent) {
            const parentHtml = await parent.evaluate((el: HTMLElement) => el.outerHTML);
            // eslint-disable-next-line no-console
            console.log('DEBUG: timezone parent outerHTML snippet:\n', parentHtml.substring(0, 2000));
          }
        } else {
          const container = await this.page.$('[data-testid="timezone"]') || await this.page.$('.timezone') || await this.page.$('#timezone');
          if (container) {
            const outer = await container.evaluate(el => el.outerHTML);
            // eslint-disable-next-line no-console
            console.log('DEBUG: timezone container outerHTML:\n', outer.substring(0, 2000));
          } else {
            // eslint-disable-next-line no-console
            console.log('DEBUG: timezone elements not found by common selectors');
          }
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('DEBUG: error while dumping timezone DOM', err);
    }
  }
}

