import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { env } from "process";
import { LogoutPage } from "../../../../src/pages/common/LogoutPage";
import { LoginPage } from "../../../../src/pages/common/LoginPage";


let logoutPage: LogoutPage;
let loginPage: LoginPage;

         Given('the admin is logged into the system', async function () {
            //user logs in as an admin
            //user navigates to site 
            const loginPage = new LoginPage(this.page);
            await this.page.goto(env.BASE_URL);
            await loginPage.loginAsUserType('Admin')

            logoutPage = new LogoutPage(this.page);
            });
       
         Given('the admin is on the home page', async function () {
         // user confirms they are on the admin dashboard/ Home page
            await logoutPage.isOnHomePage();
         });
      
         When('the admin initiates a logout', async function () {
         // the user begins to logout
            await logoutPage.initiateLogout();
         });
       
         Then('the admin should be signed out successfully', async function () {
         // Confirms the user is no longer on the admin dashboard and the log out was successful
            await logoutPage.noLongerOnDashboard();
         });
       
         Then('the login page should be displayed', async function () {
         // the user is on the login page and sees "Welcome to Percruit"
            await logoutPage.isOnLoginPage();
         });


