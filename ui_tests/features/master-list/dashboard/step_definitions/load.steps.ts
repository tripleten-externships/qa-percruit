import { Given, When, Then, Before, After } from '@cucumber/cucumber';

Then('they should see a message saying {string} at the top', async function () {
  await this.page!.getByRole('heading', { name: 'Admin Dashboard' }).click();
});

Then('they should see the Usage Analytics section', async function () {
  await this.page!.getByRole('heading', { name: 'Usage Analytics' }).click();
});

Then('they should see the System Health Monitor section', async function () {
  await this.page!.getByRole('heading', { name: 'System Health Monitor' }).click();
});

Then('they should see the Security Center section', async function () {
  await this.page!.getByRole('heading', { name: 'Security Center' }).click();
});