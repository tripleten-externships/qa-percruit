import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('1Passw0rd!');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('qa+100119@qaexternship.testinator.com');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Coding Problems' }).click();
  await page.getByRole('tab', { name: 'Activities' }).click();
  await page.getByRole('combobox').first().click();
  await page.getByRole('option', { name: 'Test' }).click();
  await page.getByRole('combobox').nth(1).click();
  await page.getByRole('option', { name: 'Ultramarine' }).click();
  await page.getByRole('combobox').nth(2).click();
  await page.getByRole('option', { name: 'The Warp' }).click();
});