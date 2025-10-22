import { Page } from '@playwright/test';
import * as env from '../../config/world';

// Page Object Model (POM) class for the Login page
export class LoginPage {
  // Declare Playwright Page instance to perform browser actions
  readonly page: Page;
  // Define element locators for Login page
  readonly EMAIL_LOCATOR = 'input[type="email"]';
  readonly PASSWORD_LOCATOR = 'input[type="password"]';
  readonly SIGNIN_LOCATOR = 'button:has-text("Sign In")';
  readonly FORGOT_PASSWORD_LOCATOR = 'button:has-text("Forgot password?")';

  // Constructor to initialize the page object
  constructor(page: Page) {
    this.page = page;
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
  // Generic method to perform login using given email and password
  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  // Predefined login method for Student user type using credentials from environment config
  async loginAsStudent() {
    await this.login(env.getStudentEmail(), env.getStudentPassword());
  }
  // Predefined login method for Admin user type using credentials from environment config
  async loginAsAdmin() {
    await this.login(env.getAdminEmail(), env.getAdminPassword());
  }
  // Predefined login method for Mentor user type using crcedentials from environment config
  async loginAsMentor() {
    await this.login(env.getMentorEmail(), env.getMentorPassword());
  }
}
