import { test, expect } from '@playwright/test';
import { PrivacyAIPage } from '../../src/pages/privacy-and-aipage';
import { LoginPage } from '../../src/pages/common/LoginPage'; //added later

test.describe('Admin - Profile Settings - Privacy & AI', () => {
  let privacyAIPage: PrivacyAIPage;


  test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      await page.goto('/');
      await loginPage.loginAsUserType('Admin');
    privacyAIPage = new PrivacyAIPage(page);
  });

  /* Scenario: Opt-out control and guidance are visible
    Then the Opt Out of AI Features control is visible
    And explanatory guidance is displayed describing which AI features are affected
    And the current opt-out state is clearly indicated*/

  test('Admin can view Privacy & AI settings', async () => {
    // Open Profile from avatar menu
    await privacyAIPage.avatarMenu.click();
    await privacyAIPage.viewProfileButton.click();

    // Close any overlays/backdrops if present
    await privacyAIPage.backdrop.click();

    // Open Privacy & AI tab
    await privacyAIPage.openPrivacyAITab(); 

    // Verify page loads
    await privacyAIPage.verifyPageLoaded();

    //code to toggle ON
     await privacyAIPage.toggleOptOut();

    // Verify Toggle works and Validate the correct/expected text displayed
      await privacyAIPage.verifyToggle();
  });

  // Scenario: Admin can change toddle and see corresponding guidance
  test('Admin can change toggle and see correct corresponding guidance', async () => {
    // Open Profile from avatar menu
    await privacyAIPage.avatarMenu.click();
    await privacyAIPage.viewProfileButton.click();

    // Close any overlays/backdrops if present
    await privacyAIPage.backdrop.click();

    // Open Privacy & AI tab
    await privacyAIPage.openPrivacyAITab(); 

    // Verify page loads
    await privacyAIPage.verifyPageLoaded();

 
     await privacyAIPage.toggleOptIn();
         
     // Verify Toggle works and Validate the correct/expected text displayed

      await privacyAIPage.verifyPageLoaded();
  // });
}); 
});