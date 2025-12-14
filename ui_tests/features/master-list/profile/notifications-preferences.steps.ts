@Zach
import { Given, When, Then, } from "@cucumber/cucumber";
import { test, expect } from '@playwright/test';
import { page } from '@playwright/test';
import { env } from "process";
import { LoginPage } from "../../../src/pages/common/LoginPage";
let loginPage: LoginPage;

 Given('The admin is on the login page', async function () {
           // User navigates to the login page by going to the URL
                await this.page.goto(env.BASE_URL);
        });

        And('they log in with valid credentials', async function () {
                // user enters valid credentials and clicks the sign-in button
                loginPage = new LoginPage(this.page);
                await loginPage.loginAsAdmin();
        });

        And('they are redirected to their dashboard', async function () {
                // verify the user is redirected to the dashboard page after login

                await expect(this.page).toHaveURL(env.BASE_URL + '/dashboard')
        });
         

        
function And(arg0: string, arg1: () => Promise<void>) {
    throw new Error("Function not implemented.");
}

import { Page, Locator } from '@playwright/test';
import * as env from '../../config/world';

export class AdminDashboardPage {
  readonly page: Page;
  readonly ADMIN_DASHBOARD_TEXT_LOCATOR: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ADMIN_DASHBOARD_TEXT_LOCATOR = this.page.getByRole('heading', { name: 'Admin Dashboard' });
  }

  async isAdminDashboardVisible() {
    await this.ADMIN_DASHBOARD_TEXT_LOCATOR.isVisible();
  }
 
}