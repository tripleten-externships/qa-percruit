import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('manjula23.reddy+admin1@gmail.com');
  await page.getByRole('textbox', { name: 'user@example.com' }).press('Tab');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('M@njula888');
  await page.getByRole('textbox', { name: 'Enter your password' }).press('Enter');
  await page.getByRole('button', { name: 'Accept all cookies' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Career Coach Assignments' }).click();
  await page.getByRole('combobox', { name: 'Select Students' }).click();
  await page.getByRole('combobox', { name: 'Select Students' }).fill('manjula23');
  await page.getByRole('option', { name: 'manjula23.reddy+studentbulk2@' }).getByRole('checkbox').check();
  await page.getByText('Create New AssignmentSelect').click();
  await page.getByRole('option', { name: 'J Manuel M1 (pedrazar+mentor1' }).press('Escape');
  await page.getByRole('combobox', { name: 'Career Coach' }).click();
  await page.getByRole('option', { name: 'Manjula Mentor 2 (manjula23.' }).click();
  await page.getByRole('button', { name: 'Create Assignment' }).click();
  await page.getByRole('button', { name: 'Create Assignment' }).click();
});