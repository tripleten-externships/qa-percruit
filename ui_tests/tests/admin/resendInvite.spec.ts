import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/common/LoginPage';
import * as env from '../../src/config/world';

test('Admin can resend a pending invitation', async ({ page }) => {

  const loginPage = new LoginPage(page);

  const testEmail = `testuser${Date.now()}@example.com`;

  await page.goto(env.getBaseUrl());

  // login
  await loginPage.loginAsUserType('Admin');

  // go to All Users
  await page.getByRole('link', { name: 'All Users' }).click();

  // invite user
  await page.getByRole('button', { name: 'Invite User' }).click();

  await page.getByLabel('Full Name').fill('Test User');
await page.getByLabel('Email Address').fill(testEmail);

  await page.getByRole('button', { name: 'Send Invitation' }).click();

   // refresh list
  await page.locator('button:has-text("Refresh")').click();
     
// go to pending invites
  await page.locator('text=Pending Invites').click();

    // search invited email
  await page.getByPlaceholder('Search').fill(testEmail);

  // resend invite
  await page.getByRole('button', { name: 'Resend' }).click();

  // verify toast message
  await expect(
    page.getByText(`Invitation resent to ${testEmail}`)
  ).toBeVisible();

});

