import { test, expect } from '@playwright/test';
import { PrivacyAIPage } from '../../src/pages/privacy-and-aipage';
import { LoginPage } from '../../src/pages/common/LoginPage';

test.describe('Admin - Profile Settings - Privacy & AI', () => {
  let privacyAIPage: PrivacyAIPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.loginAsUserType('Admin');

    privacyAIPage = new PrivacyAIPage(page);
  });

  async function openProfileSettings() {
    await privacyAIPage.avatarMenu.click();
    await privacyAIPage.viewProfileButton.click();

    await expect(privacyAIPage.profileSettingsHeading).toBeVisible({
      timeout: 15000,
    });
  }

  test('Admin can open Profile Settings', async () => {
    await openProfileSettings();

    await expect(privacyAIPage.profileTab).toBeVisible();
    await expect(privacyAIPage.professionalTab).toBeVisible();
    await expect(privacyAIPage.socialLinksTab).toBeVisible();
    await expect(privacyAIPage.notificationsTab).toBeVisible();
  });

  test('Privacy & AI tab is not currently available for Admin', async ({ page }) => {
    await openProfileSettings();

    await expect(
      page.getByText(/Privacy\s*(?:&|and)\s*AI/i)
    ).toHaveCount(0);
  });
});