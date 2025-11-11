import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';

declare global {
  var page: Page | undefined;
}

let browser: Browser;

Before(async function () {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  global.page = await context.newPage();    // <-- assign to global.page
});

After(async function () {
  await browser.close();
  global.page = undefined;                 // <-- clear global.page
});


Then('they should see a message saying {string} at the top', async function () {
  await global.page!.getByRole('heading', { name: 'Admin Dashboard' }).click();
});

Then('they should see the Usage Analytics section', async function () {
  await global.page!.getByRole('heading', { name: 'Usage Analytics' }).click();
});

Then('they should see the System Health Monitor section', async function () {
  await global.page!.getByRole('heading', { name: 'System Health Monitor' }).click();
});

Then('they should see the Security Center section', async function () {
  await global.page!.getByRole('heading', { name: 'Security Center' }).click();
});