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
  await page.locator('div').filter({ hasText: /^Select Students$/ }).click();
  await page.getByText('young.hui.y+student4@gmail.com').click();
  await page.locator('form').click();
  await page.getByRole('option', { name: 'Manjula Mentor 2 (manjula23.' }).click();
  await page.getByText('1 student selected', { exact: true }).click();
  await page.getByRole('button', { name: 'Create Assignment' }).click();
  await page.getByText('Career Coach Assignment created successfully. Both student and coach have been').click();
  await page.getByRole('textbox', { name: 'Search assignments...' }).click();
  await page.getByRole('textbox', { name: 'Search assignments...' }).fill('');
  await page.getByText('Chandler Bing').click();
  await page.getByText('young.hui.y+student4@gmail.com').click();
  await page.getByRole('cell', { name: 'Chandler Bing young.hui.y+' }).click();
  await page.getByRole('cell', { name: 'Manjula Mentor' }).first().click();
  await page.getByRole('cell', { name: 'manjula23.reddy+mentor2@gmail' }).first().click();
  await page.getByRole('cell', { name: '3/10/' }).first().click();
  await page.getByRole('cell', { name: 'active' }).first().click();
  
  await page.getByText('manjula23.reddy+mentor2@gmail').first().click();  
  await page.getByText('Manjula Mentor').first().click();
  await page.getByText('manjula23.reddy+mentor2@gmail').first().click();
  await page.getByText('3/10/').first().click();
  //REmove assignment
  await page.getByRole('cell', { name: 'Remove' }).first().click();
  await page.getByRole('row', { name: 'Manjula student10 manjula23.' }).getByRole('button').click();
  await page.getByText('Career Coach Assignment removed successfully').click();
});