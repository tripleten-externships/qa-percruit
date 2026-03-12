import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {


await page.getByRole('link', { name: 'Career Coach Assignments' }).click();
await page.getByRole('link', { name: 'Career Coach Assignments' }).click();
await page.getByRole('link', { name: 'Career Coach Insights' }).click();
await page.getByRole('link', { name: 'Career Coach Assignments' }).click();
await page.getByRole('combobox', { name: 'Select Students' }).click();
await page.getByRole('combobox', { name: 'Select Students' }).fill('manju');
await page.getByRole('checkbox').check();
await page.locator('div').filter({ hasText: 'Career Coach-Student' }).nth(4).click();
await page.getByRole('combobox', { name: 'Career Coach' }).click();
await page.getByRole('option', { name: 'Manjula Mentor 2 (manjula23.' }).click();
await page.getByText('student selected:').click();
await page.getByText('• Manjula student10 (').click();

});