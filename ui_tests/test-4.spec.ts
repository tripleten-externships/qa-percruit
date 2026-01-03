import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('cheyannejaileen16+admin@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('Externshipp22');
  await page.getByRole('button', { name: 'toggle password visibility' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('Externship22');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('.MuiStack-root').click();
  await page.getByRole('button', { name: 'Mentors' }).click();
  await page.getByRole('textbox', { name: 'Search mentors by name, email' }).click();
  await page.getByRole('textbox', { name: 'Search mentors by name, email' }).fill('jon');
  await page.locator('.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.css-5rbdhj').first().click();
  await page.locator('.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-row.MuiGrid-spacing-xs-3.css-177xvbk > div:nth-child(2) > .MuiPaper-root').click();
  await page.locator('.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-row.MuiGrid-spacing-xs-3.css-177xvbk > div:nth-child(3) > .MuiPaper-root').click();
  await page.locator('.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-row.MuiGrid-spacing-xs-3.css-177xvbk > div:nth-child(4) > .MuiPaper-root').click();
  await page.getByRole('textbox', { name: 'Search mentors by name, email' }).click();
  await page.getByRole('textbox', { name: 'Search mentors by name, email' }).fill('roo');
});