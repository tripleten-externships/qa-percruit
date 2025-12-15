import { Page } from '@playwright/test';
import { ENV } from '../../../../src/config/world';

export class LoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Go to login page using ENV base URL
  async gotoLoginPage(): Promise<void> {
    await this.page.goto(`${ENV.baseUrl}/login`, {
      waitUntil: 'domcontentloaded',
    });
  }

  // Login using provided credentials
  async loginAsAdmin(email: string, password: string): Promise<void> {
    // Fill email
    await this.page
      .getByRole('textbox', { name: 'user@example.com' })
      .fill(email);

    // Fill password
    await this.page
      .getByRole('textbox', { name: 'Enter your password' })
      .fill(password);

    // Click sign in
    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }
}
