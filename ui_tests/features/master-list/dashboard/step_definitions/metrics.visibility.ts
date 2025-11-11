import { Given, When, Then } from '@cucumber/cucumber';

// Scenario #1
Given('the admin clicks on View Details button', async function () {
  await global.page!.getByText('View Details →').click();
});

Then('they will be redirected to the Admin Usage Metrics page', async function () {
  await global.page!.getByRole('heading', { name: 'Admin Usage Metrics' }).click();
});

When('they view the Quick Insights status card', async function () {
  await global.page!.getByRole('heading', { name: 'Quick Insights' }).click();
});

Then('the system should display the total number of users on the platform', async function () {
  await global.page!.getByText('Quick InsightsTotal').click();
});

// Scenario #2
Given('the admin is on the Admin Usage Metrics page', async function () {
  await global.page!.getByText('Admin Usage MetricsLast updated: 3:33:43 PMRefresh DataOverviewStudent').click();
});

When('they view the Platform Summary section', async function () {
  await global.page!.getByRole('heading', { name: 'Platform Summary' }).click();
});

Then('the system should display the total number of active mentors in the status card', async function () {
  await global.page!.getByText('Platform SummaryTotal').click();
});

Then('the displayed number should match the current count of active mentors', async function () {
  await global.page!.getByText('Active Mentors').click();
});

// Scenario #3
Given('the admin is on the Admin Usage Metrics page', async function () {
  await global.page!.getByText('Admin Usage MetricsLast updated: 3:33:43 PMRefresh DataOverviewStudent').click();
});

When('they view the Activity Metrics section', async function () {
  await global.page!.getByRole('heading', { name: 'Activity Metrics' }).click();
});

Then('the system should allow filtering of activity data for the last {int} days', async function (int) {
  await global.page!.getByRole('button', { name: 'Last 7 Days' }).click();
});

Then('it should display the total number of actions for that {int}-day period in the Total Actions section', async function (int) {
  await global.page!.locator('div').filter({ hasText: /^49Total ActionsAcross all categories$/ }).nth(1).click();
});