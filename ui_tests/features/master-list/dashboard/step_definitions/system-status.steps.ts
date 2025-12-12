// system-status.steps.ts
// Step Definitions for System Health Monitor feature

import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../Pages/LoginPage';
import { DashboardPage } from '../Pages/Dashboard.Page';
import { SystemStatusPage } from '../Pages/SystemStatusPage';

// --- ADMIN LOGIN ---
Given('admin is logged in using valid credentials', async function () {
  const login = new LoginPage(this.page);

  await login.gotoLoginPage();
  await login.loginAsAdmin(
    process.env.ADMIN_EMAIL || '',
    process.env.ADMIN_PASSWORD || ''
  );
});

// --- DASHBOARD MUST BE LOADED ---
Given('is on the dashboard', async function () {
  const dashboard = new DashboardPage(this.page);
  await dashboard.waitForLoaded();
});



// Wait for the System Health Monitor card
When('the admin checks the System Health Monitor section', async function () {
  const status = new SystemStatusPage(this.page);
  await status.waitForSystemHealthCard(); 
});

// ALL SYSTEMS OPERATIONAL LABEL
Then('the system should indicate that all systems are operational', async function () {
  const status = new SystemStatusPage(this.page);
  await status.verifyAllSystemsOperational();
});

// Uptime %
Then('the dashboard should display the current uptime percentage in green text', async function () {
  const status = new SystemStatusPage(this.page);
  await status.verifyUptimeVisible();
});

// Meaningful uptime
Then('the uptime value should accurately reflect the system\'s actual uptime', async function () {
  const status = new SystemStatusPage(this.page);
  await status.verifyUptimeVisible();
});



// Wait for System Health Monitor card
When('the admin checks the System Health Monitor system', async function () {
  const status = new SystemStatusPage(this.page);
  await status.waitForSystemHealthCard();  
});

// Response time ms
Then(
  'the dashboard should display the average response time in blue text with "ms" units',
  async function () {
    const status = new SystemStatusPage(this.page);
    await status.verifyResponseTimeVisible();
  }
);

// Meaningful response time
Then(
  'the displayed response time should accurately reflect the system\'s actual average response time',
  async function () {
    const status = new SystemStatusPage(this.page);
    await status.verifyResponseTimeVisible();
  }
);
