import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  //stage.tripleten.percruit.com/networkingawait page.goto('https://stage.tripleten.percruit.com/');
  https: await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page
    .getByRole('textbox', { name: 'user@example.com' })
    .fill('amckinley00+student@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page
    .getByRole('textbox', { name: 'Enter your password' })
    .fill('shall');
  await page
    .getByRole('textbox', { name: 'Enter your password' })
    .press('CapsLock');
  await page
    .getByRole('textbox', { name: 'Enter your password' })
    .fill('shallNotpass2026?!');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.goto('https://stage.tripleten.percruit.com/dashboard');
  await page.getByRole('link', { name: 'Networking' }).click();
  await page.getByRole('button', { name: 'Add Contact' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Full Name' }).fill('Jamie ');
  await page.getByRole('textbox', { name: 'Full Name' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Full Name' }).fill('Jamie Neal');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('jneal@example.com');
  await page.getByText('Accept all cookies').click();
  await page.getByRole('button', { name: 'Add Contact' }).click();
  await page.getByRole('button', { name: 'View details' }).first().click();
  await page.getByRole('button', { name: 'View details' }).first().click();
});
