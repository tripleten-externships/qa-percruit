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

  /* Scenario:  Given the admin is on the reset page
    When the admin enters an invalid email format (e.g., missing @ symbol) and clicks the "Send Reset Link" button
    Then the admin should see an error message indicating the email format is invalid     
  */
  test('Admin cannot submit email missing @ symbol and see error message', async () => {
      await logoutPage.isOnLoginPage();

      await resetPasswordPage.goToResetPasswordPage();
      await resetPasswordPage.isOnResetPage();
      await resetPasswordPage.fillEmailAndBlur('plainaddress');
      await resetPasswordPage.emailMissingSymbolError();
      await resetPasswordPage.clearEmail();
    });
  
  /* Scenario:  Given the admin is on the reset page
    When the admin enters an invalid email format (e.g., missing domain after @ symbol) and clicks the "Send Reset Link" button
    Then the admin should see an error message indicating the email format is invalid     
  */  

  test('Admin cannot submit email missing domain after @ and see specific error message', async ({page}) => {
    await logoutPage.isOnLoginPage();

    await resetPasswordPage.goToResetPasswordPage();
    await resetPasswordPage.isOnResetPage();
    await resetPasswordPage.fillEmailAndBlur('user@');  
    await resetPasswordPage.emailMissingDomainError();  
    await resetPasswordPage.clearEmail();
  });

  /* Scenario:  Given the admin is on the reset page
    When the admin enters an invalid email format (e.g., missing characters before @ symbol) and clicks the "Send Reset Link" button
    Then the admin should see an error message indicating the email format is invalid     
  */  
  test('Admin cannot submit email missing characters before @ and see specific error message', async ({page}) => {
    await logoutPage.isOnLoginPage();

    await resetPasswordPage.goToResetPasswordPage();
    await resetPasswordPage.isOnResetPage();
    await resetPasswordPage.fillEmailAndBlur('@missingusername.com');  
    await resetPasswordPage.emailMissingCharBefError();  
    await resetPasswordPage.clearEmail();
  });

  /* Scenario:  Given the admin is on the reset page
    When the admin enters an invalid email format (e.g., missing characters before @ symbol) and clicks the "Send Reset Link" button
    Then the admin should see an error message indicating the email format is invalid     
  */  
  test('Admin cannot submit invalid email and see specific error message', async ({page}) => {
    await logoutPage.isOnLoginPage();

    await resetPasswordPage.goToResetPasswordPage();
    await resetPasswordPage.isOnResetPage();
    await resetPasswordPage.fillEmailAndBlur('username@.com');  
    await resetPasswordPage.invalidEmailError();  
    await resetPasswordPage.clearEmail();
  });  

  /* Scenario:  Given the admin is on the reset page
    When the admin enters an invalid email format (e.g., missing period in domain) and clicks the "Send Reset Link" button
    Then the admin should see an error message indicating the email format is invalid     
  */    
   test('Admin cannot submit invalid email with missing period in domain and see specific error message', async ({page}) => {    
    await logoutPage.isOnLoginPage(); 

    await resetPasswordPage.goToResetPasswordPage();
    await resetPasswordPage.isOnResetPage();
    await resetPasswordPage.fillEmailAndBlur('username@domain');  
    await resetPasswordPage.emailDomainMissingPeriodError();  
    await resetPasswordPage.clearEmail();
  });

  /* Scenario:  Given the admin is on the reset page
    When the admin clicks the "Back to Sign In" button
    Then the system should navigate back to the login page */ 

  test('Back to Sign In button navigates to login page', async ({page}) => {
  await logoutPage.isOnLoginPage();

  await resetPasswordPage.goToResetPasswordPage();
  await resetPasswordPage.isOnResetPage();
  await resetPasswordPage.submitResetRequest();
  await resetPasswordPage.successMessageIsVisible();
  await resetPasswordPage.backToLogin();  
  await logoutPage.isOnLoginPage();
  });

});