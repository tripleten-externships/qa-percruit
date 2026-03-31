
// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect, test } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
// Imports Login Page functionality
import { LoginPage } from '../../src/pages/common/LoginPage';
// Imports Assignment Page functionality
import { AssignmentPage } from '../../src/pages/admin/AssignmentPage';   
import { AdminDashboardPage } from '../../src/pages/admin/AdminDashboardPage';
import { ProfilePage } from '../../src/pages/common/ProfilePage';

// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let profilePage: ProfilePage;

test.describe('Student Profile', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);
    await page.goto(env.getBaseUrl());
    await loginPage.loginAsUserType('Student');
  });

  test('When the student goes to the profile page, the page loads as expected.', async ({ page }) => {
    await profilePage.clickAvatar();
    await profilePage.clickViewProfile();
    await expect(page).toHaveURL(/profile/);
    await profilePage.isProfessionalTabVisible();
  });
});




    
