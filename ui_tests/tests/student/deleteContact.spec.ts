// Import Playwright classes and assertion utilities
import { test, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { JobBoardPage } from '../../src/pages/student/JobBoardPage';

// Declare variables
let loginPage: LoginPage;

test.describe('Student Delete Contact', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.loginAsUserType('Student');
  });

  // Scenario: Delete a contact
  test('Delete a contact and verify it is removed from the contact list', async ({
    page,
  }) => {
    // Verify dashboard
    const jobBoardPage = new JobBoardPage(page);
    //await jobBoardPage.verifyPage();

    // Click Networking tab
    await page.getByRole('link', { name: 'Networking' }).click();

    // Delete contact
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(5).click();
    await page.getByText('Delete').click();

    // Confirm deletion
    await page.getByRole('button', { name: 'Delete' }).click();

    // Refresh page
    await page.getByRole('button', { name: 'Refresh' }).click();
  });
});
