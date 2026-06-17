import {Given, When, Then, Before, After} from '@cucumber/cucumber';


import {chromium, Browser, Page, expect} from '@playwright/test';

import * as env from '../../../../src/config/world';
import {LoginPage} from '../../../../src/pages/common/LoginPage';

import { AdminDashboardPage } from '../../../../src/pages/admin/AdminDashboardPage';



let adminDashboardPage: AdminDashboardPage;


Given('the user is logged in as an admin', async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.loginAsAdmin();
});

Given('the Admin Dashboard is displayed', async function () {
  const adminDashboard = new AdminDashboardPage(this.page);
  await adminDashboard.waitForPageLoad();
  await expect(this.page).toHaveURL(/dashboard/);
});

Given('the System Health Monitor card is visible', async function () {
  const systemHealthCard = this.page.getByText('System Health Monitor').locator('..');
  await expect(systemHealthCard).toBeVisible();
});

Given('the system has a response time value', async function () {
  const avgResponseTime = this.page.getByText('Avg Response Time');
  await expect(avgResponseTime).toBeVisible();
});

Then('the Avg Response Time metric is visible', async function () {
  const avgResponseTime = this.page.getByText('Avg Response Time');
  await expect(avgResponseTime).toBeVisible();
});

Then('the response time is displayed in milliseconds', async function () {
  const responseTimeValue = this.page.getByText(/\d+ms/);
  await expect(responseTimeValue).toBeVisible();
  await expect(responseTimeValue).toHaveText(/\d+ms/);
});

Then('the response time value includes the {string} unit', async function (unit: string) {
  const responseTimeValue = this.page.getByText(/\d+ms/);
  await expect(responseTimeValue).toContainText(unit);
});

Then('the response time is displayed as a numeric value', async function () {
  const responseTimeValue = this.page.getByText(/\d+ms/);
  const text = await responseTimeValue.textContent();
  const numericPart = text?.replace(/ms/g, '').trim();
  expect(Number(numericPart)).toBeGreaterThanOrEqual(0);
});

Then('the numeric value is followed by {string} unit', async function (unit: string) {
  const responseTimeValue = this.page.getByText(/\d+ms/);
  await expect(responseTimeValue).toHaveText(new RegExp(`\\d+\\s*${unit}$`));
});