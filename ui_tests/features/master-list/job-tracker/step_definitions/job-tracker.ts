import { Given, When, Then } from '@cucumber/cucumber';
import { Page } from 'playwright';
import { expect } from '@playwright/test';
import { LoginPage } from '../../../../src/pages/common/LoginPage';
import { JobTrackerPage } from '../../../../src/pages/student/TrackerDashboardPage';
//const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
/*Given(`the student is authenticated in the system`, () => {
    // [Given] Sets up the initial state of the system.
});
When(`they log in with valid credentials`, () => {
    // [When] Describes the action or event that triggers the scenario.
});
When(`select {string} from features list`, (arg0: string) => {
    // [When] Describes the action or event that triggers the scenario.
});*/
Then(`see the dashboard loads correctly`, async function () {
    // [Then] Describes the expected outcome or result of the scenario.
    await expect(this.page.locator("//*[@id='root']//main//div[contains(@class,'MuiBox-root')]")).toBeVisible();
    await expect(this.page.locator('main h4', { hasText: 'Job Tracker' })).toBeVisible();
    await expect(this.page.locator("//div[contains(@class,'MuiTextField-root')]//input[@type='text']")).toBeVisible();
    await expect(this.page.locator("//button[contains(.,'Bookmarked')]")).toBeVisible();
    await expect(this.page.locator("//button[contains(.,'Applied')]")).toBeVisible();
    await expect(this.page.locator("//button[contains(.,'Interviewing')]")).toBeVisible();
    await expect(this.page.locator("//button[contains(.,'Negotiating')]")).toBeVisible();
    await expect(this.page.locator("//button[contains(.,'Offer Received')]")).toBeVisible();
    await expect(this.page.locator("//div[contains(@class,'MuiPaper-root')]//table")).toBeVisible();
});
Then(`the dashboard should not load successfully`, async function () {
    // [Then] Describes the expected outcome or result of the scenario.
    await expect(this.page.locator("//*[@id='root']//main//div[contains(@class,'MuiBox-root')]")).not.toBeVisible({ timeout: 10000 });
});
Then(`an error message should be displayed to the student`, async function () {
    // [Then] Describes the expected outcome or result of the scenario.
    const errorMessage = this.page.locator('#job-tracker-error-message');
    expect(errorMessage).toBeVisible();
    expect(errorMessage).toHaveText('Unable to load Job Tracker data. Please try again later.');
});
Then(`the application tracker should not be accessible`, async function () {
    // [Then] Describes the expected outcome or result of the scenario.
    const dashboard = this.page.locator("//*[@id='root']//main//div[contains(@class,'MuiBox-root')]");
    expect(dashboard).not.toBeVisible();
});
Then(`the dashboard should load partially`, async function () {
    // [Then] Describes the expected outcome or result of the scenario.
    await expect(this.page.locator("//*[@id='root']//main//div[contains(@class,'MuiBox-root')]")).toBeVisible();
    await expect(this.page.locator("//div[contains(@class,'MuiPaper-root')]//table")).not.toBeVisible();
});
Then(`required UI components \(such as status tiles or application list) should be missing`, async function () {
    // [Then] Describes the expected outcome or result of the scenario.
    await expect(this.page.locator("//button[contains(.,'Bookmarked')]")).not.toBeVisible();
    await expect(this.page.locator("//button[contains(.,'Applied')]")).not.toBeVisible();
    await expect(this.page.locator("//button[contains(.,'Interviewing')]")).not.toBeVisible();
    await expect(this.page.locator("//button[contains(.,'Negotiating')]")).not.toBeVisible();
    await expect(this.page.locator("//button[contains(.,'Offer Received')]")).not.toBeVisible();
});
Then(`a warning or fallback message should be displayed`, async function () {
    // [Then] Describes the expected outcome or result of the scenario.
    const warningMessage = this.page.locator('#job-tracker-warning-message');
    expect(warningMessage).toBeVisible();
    expect(warningMessage).toHaveText('Some features of the Job Tracker are currently unavailable. Please try again later.');
});
Then(`the student should not be able to fully access their application tracker`, async function () {
    // [Then] Describes the expected outcome or result of the scenario.
    const dashboard = this.page.locator("//*[@id='root']//main//div[contains(@class,'MuiBox-root')]");
    expect(dashboard).toBeVisible();
    const jobsTable = this.page.locator("//div[contains(@class,'MuiPaper-root')]//table");
    expect(jobsTable).not.toBeVisible();
});
Then(`the dashboard should load correctly`, async function () {
    // [Then] Describes the expected outcome or result of the scenario.
    await expect(this.page.locator("//*[@id='root']//main//div[contains(@class,'MuiBox-root')]")).toBeVisible();
});
Then(`the application tracker data should fail to load`, async function () {
    // [Then] Describes the expected outcome or result of the scenario.
    const jobsTable = this.page.locator("//div[contains(@class,'MuiPaper-root')]//table");
    expect(jobsTable).not.toBeVisible();
});
Then(`an error message should be shown indicating data retrieval failed`, async function () {
    // [Then] Describes the expected outcome or result of the scenario.
    const errorMessage = this.page.locator('#job-tracker-error-message');
    expect(errorMessage).toBeVisible();
    expect(errorMessage).toHaveText('Failed to retrieve Job Tracker data. Please try again later.');
});
Then(`the student should not be able to see their list of applications`, async function () {
    // [Then] Describes the expected outcome or result of the scenario.
    const jobsTable = this.page.locator("//div[contains(@class,'MuiPaper-root')]//table");
    expect(jobsTable).not.toBeVisible();
});
When(`they attempt to select {string} from the features list`, (arg0: string) => {
    // [When] Describes the action or event that triggers the scenario.
});
Then(`a message should appear indicating the Job Tracker service is currently unavailable`, async function () {
    // [Then] Describes the expected outcome or result of the scenario.
    const serviceUnavailableMessage = this.page.locator('#job-tracker-service-unavailable-message');
    expect(serviceUnavailableMessage).toBeVisible();
    expect(serviceUnavailableMessage).toHaveText('The Job Tracker service is currently unavailable. Please try again later.');
});
Then(`the dashboard should not load`, async function () {
    // [Then] Describes the expected outcome or result of the scenario.
    const dashboard = this.page.locator("//*[@id='root']//main//div[contains(@class,'MuiBox-root')]");
    expect(dashboard).not.toBeVisible();
});
Then(`no application tracker information should be displayed`, async function () {
    // [Then] Describes the expected outcome or result of the scenario.
    const jobsTable = this.page.locator("//div[contains(@class,'MuiPaper-root')]//table");
    expect(jobsTable).not.toBeVisible();
});
