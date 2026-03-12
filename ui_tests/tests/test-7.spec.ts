import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('button', { name: 'Accept all cookies' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('manjula23.reddy+admin1@gmail.com');
  await page.getByRole('textbox', { name: 'user@example.com' }).press('Tab');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('M@njula888');
  await page.getByRole('textbox', { name: 'Enter your password' }).press('Enter');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Career Coach Assignments' }).click();
  await page.getByText('Current Assignments (110)StudentCareer CoachEmailAssigned').click();
  await page.getByRole('heading', { name: 'Current Assignments (110)' }).click();
  await page.locator('.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-sizeSmall').click();
  await page.getByRole('textbox', { name: 'Search assignments...' }).click();
  await page.getByRole('columnheader', { name: 'Student' }).click();
  await page.getByRole('columnheader', { name: 'Career Coach' }).click();
  await page.getByRole('columnheader', { name: 'Email' }).click();
  await page.getByRole('columnheader', { name: 'Assigned Date' }).click();
  await page.getByRole('columnheader', { name: 'Status' }).click();
  await page.getByRole('columnheader', { name: 'Actions' }).click();
  await page.getByRole('cell', { name: 'CHRISTINE NAMANYA christinemugema22+student@gmail.com' }).click();
  await page.getByRole('cell', { name: 'christine Namanya', exact: true }).click();
  await page.getByRole('cell', { name: 'christinemugema22+mentor@' }).click();
  await page.getByRole('cell', { name: '3/6/' }).click();
  await page.getByRole('cell', { name: 'active' }).first().click();
  await page.getByRole('cell', { name: 'Remove' }).first().click();
});