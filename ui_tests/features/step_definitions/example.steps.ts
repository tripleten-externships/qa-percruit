import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';

let browser: Browser;
let page: Page;

Before(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
});

After(async () => {
  await browser.close();
});

Given('I am on the Playwright homepage', async () => {
  await page.goto('https://playwright.dev/');
});

When('I click the "Get started" link', async () => {
  await page.getByRole('link', { name: 'Get started' }).click();
});

Then('I should be on the "Introduction" page', async () => {
  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible();
  await expect(page).toHaveURL(/.*intro/);
});
