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
    const emailInput = this.page.locator(this.EMAIL_LOCATOR);

    await expect(emailInput).toBeVisible({ timeout: 30000 });
    await emailInput.fill(email);
  }

  // Method to enter password into the password field
  async enterPassword(password: string) {
    const passwordInput = this.page.locator(this.PASSWORD_LOCATOR);

    await expect(passwordInput).toBeVisible({ timeout: 30000 });
    await passwordInput.fill(password);
  }

  // Method to click on the "Sign In" button
  async clickSignIn() {
    const signInButton = this.page.locator(this.SIGNIN_LOCATOR);

    await expect(signInButton).toBeVisible({ timeout: 30000 });
    await expect(signInButton).toBeEnabled({ timeout: 30000 });
    await signInButton.click();
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
    const loggedInMentorElement = this.page
      .getByRole('link', {
        name: /Career Path Advisor|Manage career coach events/i,
      })
      .first();

    await Promise.race([
      this.page.waitForURL(/dashboard|mentor|career-path|events/, {
        timeout: 45000,
        waitUntil: 'domcontentloaded',
      }),
      loggedInMentorElement.waitFor({
        state: 'visible',
        timeout: 45000,
      }),
    ]).catch(async () => {
      console.log('Current URL after login attempt:', this.page.url());

      const bodyText = await this.page
        .locator('body')
        .innerText()
        .catch(() => 'Could not read body text');

      console.log('Body text after login attempt:', bodyText);

      throw new Error(
        'Login did not reach a recognized logged-in page. Check credentials, route, or login selectors.'
      );
    });

    await expect(this.page.locator(this.FORGOT_PASSWORD_LOCATOR)).not.toBeVisible({
      timeout: 10000,
    });
  }
}
