import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../../src/config/world';
import { UsageMetricsPage } from '../../../../src/pages/admin/UsageMetricsPage';
import { TIMEOUT } from 'dns';

Before(async function(){
  this.usagemetricsPage = new UsageMetricsPage(this.page);
});

// Step definition: Navigate to the Usage Metrics page and verify successful navigation
Given('the Admin navigates to the Usage Metrics page', async function () {

  await this.page.getByRole('button', { name: 'Usage Metrics' }).click();
  const isOnUsageMetricsPage = await this.usagemetricsPage.isOnUsageMetricsPage();
  expect (isOnUsageMetricsPage).toBeTruthy();
});  

When('the user click on the {string} tab', async function (tabName) {
  await this.page.getByRole('tab', { name: tabName },{timeout:30000});
});


Then('the user should see the Real-time Activity tab content loaded successfully', async function () {
  // Wait for a tab to appear
    const realTimeActivityTab = this.page.getByRole('tab', { name: 'Real-time Activity' }).first();
    await expect(realTimeActivityTab).toBeVisible();
          
});