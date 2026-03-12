import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/common/LoginPage';
import * as env from '../../src/config/world';



test.describe('Admin Login Flow', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    const loginPage = new LoginPage(page);
    await page.goto(baseURL!);
    await loginPage.loginAsUserType('Admin');
    await loginPage.isOnHomePage();
  });

  test('Admin should land on dashboard', async ({ page }) => {
    await expect(page).toHaveURL(/dashboard/);
  });
});

test.describe('Mentor Login Flow', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    const loginPage = new LoginPage(page);
    await page.goto(baseURL!);
    await loginPage.loginAsUserType('Mentor');
    await loginPage.isOnHomePage();
  });

  test('Mentor should land on dashboard', async ({ page }) => {
    await expect(page).toHaveURL(/dashboard/);
  });
});

test.describe('Student Login Flow', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    const loginPage = new LoginPage(page);
    await page.goto(baseURL!);
    await loginPage.loginAsUserType('Student');
    await loginPage.isOnHomePage();
  });

  test('Student should land on dashboard', async ({ page }) => {
    await expect(page).toHaveURL(/dashboard/);
  });
});

test.describe('Invalid Login Tests', () => {
  test('Should not be able to login with valid email and invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(env.getBaseUrl());
    await loginPage.enterEmail(env.getAdminEmail());
    await loginPage.enterPassword('invalidPassword');
    await loginPage.clickSignIn();
    await expect(loginPage.INVALID_CREDENTIALS_ERROR_LOCATOR).toBeVisible();
});

test('Should not be able to login with invalid email and valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(env.getBaseUrl());
    await loginPage.enterEmail('invalid@example.com');
    await loginPage.enterPassword(env.getAdminPassword());
    await loginPage.clickSignIn();
    await expect(loginPage.INVALID_CREDENTIALS_ERROR_LOCATOR).toBeVisible();
});

test('Should not be able to login with invalid email and invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(env.getBaseUrl());
    await loginPage.enterEmail('invalid@example.com');
    await loginPage.enterPassword('invalidPassword');
    await loginPage.clickSignIn();
    await expect(loginPage.INVALID_CREDENTIALS_ERROR_LOCATOR).toBeVisible();
});
});
