import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('cheyannejaileen16+admin@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('Externship22');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('heading', { name: 'Admin Dashboard' }).click();
  await page.getByRole('button', { name: 'Mentors' }).click();
  await page.getByRole('heading', { name: 'Mentors (63)' }).click();
  await page.getByRole('textbox', { name: 'Search mentors by name, email' }).click();
  await page.getByRole('textbox', { name: 'Search mentors by name, email' }).fill('jen');
  await page.getByRole('heading', { name: 'No mentors found' }).click();
  await page.getByRole('textbox', { name: 'Search mentors by name, email' }).click();
  await page.getByRole('textbox', { name: 'Search mentors by name, email' }).fill('roo');
});