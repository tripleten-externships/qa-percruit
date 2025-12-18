import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('.MuiAvatar-root').first().click();
  await page.getByRole('menuitem', { name: 'View Profile' }).click();
  await page.getByRole('menuitem', { name: 'View Profile' }).click();
});