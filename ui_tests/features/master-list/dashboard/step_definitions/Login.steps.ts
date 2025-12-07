import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../Pages/LoginPage';

Given('the admin is on the login page', async function () {
  const baseUrl = 'https://stage.tripleten.percruit.com';

  const page = new LoginPage(this.page);
  await page.gotoLoginPage();
});

When('the admin logs in with valid credentials', async function () {
  const adminEmail = process.env.ADMIN_EMAIL || 'ebc951+admin@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'NotSoLittle1';

  const page = new LoginPage(this.page);
  await page.loginAsAdmin(adminEmail, adminPassword);
});
