// qa-percruit/ui_tests/features/master-list/dashboard/step_definitions/load.steps.ts
// Import necessary modules, types and pages
import { Given, SummaryFormatter, Then, When } from "@cucumber/cucumber";
import { Page } from "playwright/test";
import { expect } from "playwright/test";
import { env } from "process";
import { LoginPage } from "../../../../src/pages/common/LoginPage";
import { AdminDashboardPage } from "../../../../src/pages/admin/AdminDashboardPage";


let loginPage: LoginPage;
let adminDashboardPage: AdminDashboardPage;

// Remove the uninitialized 'page' declaration. Use 'this.page' if available in step context.


        Given('The admin is on the login page',  async function () {
           // User navigates to the login page by going to the URL    
           await this.page.goto(env.BASE_URL);
         });

         When('they log in with valid credentials', async function () {

            // User enters valid credentials and clicks the sign-in button
            loginPage = new LoginPage(this.page);
            await loginPage.loginAsAdmin();
         });

         Then('they should be redirected to their dashboard', async function () {
            // Verify that the user is redirected to the dashboard page after login
            await expect(this.page).toHaveURL(env.BASE_URL + 'dashboard');
         });

         Then('see the dashboard loads correctly', async function () {
            // Verify that key elements of the dashboard are visible to confirm it loaded correctly
            adminDashboardPage = new AdminDashboardPage(this.page);
            await adminDashboardPage.isAdminDashboardVisible();
        //    await expect(this.page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
         });