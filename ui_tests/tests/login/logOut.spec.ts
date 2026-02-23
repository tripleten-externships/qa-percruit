import { test, expect } from '@playwright/test';
import { LogoutPage } from '../../src/pages/common/LogoutPage';
import { LoginPage } from '../../src/pages/common/LoginPage';

test.describe('Admin - Logout Flow', () => {
  let logoutPage: LogoutPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page, baseURL }) => {
    loginPage = new LoginPage(page);
    logoutPage = new LogoutPage(page);

    // Navigate to application
    await page.goto(baseURL!);

    // Login as Admin
    await loginPage.loginAsUserType('Admin');
  });

  /* Scenario: Admin successfully logs out of the Percruit website
    Given the admin is on the home page
    When the admin initiates a logout
    Then the admin should be signed out successfully
    And the login page should be displayed */

  test('Admin should be able to logout successfully', async () => {
    // Verify admin is on home/dashboard page
    await logoutPage.isOnHomePage();

    // Initiate logout
    await logoutPage.initiateLogout();

    // Verify admin is signed out
    await logoutPage.noLongerOnDashboard();

    // Verify login page is displayed
    await logoutPage.isOnLoginPage();
  });

});