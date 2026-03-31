import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { UsageMetricsPage } from '../../src/pages/admin/UsageMetricsPage';
import { CookiesPolicyPage } from '../../src/pages/common/CookiesPolicyPage';

// Open one browser page in beforeAll
// Log in once
// Reuse the same page for all tests inside the describe.serial

test.describe.serial('Admin - Usage Metrics Flow', () => {

  // page will hold the shared Playwright page; usageMetricsPage must be created after the page exists
  let page: page;
  let usageMetricsPage: UsageMetricsPage;
  let cookiesPolicyPage: CookiesPolicyPage;
  
  // Receives the Playwright browser instance and configured baseURL
  test.beforeAll(async ({ browser, baseURL }) => {
    // This page will be reused for all tests, and also the key to keep the login session alive
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

    // await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();

  });

  test('Navigate to Usage Metrics', async () => {
    //page is the shared page created in beforeAll
    await usageMetricsPage.locateUsageMetricsLink();
  });

  test('Open Real-time Activity tab', async () => {
    await usageMetricsPage.locateRealTimeActivityTab();
  });

  test('Get Active Users Now count', async () => {
    const count = await usageMetricsPage.getactiveUsersNowCount();
    console.log(`Active Users Now: ${count}`);
  });

  // test('Open Real-time Activity tab', async () => {
  //   //page is the shared page created in beforeAll and it is reused again
  //   // 'exact: true' tells Playwright 'match the text exactly, not partially.'
  //   await usageMetricsPage.isOnUsageMetricsPage();
  //   const realTimeActivityTab = page.getByRole('tab', { name: 'Real-time Activity', exact: true });
  //   await expect(realTimeActivityTab).toBeVisible();
  //   await realTimeActivityTab.click();
  // });

  // test('Fetch available timeline options in Real-time Activity', async () => {
    
  //   // Ensure the page is loaded and the tab is open
    
  //   const tab = page.getByRole('tab', { name: 'Real-time Activity', exact: true });
  //   await tab.click();

  //   const options = await usageMetricsPage.getRealTimeActivityOptions();
  //   console.log('Real-time activity timeline options:', options);
  //   expect(options.length).toBeGreaterThan(0);

  //   // Choose a filter from the list (user input)
  //   const userChosenFilter = 'Today'; // modify as needed
  //   console.log(`\n--- User Selected Real-time Activity Filter: ${userChosenFilter} ---`);
  //   expect(options).toContain(userChosenFilter);

  //   const previousValue = await usageMetricsPage.getActiveUsersNowCount();
  //   console.log(`Active Users Now before filter: ${previousValue}`);

  //   await usageMetricsPage.clickButtonByText(userChosenFilter);

  //   const updatedValue = await usageMetricsPage.waitForActiveUsersUpdate(previousValue);
  //   console.log(`Active Users Now after selecting "${userChosenFilter}": ${updatedValue}`);
  //   expect(updatedValue).toBeGreaterThanOrEqual(0);
  // });
 
  // Close the page after all tests are finished
  test.afterAll(async () => {
    await page.close();
  });

});



