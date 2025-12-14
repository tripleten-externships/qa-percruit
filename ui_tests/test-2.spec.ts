import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('heading', { name: 'Welcome to Percruit' }).click();
  await page.getByRole('button', { name: '×' }).click();
  await page.getByRole('button', { name: 'Forgot password?' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('cheyannejaileen16+admin@gmail.com');
  await page.getByRole('button', { name: 'Send Reset Link' }).click();
  await page.getByText('Password reset link sent').click();
});