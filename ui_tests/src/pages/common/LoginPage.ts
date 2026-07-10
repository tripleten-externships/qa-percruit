import { expect, Page } from '@playwright/test';
import * as env from '../../config/world';
import { BasePage } from './BasePage';
import { CookiesPolicyPage } from './CookiesPolicyPage';

// Page Object Model (POM) class for the Login page
export class LoginPage extends BasePage {
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
    console.log('In POM login method, logging in as ' + email);

    const cookiesPolicyPage = new CookiesPolicyPage(this.page);

    await cookiesPolicyPage.closeCookieBanner();
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();

    console.log('Completed POM Login method');
  }

  async loginAsUserType(userType: string) {
    console.log('Logging in as user type: ' + userType);

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

  async waitForDashboard() {
    const dashboardContent = this.page
      .getByRole('heading', { name: /Dashboard/i })
      .or(this.page.getByText(/^Dashboard$/i))
      .or(this.page.getByText(/USER MANAGEMENT/i))
      .or(this.page.getByText(/Usage Metrics/i))
      .first();

    try {
      await expect(dashboardContent).toBeVisible({ timeout: 30000 });

      await expect(this.page.locator(this.FORGOT_PASSWORD_LOCATOR)).toBeHidden({
        timeout: 10000,
      });
    } catch (error) {
      console.log('Dashboard wait failed.');
      console.log('Current URL:', this.page.url());
      console.log('Current page text:');
      console.log(await this.page.locator('body').innerText());

      throw error;
    }
  }
}