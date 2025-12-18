import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click({
    button: 'right'
  });
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('qa+100119@qaexternship.testinator.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click({
    button: 'right'
  });
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('1Passw0rd!');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiAvatar-fallback').first().click();
  await page.getByRole('menuitem', { name: 'View Profile' }).click();
  await page.locator('.MuiBackdrop-root.MuiBackdrop-invisible').click();
  await page.getByRole('tab', { name: 'Notifications' }).click();
  await page.getByRole('button', { name: '×' }).click();
  await page.getByRole('switch', { name: 'Message Notifications Receive' }).check();
  await page.getByRole('switch', { name: 'Message Notifications Receive' }).uncheck();
  await page.getByRole('switch', { name: 'Message Notifications Receive' }).check();
  await page.getByText('All changes saved').click();
  await page.getByRole('switch', { name: 'Message Notifications Receive' }).uncheck();
  await page.getByRole('switch', { name: 'Message Notifications Receive' }).check();
  await page.getByRole('switch', { name: 'Message Notifications Receive' }).uncheck();
  await page.getByRole('switch', { name: 'Message Notifications Receive' }).check();
  await page.getByRole('switch', { name: 'Message Notifications Receive' }).uncheck();
  await page.getByRole('switch', { name: 'Message Notifications Receive' }).check();
  await page.getByRole('switch', { name: 'Message Notifications Receive' }).uncheck();
  await page.getByRole('switch', { name: 'Message Notifications Receive' }).check();
  await page.getByRole('switch', { name: 'Message Notifications Receive' }).uncheck();
});