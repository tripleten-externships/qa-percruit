import { test, expect } from '@playwright/test';
import { LogoutPage } from '../../src/pages/common/LogoutPage';
import { LoginPage } from '../../src/pages/common/LoginPage';

test.describe('Student - Logout Flow', () => {
  let logoutPage: LogoutPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page, baseURL }) => {
    loginPage = new LoginPage(page);
    logoutPage = new LogoutPage(page);

    // Navigate to application
    await page.goto(baseURL!);

    // Login as Student
    await loginPage.loginAsUserType('Student');
  });

  /* Scenario: Student successfully logs out of the Percruit website
    Given the student is on the home page
    When the student initiates a logout
    Then the student should be signed out successfully
    And the login page should be displayed */

  test('Student should be able to logout successfully', async () => {
    // Verify student is on home/dashboard page
    await logoutPage.isOnHomePage();

    // Initiate logout
    await logoutPage.initiateLogout();

    // Verify student is signed out
    await logoutPage.noLongerOnDashboard();

    // Verify login page is displayed
    await logoutPage.isOnLoginPage();
  });
});
