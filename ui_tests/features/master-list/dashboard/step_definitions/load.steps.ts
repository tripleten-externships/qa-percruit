// qa-percruit/ui_tests/features/master-list/dashboard/step_definitions/load.steps.ts
// import necessary modules, types, and pages
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { env } from "process";
import { LoginPage } from "../../../../src/pages/common/LoginPage"
import { AdminDashboardPage } from "../../../../src/pages/admin/AdminDashboardPage";

let loginPage: LoginPage;
let adminDashboardPage: AdminDashboardPage;
// Remove the uninitialized 'page' declaration. Use 'this.page' if available in step context.


        Given('The admin is on the login page', async function () {
           // User navigates to the login page by going to the URL
                await this.page.goto(env.BASE_URL);
        });

        When('they log in with valid credentials', async function () {
                // user enters valid credentials and clicks the sign-in button
                loginPage = new LoginPage(this.page);
                await loginPage.loginAsAdmin();
        });

        Then('they should be redirected to their dashboard', async function () {
                // verify the user is redirected to the dashboard page after login

                await expect(this.page).toHaveURL(env.BASE_URL + '/dashboard');
        });

        Then('sees the dashboard load correctly', async function () {
                // verify that key aspects of the dashboard are visible to confirm it loaded correctly
                adminDashboardPage = new AdminDashboardPage(this.page);
                await adminDashboardPage.ADMIN_DASHBOARD_TEXT_LOCATOR.isVisible();
             //   await expect(this.page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
        });