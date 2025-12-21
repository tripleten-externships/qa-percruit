import { When, Then, Before } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { AdminCodingProblemsTopicsPage } from '../../../../src/pages/admin/coding-problems/AdminCodingProblemsTopicsPage';

let topicsPage: AdminCodingProblemsTopicsPage;

Before(async function () {
  topicsPage = new AdminCodingProblemsTopicsPage(this.page);
});

/* ---------- VIEW TOPICS PAGE ---------- */

When('the Admin views the Topics tab', async function () {
  await topicsPage.openTopicsTab();
});

Then('the Topics heading should be visible', async function () {
  await topicsPage.isTopicsPageVisible();
});

Then('the Select Category dropdown should be visible', async function () {
  await expect(topicsPage.selectCategoryDropdown).toBeVisible();
});

Then('the Add Topic button should be visible', async function () {
  await topicsPage.isAddTopicButtonVisible();
});

/* ---------- FILTER BY CATEGORY ---------- */

When(
  'the Admin filters a topic using the Select Category dropdown',
  async function () {
    await topicsPage.selectCategory('Python');
  }
);

Then(
  'the Admin should be able to add a topic for the selected category',
  async function () {
    await topicsPage.clickAddTopic();

    // Create Topic popup
    await expect(this.page.getByRole('dialog')).toBeVisible();
    await expect(
      this.page.getByRole('heading', { name: 'Create Topic' })
    ).toBeVisible();
  }
);
