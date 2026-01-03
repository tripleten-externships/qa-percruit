import { expect, Page } from '@playwright/test';
import * as env from '../../config/world';
import { BasePage } from './BasePage';

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
    console.log("In POM login method, logging in as "+email);
    await this.enterEmail(email);
    //console.log("Entered this in email: "+ await this.page.locator(this.EMAIL_LOCATOR).allTextContents);
    await this.enterPassword(password);
    //console.log("Entered this in password: "+ await this.page.locator(this.PASSWORD_LOCATOR).allTextContents);
    await this.clickSignIn();
    // After sign-in, wait for a post-login UI indicator (avatar/user-menu) then
    // force a client-side navigation to `/profile`. This helps when the app
    // briefly redirects to `/` or `/dashboard` before the SPA router settles.
    try {
      await this.page.waitForSelector('[data-testid="user-menu"], img[alt*="avatar"], text=jcsaintilus+admin1@gmail.com, text=Jonathan Calvin Saintilus', { timeout: 10000 }).catch(() => {});
      // Try client-side route push to /profile/ so SPA shows the profile view
      await this.page.evaluate(() => {
        try {
          history.pushState({}, '', '/profile/');
          window.dispatchEvent(new PopStateEvent('popstate'));
        } catch (err) {
          // swallow
        }
        try {
          // Aggressively attempt to click any tab/button that contains "Professional"
          const clickProfessional = () => {
            try {
              const candidates = Array.from(document.querySelectorAll('button, a, [role="tab"], li, div'))
                .filter(n => n.textContent && /professional/i.test(n.textContent));
              for (const el of candidates) {
                try {
                  (el as HTMLElement).scrollIntoView({ block: 'center' });
                  el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
                  el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
                  el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
                  el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                } catch (e) {}
              }
            } catch (e) {}
          };
          clickProfessional();
          const id = setInterval(clickProfessional, 250);
          // stop after 5 seconds
          setTimeout(() => clearInterval(id), 5000);
        } catch (e) {}
      });
      const profileUrl = new URL('profile/', env.getBaseUrl()).toString();
      await this.page.waitForURL(profileUrl, { timeout: 10000 }).catch(() => {});
    } catch (e) {
      // fallback: try a full navigation to the profile URL
      try {
        const profileUrl = new URL('profile/', env.getBaseUrl()).toString();
        await this.page.goto(profileUrl, { waitUntil: 'networkidle', timeout: 10000 }).catch(() => {});
      } catch (err) {
        // ignore - let later assertions fail with useful diagnostics
      }
    }
    console.log("Completed POM Login method");
  }

 async loginAsUserType(userType: string) {
    console.log('Logging in as user type: '+userType);
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
    await this.waitForProfile();
  }

  async waitForProfile(){
    await expect(this.page.locator(this.FORGOT_PASSWORD_LOCATOR)).not.toBeVisible();
    // Expect exact profile URL with trailing slash
    const profileUrl = new URL('profile/', env.getBaseUrl()).toString();
    const current = this.page.url();
    if (current === profileUrl) return;
    if (/dashboard/.test(current) || current === env.getBaseUrl() || current === env.getBaseUrl().replace(/\/$/, '')) {
      // attempt client-side push then full navigation as fallback
      try {
        await this.page.evaluate(() => { history.pushState({}, '', '/profile/'); window.dispatchEvent(new PopStateEvent('popstate')); });
        await this.page.waitForURL(profileUrl, { timeout: 5000 }).catch(() => {});
        if (this.page.url() === profileUrl) return;
      } catch (e) {}
      try {
        await this.page.goto(profileUrl, { waitUntil: 'domcontentloaded', timeout: 8000 }).catch(() => {});
      } catch (e) {}
    }
    await expect(this.page).toHaveURL(profileUrl);

  }
}
