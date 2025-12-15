import { expect, Page } from '@playwright/test';
import * as env from '../../config/world';
import { BasePage } from './BasePage';

// Page Object Model (POM) class for the Login page
export class LoginPage extends BasePage {
  reload() {
      throw new Error('Method not implemented.');
  }
  gotoProfileSettings() {
      throw new Error('Method not implemented.');
  }
  openBasicInfoSection() {
      throw new Error('Method not implemented.');
  }
  getFullName(getFullName: any) {
      throw new Error('Method not implemented.');
  }
  getPhoneNumber(getPhoneNumber: any) {
      throw new Error('Method not implemented.');
  }
  getLocation(getLocation: any) {
      throw new Error('Method not implemented.');
  }
  getTimezone(getTimezone: any) {
      throw new Error('Method not implemented.');
  }
  email(email: any) {
      throw new Error('Method not implemented.');
  }
  fullname(fullname: any) {
      throw new Error('Method not implemented.');
  }
  // Predefined login method for Student user type using credentials from environment config
  phoneNumber(phoneNumber: any) {
      throw new Error('Method not implemented.');
  }
  location(location: any) {
      throw new Error('Method not implemented.');
  }
  timezone(timezone: any) {
      throw new Error('Method not implemented.');
  }
  fullName: any;
  waitForAutoSave() {
      throw new Error('Method not implemented.');
  }
  phoneNumberError(phoneNumberError: any) {
      throw new Error('Method not implemented.');
  }
  gotoProfessionalTab() {
      throw new Error('Method not implemented.');
  }
  gotoBasicInfoSection() {
      throw new Error('Method not implemented.');
  }
  gotoLoginPage() {
      throw new Error('Method not implemented.');
  }
  static loginAsAdmin // Define element locators for Login page
          () {
                  throw new Error('Method not implemented.');
  }
  static loginAsUserType(userType: any) {
          throw new Error('Method not implemented.');
  }
  static waitForPageLoad() {
          throw new Error('Method not implemented.');
  }
  // Define element locators for Login page
  readonly EMAIL_LOCATOR = 'input[type="email"]';
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
  // Generic method to perform login using given email and password
  async loginAndVerify(email: string, password: string) {
    await this.login(email, password);

    // Wait for navigation after login (sign-in button click triggers navigation)
    try {
      // Wait for either URL change OR dashboard elements to appear
      await Promise.race([
        this.page.waitForURL(url => !url.toString().endsWith('percruit.com/'), { timeout: 60000 }),
        this.page.waitForSelector('[data-testid="dashboard"], [class*="dashboard"], [class*="Dashboard"]', { timeout: 60000 }).catch(() => null)
      ]);
    } catch (error) {
      const currentUrl = this.page.url();
      throw new Error(
        `Login failed for email: ${email}. Page did not finish loading after login. Current URL: ${currentUrl}. Error: ${error}`
      );
    }
  }

  // Generic method to perform login using given email and password
  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
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

  async loginAsUserType(userType: string) {
    switch (userType) {
      case 'Student':
      case 'student':
        await this.loginAsStudent();
        break;
      case 'Admin':
      case 'admin':
        await this.loginAsAdmin();
        break;
      case 'Mentor':
      case 'mentor':
        await this.loginAsMentor();
        break;
      default:
        throw new Error(`Unknown user type: ${userType}`);
    }
  }
}
