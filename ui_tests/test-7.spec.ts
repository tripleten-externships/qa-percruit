import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByText('LoginContinue your growth journeySign InForgot password?Your data is protected').click();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('1Passw0rd!');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('qa+100119@qaexternship.testinator.com');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: '×' }).click();
  await page.getByRole('button', { name: 'Coding Problems' }).click();
});