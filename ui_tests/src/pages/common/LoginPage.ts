import { expect, Page } from '@playwright/test';
import * as env from '../../config/world';
import { BasePage } from './BasePage';

// Page Object Model (POM) class for the Login page
export class LoginPage extends BasePage {
  async gotoLoginPage(): Promise<void> {
    await this.page.goto(env.getBaseUrl());
  }


  // Define element locators for Login page
  readonly EMAIL_LOCATOR = 'input[type="email"]';
  
  readonly EMAIL_LOCATOR = '//input[@placeholder="user@example.com"]';
  readonly PASSWORD_LOCATOR = 'input[type="password"]';
  readonly SIGNIN_LOCATOR = 'button:has-text("Sign In")';
  readonly FORGOT_PASSWORD_LOCATOR = 'button:has-text("Forgot password?")';

  // Constructor to initialize the page object
  constructor(page: Page) {
    super(page);
  }
  // Method to enter email into the email field
  async enterEmail(email: string) {
    await this.page.fill(this.EMAIL_LOCATOR, email);
  }
  // Method to enter password into the password field
  async enterPassword(password: string) {
    await this.page.fill(this.PASSWORD_LOCATOR, password);
  }
  // Method to click on the "Sign In" button
  async clickSignIn() {
    await this.page.click(this.SIGNIN_LOCATOR);
  }
  // Method to click on the "Forgot password?" button
  async clickForgotPassword() {
    await this.page.click(this.FORGOT_PASSWORD_LOCATOR);
  }

  async login(email: string, password: string) {
    console.log("In POM login method, logging in as "+email);
    await this.enterEmail(email);
    //console.log("Entered this in email: "+ await this.page.locator(this.EMAIL_LOCATOR).allTextContents);
    await this.enterPassword(password);
    //console.log("Entered this in password: "+ await this.page.locator(this.PASSWORD_LOCATOR).allTextContents);
    await this.clickSignIn();
    console.log("Completed POM Login method");
  }

  // Predefined login method for Student user type using credentials from environment config
  async loginAsStudent() {
    await this.loginAndVerify(env.getStudentEmail(), env.getStudentPassword());
  }
  // Predefined login method for Admin user type using credentials from environment config
  async loginAsAdmin() {
    await this.loginAndVerify(env.getAdminEmail(), env.getAdminPassword());
  }
  // Predefined login method for Mentor user type using credentials from environment config
  async loginAsMentor() {
    await this.loginAndVerify(env.getMentorEmail(), env.getMentorPassword());
  }

  async openBasicInfoSection(): Promise<void> {

  await this.page.getByRole('heading', { name: 'Basic Information' }).click();
  }

async gotoProfileSettings(): Promise<void> {
await this.page.goto('https://stage.tripleten.percruit.com/profile?tab=profile');}

  async loginAsUserType(userType: string) {
 async loginAsUserType(userType: string) {
    console.log('Logging in as user type: '+userType);
    switch (userType) {
      case 'Student':
      case 'student':
        await this.login(env.getStudentEmail(), env.getStudentPassword());
        break;
      case 'Admin':
      case 'admin':
        await this.login(env.getAdminEmail(), env.getAdminPassword());
        break;
      case 'Mentor':
      case 'mentor':
        await this.login(env.getMentorEmail(), env.getMentorPassword());
        break;
      default:
        throw new Error(`Unknown user type: ${userType}`);
    }
    await this.waitForDashboard();
  }

  async waitForDashboard(){
    await expect(this.page.locator(this.FORGOT_PASSWORD_LOCATOR)).not.toBeVisible();
    await expect(this.page).toHaveURL(/dashboard/);

  }
}
