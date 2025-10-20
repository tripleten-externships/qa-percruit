import { Page } from '@playwright/test';
import * as env from '../../config/world';

export class LoginPage {
  readonly page: Page;
  readonly EMAIL_LOCATOR = 'input[type="email"]';
  readonly PASSWORD_LOCATOR = 'input[type="password"]';
  readonly SIGNIN_LOCATOR = 'button:has-text("Sign In")';
  readonly FORGOT_PASSWORD_LOCATOR = 'button:has-text("Forgot password?")';

  constructor(page: Page) {
    this.page = page;
  }

  async enterEmail(email: string) {
    await this.page.fill(this.EMAIL_LOCATOR, email);
  }

  async enterPassword(password: string) {
    await this.page.fill(this.PASSWORD_LOCATOR, password);
  }

  async clickSignIn() {
    await this.page.click(this.SIGNIN_LOCATOR);
  }

  async clickForgotPassword() {
    await this.page.click(this.FORGOT_PASSWORD_LOCATOR);
  }

  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  async loginAsStudent() {
    await this.login(env.getStudentEmail(), env.getStudentPassword());
  }

  async loginAsAdmin() {
    const adminEmail = '';
    const adminPassword = '';
    await this.login(adminEmail, adminPassword);
  }
  
  async loginAsMentor() {
    const mentorEmail = '';
    const mentorPassword = '';
    await this.login(mentorEmail, mentorPassword);
  }
}
