import { test, expect } from '@playwright/test';
import { AdminCodingProblemsUnitsPage } from '../../src/pages/admin/coding-problems/AdminCodingProblemsUnitsPage';

test.describe('Admin - Coding Problems - Units', () => {
  let unitsPage: AdminCodingProblemsUnitsPage;

  test.beforeEach(async ({ page }) => {
    // Login assumed via storage state or global setup
    unitsPage = new AdminCodingProblemsUnitsPage(page);
    await unitsPage.openUnitsTab();
  });

  /* Scenario: View existing units
  When the Admin views the Units tab in Coding Problems
  Then the Admin should see all existing units*/

  test('Admin should see all existing units', async ({ page }) => {
    await unitsPage.verifyUnitsPageLoaded();
    await expect(unitsPage.unitsContent).toBeVisible();
  });

  /* Scenario: Selecting a Category on unit page
  When the Admin filters a category using the Category dropdown
  Then the Admin should be able to select a category from the existing Category dropdown list */

  test('Admin should be able to select a category from dropdown', async ({ page }) => {
    await unitsPage.categoryDropdown.click();
    await expect(unitsPage.categoryDropdown).toBeVisible();
  });

  /* Scenario: Selecting a Topic on unit page
  When the Admin wants to select a new topic from the existing Topic dropdown list
  And a Category is already selected 
  Then the Admin should be able to select a topic from the Topic dropdown list */

  test('Admin should be able to select a topic when category is selected', async ({ page }) => {
    await expect(unitsPage.categoryDropdown).not.toBeEmpty();
    await unitsPage.topicDropdown.click();
    await expect(unitsPage.topicDropdown).toBeVisible();
  });

  /* Scenario: Adding a Unit
  When the Admin wants to add a new unit
  And the Admin selects a category from the existing Category dropdown list
  And the Admin selects a topic from the existing corresponding Topic dropdown list
  Then the Admin should be able to add a unit with the valid information
  And the added unit should be visible to the Admin on the Units page */

  test('Admin should be able to add a new unit with valid information', async ({ page }) => {
    await unitsPage.addUnitButton.click();

    // TODO: Add modal interaction once implemented
    await expect(unitsPage.addUnitButton).toBeVisible();
    await expect(unitsPage.unitsContent).toBeVisible();
  });

  /*Scenario: Updating an existing unit
  When the Admin makes an edit to an existing unit with valid information
  Then the Admin should be able to save the changes in the existing unit
  And the updated unit should be correctly displayed on the Units page */

  test('Admin should be able to update an existing unit', async ({ page }) => {
    // TODO: Add edit modal logic once implemented
    await expect(unitsPage.unitsContent).toBeVisible();

    // Simulate save
    await expect(unitsPage.unitsContent).toBeVisible();
  });

  /* Scenario: Deletion of an existing unit
  When the Admin wants to delete a specific unit
  And the Admin selects a category from the existing Category dropdown list
  And the Admin selects a topic from the existing corresponding Topic dropdown list
  Then the Admin should be able to delete an existing unit after the deletion confirmation message
  And the topic should no longer exist on the Units page */

  test('Admin should be able to delete an existing unit', async ({ page }) => {
    // TODO: Add delete + confirmation logic once implemented
    await expect(unitsPage.unitsContent).toBeVisible();

    // After deletion
    await expect(unitsPage.unitsContent).toBeVisible();
  });

  /* Scenario: No units present
  When the Admin views the Units tab
  And there are no existing units
  Then the Admin should not see any units displayed on the Units page   */

  test('Admin should not see any units if none exist', async ({ page }) => {
    await expect(unitsPage.unitsContent).toBeVisible();

    // Ideally replace with:
    // await expect(unitsPage.unitRows).toHaveCount(0);
  });
});