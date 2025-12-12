// login.steps.ts
// Step definitions for logging in as an admin

import { Given, When } from '@cucumber/cucumber';
import { Page } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';

interface WorldWithPage {
  page: Page;
}

// Navigate the admin to the login page using the LoginPage object
Given(
  'the admin is on the login page',
  async function (this: WorldWithPage) {
    const loginPage = new LoginPage(this.page);
    await loginPage.gotoLoginPage();
  },
);


When(
  'the admin logs in with valid credentials',
  async function (this: WorldWithPage) {
  
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error(
        'ADMIN_EMAIL or ADMIN_PASSWORD environment variables are not set.',
      );
    }

    // Reuse the shared LoginPage object to perform the login
    const loginPage = new LoginPage(this.page);
    await loginPage.loginAsAdmin(adminEmail, adminPassword);
  },
);

