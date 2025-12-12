// Step Definitions for Dashboard Load Feature
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { DashboardPage } from '../Pages/Dashboard.Page';
import { ENV } from '../../../../src/config/world';

// Admin exists in system
Given('a registered admin', async function () {
});

// Navigate to login page
Given('The admin is on the login page', async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.gotoLoginPage();
});

// Log in using valid ENV credentials
When('they log in with valid credentials', async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.loginAsAdmin(process.env.ADMIN_EMAIL || '', process.env.ADMIN_PASSWORD || '');
});

// Verify redirect to dashboard
Then('they should be redirected to their dashboard', async function () {
  await expect(this.page).toHaveURL(`${ENV.baseUrl}dashboard`);
});


// Dashboard should display expected sections
Then('see the dashboard loads correctly', async function () {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.waitForLoaded();

  await expect(this.page.getByText('Total Users')).toBeVisible();
  await expect(this.page.getByText('Active This Week')).toBeVisible();
  await expect(this.page.getByText('Active Mentors')).toBeVisible();
  await expect(this.page.getByText('New This Week')).toBeVisible();
});
