import { Given, Then, When, World } from "@cucumber/cucumber"; 
import { expect } from "playwright/test";  
import { env } from "process";  
import { ResetPasswordPage } from "../../../../src/pages/common/ResetPasswordPage";
import { LoginPage } from "../../../../src/pages/common/LoginPage";

let resetPasswordPage: ResetPasswordPage;
let loginPage: LoginPage;
let world: World;

         Given('the admin is on the login page', async function () {
           // Navigates to login page
            resetPasswordPage = new ResetPasswordPage(this.page);
            await this.page.goto(env.BASE_URL);
            await resetPasswordPage.isOnLoginPage();
            loginPage = new LoginPage(this.page);
         });
    
         When('the admin clicks the {string} link', async function (string) {
           // Removes cookies pop-up window and clicks 'Forgot Password'
            await resetPasswordPage.makeForgotPasswordVisible();
            await loginPage.clickForgotPassword();

         });
  
         Then('the system should navigate to the password reset page', async function () {
           // Confirms user is on reset page 
            await resetPasswordPage.isOnResetPage(); 
            
         });
       
         Then('the page should display a form to enter the registered email address', async function () {
           // Confirms the reset page contains form to enter the registered email address
            await resetPasswordPage.enterEmailFieldVisible();
          
         });

         Given('the admin is on the reset page', async function () {
           // Navigates to login page, then proceeds to reset page
            await this.page.goto(env.BASE_URL);
            await resetPasswordPage.goToResetPage();

         });
       
         When('the admin enters a valid email and clicks the {string} button', async function (string) {
           // Enters valid email and send reset link request
            await resetPasswordPage.submitResetRequest();
         });
       
         Then('the admin should see a {string} success message', async function (message: string) {
           // Confirms a success message appears
            await resetPasswordPage.successMessageVisible();
         });