// world.ts
// Utility functions and environment configuration for Cucumber/Playwright tests

// Load environment variables from .env file
import * as dotenv from 'dotenv';
import { setWorldConstructor, World, IWorldOptions, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';
import { ProfilePage } from '../pages/profile/ProfilePage';
import { CONFIG as DEV } from './dev.env';
import { CONFIG as STAGE } from './stage.env';
import { CONFIG as PROD } from './prod.env';

// Initialize dotenv to load environment variables
dotenv.config();

// Determine which environment config to use (default: 'dev')
const envName = process.env.ENV || 'dev';
export const ENV = getConfig(envName);

// Browser configuration from environment variables
const isHeadless = process.env.PLAYWRIGHT_HEADLESS !== 'false';
const slowMo = parseInt(process.env.PLAYWRIGHT_SLOWMO || '0', 10);

// Get the student email from environment variables
// Throws an error if not set, logs the email for debugging
export function getStudentEmail(): string {
  const email = process.env.STUDENT_EMAIL;
  if (!email) {
    throw new Error('STUDENT_EMAIL environment variable is not set.');
  }
  console.log('Using Student for testing:' + email);
  return email;
}

// Get the student password from environment variables
// Throws an error if not set
export function getStudentPassword(): string {
  const password = process.env.STUDENT_PASSWORD;
  if (!password) {
    throw new Error('STUDENT_PASSWORD environment variable is not set.');
  }
  return password;
}

// Get the mentor email from environment variables (returns empty string if not set)
export function getMentorEmail(): string {
  return process.env.MENTOR_EMAIL || '';
}

// Get the mentor password from environment variables (returns empty string if not set)
export function getMentorPassword(): string {
  return process.env.MENTOR_PASSWORD || '';
}

// Get the admin email from environment variables (returns empty string if not set)
export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || '';
}

// Get the admin password from environment variables (returns empty string if not set)
export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || '';
}

// Get the base URL for the application under test
// Uses BASE_URL env variable if set, otherwise falls back to config
export function getBaseUrl(): string {
  return process.env.BASE_URL || ENV.baseUrl;
}

// Get the teardown delay (wait time before closing browser/page)
// Uses TEARDOWN_DELAY env variable if set, otherwise falls back to config
export function getTeardownDelay(): number {
  const envDelay = process.env.TEARDOWN_DELAY;
  if (envDelay) {
    return parseInt(envDelay, 10);
  }
  return ENV.teardownDelay;
}

// Select the appropriate environment configuration object
// Accepts 'dev', 'stage', or 'prod' (case-insensitive)
export function getConfig(envName?: string) {
  switch ((envName || '').toLowerCase()) {
    case 'stage':
    case 'staging':
      return STAGE;
    case 'prod':
    case 'production':
      return PROD;
    default:
      return DEV;
  }
}

// ============================================================================
// PLAYWRIGHT WORLD SETUP
// ============================================================================

export interface CustomWorld extends World {
  browser: Browser;
  page: Page;
  pages?: {
    profile?: ProfilePage;
  };
}

class PlaywrightWorld extends World implements CustomWorld {
  browser!: Browser;
  page!: Page;
  pages?: { profile?: ProfilePage };

  constructor(options: IWorldOptions) {
    super(options);
  }

  async close() {
    await this.page?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(PlaywrightWorld);

// Set Cucumber default timeout to match Playwright timeouts
setDefaultTimeout(ENV.defaultTimeout);

// ============================================================================
// CUCUMBER HOOKS
// ============================================================================

// Before hook: Initialize browser and page before each scenario
Before(async function () {
  // If page is not initialized, create it (for direct use or fallback)
  if (!this.page) {
    this.browser = await chromium.launch({
      headless: isHeadless,
      slowMo: slowMo
    });
    this.page = await this.browser.newPage();
    await this.page.setDefaultTimeout(ENV.defaultTimeout);
    await this.page.setDefaultNavigationTimeout(ENV.navigationTimeout);
    // instantiate page objects for use in step definitions
    this.pages = {
      profile: new ProfilePage(this.page)
    };
  }
});

// After hook: Clean up browser and page after each scenario
After(async function () {
  // Wait before closing to allow for visual inspection or debugging
  const teardownDelay = getTeardownDelay();
  if (teardownDelay > 0) {
    console.log(`Waiting ${teardownDelay}ms before closing browser...`);
    await new Promise(resolve => setTimeout(resolve, teardownDelay));
  }

  if (this.page) {
    await this.page.close();
  }
  if (this.browser) {
    await this.browser.close();
  }
});