// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect, BrowserContext } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';

When('the Admin navigates to the Coding Problems page', async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  await this.page.getByRole('button', { name: 'Coding Problems'}).click();
  await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  //await expect(this.page.getByRole('heading', { name: 'Coding Practice Administration' })).toBeVisible();
  await expect(this.page.locator('//h4[text()="Coding Practice Administration"]')).toBeVisible();
});

Then('the Admin should see all existing coding problems grouped by category', async function () {
  const categoryHeadings = this.page.locator('h6.MuiTypography-h6');
  await expect(categoryHeadings.first()).toBeVisible();
  // Log or count how many categories are visible
  const count = await categoryHeadings.count();
  console.log(`✅ ${count} categories are visible on the Categories tab.`);
  // Optional: assert that at least one category exists
  expect(count).toBeGreaterThan(0)
});