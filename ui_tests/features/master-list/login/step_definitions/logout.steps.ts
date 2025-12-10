import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { env } from "process";
import { LogoutPage } from "../../../../src/pages/common/LogoutPage";
import { LoginPage } from "../../../../src/pages/common/LoginPage";


let logoutPage: LogoutPage;
let loginPage: LoginPage;

         Given('the admin is logged into the system', async function () {
            // user logs in as an admin
            //user navigates to site 
            await this.page.goto(env.BASE_URL)
            await this.page.getByRole('textbox', { name: 'user@example.com' }).click();
            await this.page.getByRole('textbox', { name: 'user@example.com' }).fill('cheyannejaileen16+admin@gmail.com');
            await this.page.getByRole('textbox', { name: 'Enter your password' }).click();
            await this.page.getByRole('textbox', { name: 'Enter your password' }).fill('Externship22');
            await this.page.getByRole('button', { name: 'Sign In' }).click();

            logoutPage = new LogoutPage(this.page);
            });
       
         Given('the admin is on the home page', async function () {
         // user confirms they are on the admin dashboard
            await expect (this.page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible({ timeout: 10000 });
         });
      
         When('the admin initiates a logout', async function () {
         // the user begins to logout
            await logoutPage.initiateLogout();
         });
       
         Then('the admin should be signed out successfully', function () {
         // the user confirms log out was successful
         });
       
         Then('the login page should be displayed', async function () {
         // the user is on the login page and sees "Welcome to Percruit"
            await logoutPage.isOnLoginPage();
         });