import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ResetPasswordPage extends BasePage {
  // Locators
  private readonly EMAIL_INPUT = 'input[type="email"]';
  private readonly RESET_BUTTON = 'button:has-text("Reset password")';
  private readonly SUCCESS_MESSAGE = 'text=Check your email';

  constructor(page: Page) {
    super(page);
  }

    async isOnLoginPage() {
        await this.page.getByRole('heading', { name: 'Welcome to Percruit' }).click();
        return true;
    }

    async clickForgotPassword() {
        await this.page.getByRole('button', { name: '×' }).click();
        await this.page.getByRole('button', { name: 'Forgot password?' }).click();
    }

    async isOnResetPage() {
        await this.page.getByRole('heading', { name: 'Reset Password' }).click();
    }

    async submitResetRequest() {
    await this.page.getByRole('textbox', { name: 'user@example.com' }).click();
            await this.page.getByRole('textbox', { name: 'user@example.com' }).fill('cheyannejaileen16+admin@gmail.com');
            await this.page.getByRole('button', { name: 'Send Reset Link' }).click();
    }

    async isSuccessMessageVisible() {
    return await this.page.getByText('Password reset link sent').click();
    }

}