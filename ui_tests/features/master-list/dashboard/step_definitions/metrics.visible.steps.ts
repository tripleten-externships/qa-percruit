import { expect, Page } from '@playwright/test';
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';
import { Given, Then, When } from '@cucumber/cucumber';
declare const page: Page;

Given('the admin is on the Admin Usage Metrics page', async function () {
await page.getByRole('button', { name: 'Usage Metrics' }).click();
await expect(this.page.getByRole('heading', { name: 'Admin Usage Metrics'})).toBeVisible();
});

When('they check the Quick insights status card', async function () {
await (this.page.getByRole('heading', { name: 'Quick Insights'})).isVisible();
await expect(this.page.getByRole('heading', { name: 'Quick Insights'})).toBeVisible();
});

Then('the system should display the total number of users on the platform', async function () {
let totalStudent = localStorage.extractthevlue(this.page.getByText('TotalStudents'));
let totalMentor = localStorage.extractthevlue(this.page.getByText('Active Mentors'));
let totalUsers = totalStudent + totalMentor;
await expect(this.page.getByText('totalUsers')).toBe(totalMentor + totalStudent);
});



Given('the admin is on the Admin Usage Metrics page', async function () {
await page.getByRole('button', { name: 'Usage Metrics' }).click();
await expect(this.page.getByRole('heading', { name: 'Admin Usage Metrics'})).toBeVisible();
});

When('they view the Platform Summary section', async function () {
await (this.page.getByRole('heading', { name: 'Platform Summary'})).isVisible();
await expect(this.page.getByRole('heading', { name: 'Platform Summary'})).toBeVisible();
});

Then('the system should display the total number of active mentors in the status card', async function () {
await (this.page.getByText('Active Mentors')).isVisible();
await expect(this.page.getByText('Active Mentors')).toBeVisible();
});

Then('the displayed number should match the current count of active mentors', async function () {

});



Given('the admin is on the Admin Usage Metrics page', async function () {
await page.getByRole('button', { name: 'Usage Metrics' }).click();
await expect(this.page.getByRole('heading', { name: 'Admin Usage Metrics'})).toBeVisible();
});

When('they view the Activity Metrics section', async function () {
await (this.page.locator('MuiBox-root.css-8f57v9')).isVisible();
await expect(this.page.locator('MuiBox-root.css-8f57v9')).toBeVisible();
});

Then('the system should allow filtering activity data for the last 7 days', async function () {
await page.getByRole('button', { name: 'Last 7 Days' }).click();
await (this.page.getByText('Last 7 Days • Dec 14 - Dec')).isVisible();
await expect(this.page.locator('Last 7 Days • Dec 14 - Dec')).toBeVisible();
});

Then('display the total number of actions for that 7-day period in the Total Actions section', async function () {
await (this.page.getByText('Unique User Logins')).isVisible();
await expect(this.page.getByText('Unique User Logins')).toBeVisible();
await (this.page.getByText('Resume Actions')).isVisible();
await expect(this.page.getByText('Resume Actions')).toBeVisible();
await (this.page.getByText('Job Applications')).isVisible();
await expect(this.page.getByText('Job Applications')).toBeVisible();
await (this.page.getByText('Interviews Scheduled')).isVisible();
await expect(this.page.getByText('Interviews Scheduled')).toBeVisible();
await (this.page.getByText('Interviews Completed')).isVisible();
await expect(this.page.getByText('Interviews Completed')).toBeVisible();
await (this.page.getByText('Messaged Exchanged')).isVisible();
await expect(this.page.getByText('Messaged Exchanged')).toBeVisible();
await (this.page.getByText('Total Actions')).isVisible();
await expect(this.page.getByText('Actions')).toBeVisible();
});



