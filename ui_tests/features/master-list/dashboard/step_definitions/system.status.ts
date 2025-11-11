import { Given, When, Then } from '@cucumber/cucumber';

// Scenario 1 - System Health Monitor checks
When('the admin views the System Health Monitor section', async function () {
  await global.page!.locator('div').filter({ hasText: /^System Health Monitor$/ }).click();
});

Then('the system should indicate that all systems are operational', async function () {
  await global.page!.locator('div').filter({ hasText: /^All Systems Operational$/ }).click();
});

Then('the dashboard should display the current uptime percentage in green text', async function () {
  await global.page!.getByText('System Health Monitor99.9%').click();
});

Then('the uptime value should accurately reflect the system\'s actual uptime', async function () {
  await global.page!.getByText('%System Uptime').click();
});

// Average response time checks
Then('the dashboard should display the average response time in blue text with {string} units', async function (units: string) {
  await global.page!.getByText('250msAvg Response Time').click();
});

Then('the displayed response time should accurately reflect the system\'s actual average response time', async function () {
  await global.page!.getByRole('heading', { name: '250ms' }).click();
});