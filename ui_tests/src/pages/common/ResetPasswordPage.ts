import { expect,Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginPage } from './LoginPage';
import { LogoutPage } from './LogoutPage';  
import * as env from '../../config/world';

export class ResetPasswordPage extends BasePage {
  private loginPage: LoginPage;
  private logoutPage: LogoutPage; 
   
// LOCATORS (ALL CAPS)

  EMAIL_INPUT: Locator;
  RESET_BUTTON: Locator;
  SUCCESS_MESSAGE:Locator;
  COOKIES_CONTAINER:Locator;
  COOKIES_X_BUTTON:Locator;
  RESET_PAGE_HEADING:Locator;
  INVALID_EMAIL_MESSAGE:Locator;
  BACK_TO_LOGIN_BUTTON:Locator;


// Constructor to initialize the page object
  constructor(page: Page) {
    super(page);
    this.loginPage = new LoginPage(page);
    this.logoutPage = new LogoutPage(page);

    // Initialize locators
    this.EMAIL_INPUT = this.page.getByRole('textbox', { name: 'user@example.com' });
    this.RESET_BUTTON = this.page.getByRole('button', { name: 'Send Reset Link' });
    this.SUCCESS_MESSAGE = this.page.getByText('Password reset link sent');
    this.COOKIES_CONTAINER = this.page.getByText('This website uses cookies');
    this.COOKIES_X_BUTTON = this.page.getByRole('button', { name: '×' });
    this.RESET_PAGE_HEADING = this.page.getByRole('heading', { name: 'Reset Password' });
    // Assuming the error message is a <p> element with class "MuiFormHelperText-root"
    this.INVALID_EMAIL_MESSAGE = this.page.locator('p.MuiFormHelperText-root');
    this.BACK_TO_LOGIN_BUTTON = this.page.getByRole('button', { name: 'Back to Sign In' });
    
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

  //Method to submit reset password request with invalid email formats
  async submitInvalidEmailRequest(email: string) {
    await this.EMAIL_INPUT.fill(email);
    await this.RESET_BUTTON.click();
  }

  //Method to fill email field and blur to trigger validation
  async fillEmailAndBlur(email: string) {
    await this.EMAIL_INPUT.fill(email);
    // blur to trigger validation
    await this.EMAIL_INPUT.press('Tab');
}

  // Method to confirm user see's invalid email error message when @ symbol is missing
  async emailMissingSymbolError() {   
    await expect(this.INVALID_EMAIL_MESSAGE).toBeVisible({ timeout: 3000 });
    await expect(this.INVALID_EMAIL_MESSAGE).toHaveText('Email must include an @ symbol');
  }

  // Method to confirm user see's invalid email error message when domain is missing after @ symbol
  async emailMissingDomainError() {   
    await expect(this.INVALID_EMAIL_MESSAGE).toBeVisible({ timeout: 3000 });
    await expect(this.INVALID_EMAIL_MESSAGE).toHaveText('Email must have a domain after the @ symbol');
  }

  // Method to confirm user see's invalid email error message when characters before @ symbol are missing
  async emailMissingCharBefError() {   
    await expect(this.INVALID_EMAIL_MESSAGE).toBeVisible({ timeout: 3000 });
    await expect(this.INVALID_EMAIL_MESSAGE).toHaveText('Email must have characters before the @ symbol');
  }

  // Method to confirm user see's invalid email error message when email format is invalid in general
  async invalidEmailError() {   
    await expect(this.INVALID_EMAIL_MESSAGE).toBeVisible({ timeout: 3000 });
    await expect(this.INVALID_EMAIL_MESSAGE).toHaveText('Please enter a valid email address (e.g., user@example.com)');
  }

  // Method to confirm user see's invalid email error message when email domain is missing a period
  async emailDomainMissingPeriodError() {   
    await expect(this.INVALID_EMAIL_MESSAGE).toBeVisible({ timeout: 3000 });
    await expect(this.INVALID_EMAIL_MESSAGE).toHaveText('Email domain must include a period (e.g., example.com)');
  }

  // Method to click back to login button and confirm user is navigated back to login page
  async backToLogin() {
    await this.BACK_TO_LOGIN_BUTTON.first().click();
    await this.logoutPage.isOnLoginPage();
  } 

  //Method to clear the email input field
  async clearEmail() {
    await this.EMAIL_INPUT.clear();
  }
}
