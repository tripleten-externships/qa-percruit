import {Given, When, Then} from '@cucumber/cucumber';
import { expect } from 'playwright/test';

Given('The admin is on the login page', async function () {
  await this.page.goto('https://stage.tripleten.percruit.com');
});

When('they log in with valid credentials', async function () {
  await this.page.getByRole('textbox', { name: 'Enter your email' }).click();
  await this.page.getByRole('textbox', { name: 'Enter your email' }).fill('ebc951+admin@gmail.com');
  await this.page.getByRole('textbox', { name: 'Enter your password' }).click();
  await this.page.getByRole('textbox', { name: 'Enter your password' }).fill('NotSoLittle1');
  await this.page.getByRole('button',  { name: 'Sign In' }).click();
  
});

Then('they should be redirected to their dashboard', async function () {
  await expect(this.page).toHaveURL('https://stage.tripleten.percruit.com/dashboard');
});

Then('see the dashboard loads correctly', async function () {
  await expect(this.page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();

  await this.page.getByText('Total Users').waitFor();
  await this.page.getByText('Active This Week').waitFor();
  await this.page.getByText('Active Members').waitFor();
  await this.page.getByText('New This Week').waitFor();
});