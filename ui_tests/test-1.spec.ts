import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('body').click();
  await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click({
    button: 'right'
  });
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('qa+100119@qaexternship.testinator.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click({
    button: 'right'
  });
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('1Passw0rd!');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Usage Metrics' }).click();
});