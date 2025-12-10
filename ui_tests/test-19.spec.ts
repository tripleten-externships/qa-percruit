import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...
  await page.locator('body').click();
  await page.locator('body').press('Enter');
  await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('qa+100119@qaexternship.testinator.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('1Passw0rd!');
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).press('Enter');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: '×' }).click();
  await page.getByRole('button', { name: 'Coding Problems' }).click();
  await page.getByRole('tab', { name: 'Activities' }).click();
  await page.getByRole('combobox').first().click();
  await page.locator('.MuiBox-root.css-19kzrtu').click();
  await page.getByRole('option', { name: 'TypeScript' }).click();
  await page.getByRole('combobox').nth(1).click();
  await page.getByRole('option', { name: 'Sample Topic' }).click();
  await page.getByRole('combobox').nth(2).click();
  await page.getByRole('option', { name: 'unit' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('.MuiBox-root.css-1utx3w7').click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).press('Enter');
});