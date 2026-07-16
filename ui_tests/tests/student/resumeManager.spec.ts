// Import Playwright testing utilities
import { test, expect } from '@playwright/test';
// Import environment configuration
import * as env from '../../src/config/world';
// Import Page Object Models (POM)
import { LoginPage } from '../../src/pages/common/LoginPage';
import { ResumeManagerPage } from '../../src/pages/student/ResumeManagerPage';

// Declare page object instances
let loginPage: LoginPage;
let resumeManagerPage: ResumeManagerPage;

test.describe('Student Resume Manager', () => {

  // Runs before each test to set up the test environment
  test.beforeEach(async ({ page }) => {

    // Initialize Page Object Models with the current page instance
    loginPage = new LoginPage(page);
    resumeManagerPage = new ResumeManagerPage(page);

    // Navigate to the application base URL
    await page.goto(env.getBaseUrl());

    // Accept cookies if the consent banner appears
    const cookieButton = page.locator('button:has-text("Accept all cookies")');
    if (await cookieButton.isVisible()) {
      await cookieButton.click();
    }

    // Log in as a Student user
    await loginPage.loginAsUserType('Student');
  });

  test('User can navigate to Resume Manager page successfully', async () => {

    /**
     * Scenario: Resume Manager page loads correctly
     *
     * Given the Student user is logged into the system
     * When the user navigates to the Resume Manager page
     * Then the Resume Manager page should be displayed
     */

    // Navigate to Resume Manager page
    await resumeManagerPage.navigateToResumeManager();

    // Verify the page loads successfully
    await resumeManagerPage.verifyPageLoaded();
  });

});