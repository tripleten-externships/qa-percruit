import { Page } from '@playwright/test';


const baseUrl = 'https://stage.tripleten.percruit.com';

export class LoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to login page
  async gotoLoginPage(): Promise<void> {
    await this.page.goto(`${baseUrl}/login`);
  }

  // Reusable admin login method 
  async loginAsAdmin(email: string, password: string): Promise<void> {
    // Fill email field
    await this.page
      .getByRole('textbox', { name: 'user@example.com' })
      .fill(email);

    // Fill password field
    await this.page
      .getByRole('textbox', { name: 'Enter your password' })
      .fill(password);

    // Click Sign In button
    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }
}
