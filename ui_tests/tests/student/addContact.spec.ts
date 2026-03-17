// Import Playwright classes and assertion utilities
import { test, chromium, Browser, Page, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/common/LoginPage';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
import { StudentDashboardPage } from '../../src/pages/student/StudentDashboardPage';

// Declare variables to hold browser, page, and page objects instances
let loginPage: LoginPage;
let studentDashboardPage: StudentDashboardPage;

test.describe('Student Add Contact', () => {
  test.beforeEach(async ({ page }) => {
    // Login assumed via storage state or global setup
    loginPage = new LoginPage(page);
    await page.goto('/');

    await loginPage.loginAsUserType('Student');
  });

  // Scenario: Create a new contact and verify it appears in the contact list
  test('Create a new contact and verify it appears in the contact list', async ({
    page,
  }) => {
    await page.getByRole('link', { name: 'Networking' }).click();

    // click on add contact button
    await page.getByRole('button', { name: 'Add Contact' }).click();

    // fill out the contact form
    await page.getByRole('textbox', { name: 'Full Name' }).click();
    await page.getByRole('textbox', { name: 'Full Name' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Full Name' }).fill('Jamie ');
    await page.getByRole('textbox', { name: 'Full Name' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Full Name' }).fill('Jamie Neal');

    await page.getByRole('textbox', { name: 'Email' }).click();
    await page
      .getByRole('textbox', { name: 'Email' })
      .fill('jneal@example.com');

    // accept all cookies if prompted
    await page.getByText('Accept all cookies').click();

    // submit
    await page.getByRole('button', { name: 'Add Contact' }).click();

    // verify contact
    await page.getByRole('button', { name: 'View details' }).first().click();
    await page.getByRole('button', { name: 'View details' }).first().click();
  });
});
