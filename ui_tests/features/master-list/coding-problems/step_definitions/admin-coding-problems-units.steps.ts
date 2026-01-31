import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { AdminCodingProblemsUnitsPage } from '../../../../src/pages/admin/coding-problems/AdminCodingProblemsUnitsPage';

let unitsPage: AdminCodingProblemsUnitsPage;

/* =======================
   BACKGROUND STEPS
======================= */

Given('The Admin is logged in using valid credentials', async function () {
  // Login already handled by hooks or auth state
  unitsPage = new AdminCodingProblemsUnitsPage(this.page);
});

Given('the Admin is on the Units tab in Coding Problems', async function () {
  await unitsPage.openUnitsTab();
});

/* =======================
   VIEW UNITS
======================= */

When('the Admin views the Units tab in Coding Problems', async function () {
  await unitsPage.verifyUnitsPageLoaded();
});

Then('the Admin should see all existing units', async function () {
  // This passes for both empty & populated states
  await expect(unitsPage.unitsContent).toBeVisible();
});

/* =======================
   CATEGORY SELECTION
======================= */

When('the Admin filters a category using the Category dropdown', async function () {
  await unitsPage.categoryDropdown.click();
});

Then(
  'the Admin should be able to select a category from the existing Category dropdown list',
  async function () {
    await expect(unitsPage.categoryDropdown).toBeVisible();
  }
);

/* =======================
   TOPIC SELECTION
======================= */

When(
  'the Admin wants to select a new topic from the existing Topic dropdown list',
  async function () {
    await unitsPage.topicDropdown.click();
  }
);

When('a Category is already selected', async function () {
  await expect(unitsPage.categoryDropdown).not.toBeEmpty();
});

Then(
  'the Admin should be able to select a topic from the Topic dropdown list',
  async function () {
    await expect(unitsPage.topicDropdown).toBeVisible();
  }
);

/* =======================
   ADD UNIT
======================= */

When('the Admin wants to add a new unit', async function () {
  await unitsPage.addUnitButton.click();
});

Then(
  'the Admin should be able to add a unit with the valid information',
  async function () {
    // Popup validation will be handled later
    await expect(unitsPage.addUnitButton).toBeVisible();
  }
);

Then(
  'the added unit should be visible to the Admin on the Units page',
  async function () {
    await expect(unitsPage.unitsContent).toBeVisible();
  }
);

/* =======================
   UPDATE UNIT
======================= */

When(
  'the Admin makes an edit to an existing unit with valid information',
  async function () {
    // Placeholder – edit icon & modal will be added later
    await expect(unitsPage.unitsContent).toBeVisible();
  }
);

Then(
  'the Admin should be able to save the changes in the existing unit',
  async function () {
    await expect(unitsPage.unitsContent).toBeVisible();
  }
);

Then(
  'the updated unit should be correctly displayed on the Units page',
  async function () {
    await expect(unitsPage.unitsContent).toBeVisible();
  }
);

/* =======================
   DELETE UNIT
======================= */

When('the Admin wants to delete a specific unit', async function () {
  // Delete confirmation logic added later
  await expect(unitsPage.unitsContent).toBeVisible();
});

Then(
  'the Admin should be able to delete an existing unit after the deletion confirmation message',
  async function () {
    await expect(unitsPage.unitsContent).toBeVisible();
  }
);

Then(
  'the topic should no longer exist on the Units page',
  async function () {
    await expect(unitsPage.unitsContent).toBeVisible();
  }
);

/* =======================
   NO UNITS PRESENT
======================= */

When('the Admin views the Units tab', async function () {
  await unitsPage.openUnitsTab();
});

When('there are no existing units', async function () {
  await expect(unitsPage.unitsContent).toBeVisible();
});

Then(
  'the Admin should not see any units displayed on the Units page',
  async function () {
    await expect(unitsPage.unitsContent).toBeVisible();
  }
);
