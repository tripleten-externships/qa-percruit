import { test, expect } from '@playwright/test';
import { ResetPasswordPage } from '../../src/pages/common/ResetPasswordPage';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { LogoutPage } from '../../src/pages/common/LogoutPage';

test.describe('Admin - Reset Password Flow', () => {
  let resetPasswordPage: ResetPasswordPage;
  let loginPage: LoginPage;
  let logoutPage: LogoutPage;

  test.beforeEach(async ({ page, baseURL }) => {
    resetPasswordPage = new ResetPasswordPage(page);
    loginPage = new LoginPage(page);
    logoutPage = new LogoutPage(page);

    await page.goto(baseURL!);
  });

  /* Scenario: Forgot Password link redirects to reset page
    When the admin clicks the "Forgot Password" link
    Then the system should navigate to the password reset page
    And the page should display a form to enter the registered email address */

  test('Admin can navigate to reset password page', async () => {
    await logoutPage.isOnLoginPage();

    await resetPasswordPage.closeCookiesPopupIfPresent();
    await loginPage.clickForgotPassword();

    await resetPasswordPage.isOnResetPage();
    await resetPasswordPage.emailFieldIsVisible();
  });

  /* Scenario: 
    Given the admin is on the reset page
    When the admin enters a valid email and clicks the "Send Reset Link" button
    Then the admin should see a "password reset link sent" success message */

  test('Admin can submit valid email and see success message', async () => {
    await logoutPage.isOnLoginPage();

    await resetPasswordPage.goToResetPasswordPage();
    await resetPasswordPage.isOnResetPage();

    await resetPasswordPage.submitResetRequest();

    await resetPasswordPage.successMessageIsVisible();
  });

});