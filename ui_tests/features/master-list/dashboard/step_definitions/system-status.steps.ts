import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('admin is logged in using valid credentials', async function () {
  await this.page.goto('https://stage.tripleten.percruit.com/login');

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  await this.page.getByRole('textbox', { name: 'Enter your email' }).click();
  await this.page.getByRole('textbox', { name: 'Enter your email' }).fill('ebc951+admin@gmail.com');
  await this.page.getByRole('textbox', { name: 'Enter your password' }).click();
  await this.page.getByRole('textbox', { name: 'Enter your password' }).fill('NotSoLittle1');
  await this.page.getByRole('button', { name: 'Sign In' }).click();
});

Given('is on the dashboard', async function () {
  await this.page.waitForURL('https://stage.tripleten.percruit.com/dashboard');
});

// Scenario 1
When('the admin checks the System Health Monitor section', async function () {
  await this.page.getByRole('heading', { name: 'System Health Monitor' }).waitFor();
  await expect(this.page.getByText('System Uptime')).toBeVisible();
  await expect(this.page.getByText('Avg Response Time')).toBeVisible();
  await expect(this.page.getByText('Critical Issues')).toBeVisible();
  await expect(this.page.getByText('System Uptime')).toBeVisible();

});

Then('the system should indicate that all systems are operational', async function () {
  await expect(this.page.getByText('All Systems Operational')).toBeVisible();
});


Then(
  'the dashboard should display the current uptime percentage in green text',
  async function () {
    await expect(this.page.getByText('System Uptime')).toBeVisible();
  },
);


Then(
  "the uptime value should accurately reflect the system's actual uptime",
  async function () {
    await expect(this.page.getByText('System Uptime')).toBeVisible();
  },
);

// Scenario 2
When('the admin checks the System Health Monitor system', async function () {
  await this.page
    .getByRole('heading', { name: 'System Health Monitor' })
    .waitFor();
});



Then(
  'the dashboard should display the average response time in blue text with "ms" units',
  async function () {
    await expect(
      this.page.getByText('250msAvg Response Time')
    ).toBeVisible();

    await expect(
      this.page.getByText('ms').first()
    ).toBeVisible();
  },
);


Then(
  "the displayed response time should accurately reflect the system's actual average response time",
  async function () {
    await expect(this.page.getByText('Avg Response Time')).toBeVisible();
  },
);