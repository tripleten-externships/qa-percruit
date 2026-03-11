import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { UsageMetricsPage } from '../../src/pages/admin/UsageMetricsPage';
import { CookiesPolicyPage } from '../../src/pages/common/CookiesPolicyPage';

// Open one browser page in beforeAll
// Log in once
// Reuse the same page for all tests inside the describe.serial

test.describe.serial('Admin - Usage Metrics Flow', () => {

  // page will hold the shared Playwright page; usageMetricsPage must be created after the page exists
  let page: Page;
  let usageMetricsPage: UsageMetricsPage;
  let cookiesPolicyPage: CookiesPolicyPage;
  
  // Receives the Playwright browser instance and configured baseURL
  test.beforeAll(async ({ browser, baseURL }) => {
    // This page will be reused for all tests, and also the key to keep the login session alive
    // create instances of page objects that require the page after the page is created
    page = await browser.newPage();
    const loginPage = new LoginPage(page);
    cookiesPolicyPage = new CookiesPolicyPage(page);
    usageMetricsPage = new UsageMetricsPage(page);
        
    // Navigate to base URL
    await page.goto(baseURL!, { waitUntil: 'domcontentloaded' });

    // Close cookie banner if it appears
    await cookiesPolicyPage.closeCookieBanner();

    // Perform login
    await loginPage.loginAsUserType('Admin');
  });

  test('Navigate to Usage Metrics', async () => {
    //page is the shared page created in beforeAll
    //Locate Usage Metrics link in the sidebar and click it
    await usageMetricsPage.locateUsageMetricsLink();
  });

  test('overview tab is accessible and displays Activity Metrics section', async () => {
    await usageMetricsPage.locateOverviewTab();
    await usageMetricsPage.activityMetricsHeadingIsVisible();
  });

  test('Get Unique User Logins count', async () => {
    const Loginscount = await usageMetricsPage.getUniqueUserLoginsCount();
    console.log(`Unique User Logins: ${Loginscount}`);
  });

  // Close the page after all tests are finished
  test.afterAll(async () => {
    await page.close();
  });

});