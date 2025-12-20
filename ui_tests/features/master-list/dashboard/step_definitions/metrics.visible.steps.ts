import { expect, Page } from '@playwright/test';
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';
import { Given, Then, When } from '@cucumber/cucumber';
declare const page: Page;

Given('the admin is on the Admin Usage Metrics page', async function () {

await page.getByRole('button', { name: 'Usage Metrics' }).click();
});

When('they check the Quick insights status card', async function () {
await page.getByText('Quick InsightsTotal').click();
});

Then('the system should display the total number of users on the platform', async function () {

});



Given('the admin is on the Admin Usage Metrics page', async function () {
await page.getByRole('button', { name: 'Usage Metrics' }).click();
});

When('they view the Platform Summary section', async function () {

await page.getByText('Platform SummaryTotal').click();
});

Then('the system should display the total number of active mentors in the status card', async function () {

});

Then('the displayed number should match the current count of active mentors', async function () {

});



Given('the admin is on the Admin Usage Metrics page', async function () {
await page.getByRole('button', { name: 'Usage Metrics' }).click();
});

When('they view the Activity Metrics section', async function () {

await page.getByText('15Unique User LoginsUnique users today0Resume ActionsUploads & edits0Job').click();

await page.getByRole('button').click();
});

Then('the system should allow filtering activity data for the last 7 days', async function () {

});

Then('display the total number of actions for that 7-day period in the Total Actions section', async function () {

});
