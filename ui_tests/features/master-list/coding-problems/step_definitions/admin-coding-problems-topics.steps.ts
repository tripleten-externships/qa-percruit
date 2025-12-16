import { When, Then, Before } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { AdminCodingProblemsTopicsPage } from '../../../../src/pages/admin/coding-problems/AdminCodingProblemsTopicsPage';

let topicsPage: AdminCodingProblemsTopicsPage;

Before(async function () {
  topicsPage = new AdminCodingProblemsTopicsPage(this.page);
});

When(
  'the Admin views the Topics page in Coding Problems',
  async function () {
    await topicsPage.openTopicsTab();
  }
);

Then(
  'the all existing topics should be viewable to the Admin',
  async function () {
    const visible = await topicsPage.areTopicsVisible();
    expect(visible).toBeTruthy();
  }
);

