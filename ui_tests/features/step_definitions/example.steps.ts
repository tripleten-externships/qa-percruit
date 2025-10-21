import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv'; // 1. Import dotenv

dotenv.config(); // 2. Load the .env file (or environment variables)

// --- Your existing code ---
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
  // 3. You can now access your secrets like this:
  const username = process.env.LOGIN_USERNAME;
  const password = process.env.LOGIN_PASSWORD;

  // You can print them to check (remove this later)
  console.log(`Using username: ${username}`);
  
  // Example of using them (uncomment when you have a login test)
  // await page.getByLabel('Username').fill(username);
  // await page.getByLabel('Password').fill(password);
  
  await page.getByRole('link', { name: 'Get started' }).click();
});

Then('I should be on the "Introduction" page', async () => {
  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible();
  await expect(page).toHaveURL(/.*intro/);
});
