import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'Enter your email' }).click({
    button: 'right'
  });
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('qa+100119@qaexternship.testinator.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click({
    button: 'right'
  });
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('1Passw0rd!');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('heading', { name: 'Admin Dashboard' }).click();
  await page.getByRole('button', { name: 'Dashboard' }).click();
  await page.getByRole('button', { name: 'All Users' }).click();
  await page.getByRole('button', { name: 'Mentors' }).click();
  await page.getByRole('button', { name: 'Dashboard' }).click();
  await page.getByRole('img', { name: 'Percruit Admin' }).click();
});