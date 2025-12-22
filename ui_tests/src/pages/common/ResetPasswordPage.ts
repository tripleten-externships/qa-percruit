import { expect,Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginPage } from './LoginPage';
import * as env from '../../config/world';

export class ResetPasswordPage extends BasePage {
  private loginPage: LoginPage;
   
// LOCATORS (ALL CAPS)

  EMAIL_INPUT: Locator;
  RESET_BUTTON: Locator;
  SUCCESS_MESSAGE:Locator;
  COOKIES_CONTAINER:Locator;
  COOKIES_X_BUTTON:Locator;
  RESET_PAGE_HEADING:Locator;

// Constructor to initialize the page object
  constructor(page: Page) {
    super(page);
    this.loginPage = new LoginPage(page);

    // Initialize locators
    this.EMAIL_INPUT = this.page.getByRole('textbox', { name: 'user@example.com' });
    this.RESET_BUTTON = this.page.getByRole('button', { name: 'Send Reset Link' });
    this.SUCCESS_MESSAGE = this.page.getByText('Password reset link sent');
    this.COOKIES_CONTAINER = this.page.getByText('This website uses cookies');
    this.COOKIES_X_BUTTON = this.page.getByRole('button', { name: '×' });
    this.RESET_PAGE_HEADING = this.page.getByRole('heading', { name: 'Reset Password' });

  }

  //Method to close cookies pop up
  async closeCookiesPopupIfPresent() {
    if (await this.COOKIES_CONTAINER.isVisible()) {
      await this.COOKIES_X_BUTTON.click();
    }
  }
  // Method to confirm user is on reset page
  async isOnResetPage() {
    await expect(this.RESET_PAGE_HEADING).toBeVisible();

  }
  // Method to confirm email field is present
  async emailFieldIsVisible() {
    await expect(this.EMAIL_INPUT).toBeVisible();
  }
  //Method to submit reset password request
  async submitResetRequest() {
    await this.EMAIL_INPUT.fill(env.getAdminEmail());
    await this.RESET_BUTTON.click();
  }
  // Method to confirm user see's success message 
  async successMessageIsVisible() {
    await expect(this.SUCCESS_MESSAGE).toBeVisible({timeout: 10000});
  }
   
  //Method to go to reset page from login page
  async goToResetPasswordPage() {
    await this.closeCookiesPopupIfPresent();
    await this.loginPage.clickForgotPassword();
    await this.isOnResetPage();
  }
}
