import { Page, expect } from '@playwright/test';
import * as env from '../../config/world';

export class AdminProfilePage {
  readonly page: Page;
  readonly PROFESSIONAL_TAB_LOCATOR = 'button:has-text("Professional")';
  readonly PROFILE_HEADING = 'h1:has-text("Profile")';  
  readonly FIELD_OF_INTEREST_LOCATOR = '//textarea[@placeholder="e.g., Software Development, Data Science"]';
  readonly SKILLS_LOCATOR = '//textarea[@placeholder="e.g., JavaScript, Project Management"]';
  readonly EXPERIENCE_LOCATOR = '//textarea[@placeholder="Describe your work experience..."]';
  readonly EDUCATION_LOCATOR = '//textarea[@placeholder="List your educational background..."]';  
  


  constructor(page: Page) {
    this.page = page;
  }

  async waitForDashboard(timeout = 40000) {
    await expect(this.page.locator('h1:has-text("Admin Dashboard")')).toBeVisible({ timeout });
  }
}

