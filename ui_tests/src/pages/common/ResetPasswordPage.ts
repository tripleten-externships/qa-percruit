import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginPage } from './LoginPage';

export class ResetPasswordPage extends BasePage {
  private loginPage: LoginPage;
  // Locators
  EMAIL_INPUT = 'user@example.com';
  RESET_BUTTON = 'Send Reset Link';
  SUCCESS_MESSAGE = 'Password reset link sent';

  constructor(page: Page) {
    super(page);
    this.loginPage = new LoginPage(page);
  }

    async isOnLoginPage() {
        await this.page.getByRole('heading', { name: 'Welcome to Percruit' }).click();
        return true;
    }

    async makeForgotPasswordVisible() {
        await this.page.locator('div').filter({ hasText: '×🍪 This website uses cookies' }).nth(2).click();
        await this.page.getByRole('button', { name: '×' }).click();
        
    }

    async isOnResetPage() {
        await this.page.getByRole('heading', { name: 'Reset Password' }).click();
    }

    async enterEmailFieldVisible() {
        await expect(this.page.getByRole('textbox', { name: 'user@example.com' } )).toBeVisible();
    }

    async submitResetRequest() {
        await this.page.getByRole('textbox', { name: 'user@example.com' }).click();
        await this.page.getByRole('textbox', { name: 'user@example.com' }).fill('cheyannejaileen16+admin@gmail.com');
        await this.page.getByRole('button', { name: 'Send Reset Link' }).click();
    }

    async successMessageVisible() {
        await expect(this.page.getByText('Password reset link sent')).toBeVisible();
  
    } 

    async goToResetPage() {
        await this.isOnLoginPage();
        await this.makeForgotPasswordVisible();
        await this.loginPage.clickForgotPassword();
        await this.isOnResetPage();
    }

}