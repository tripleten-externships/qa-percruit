import { Page, expect } from '@playwright/test';
import * as env from '../../config/world';
import { BasePage } from '../common/BasePage';


// Page Object Model (POM) class for the AssignmentPage
export class MentorListPage extends BasePage {
    // Constructor to initialize the page object
    constructor(page: Page) {
        super(page);
} 

async expandMentor() {
    await this.page.locator('button.MuiIconButton-root').click();
}

async expectListNotEmpty() {
    // Wait for the list container to be visible
    await this.page.waitForLoadState('networkidle');
    const firstRowButton = this.page.locator('.mentor-row').first().locator('button[type="button"]');
    await firstRowButton.click();

  // Wait for the list in the same row to appear
    const list = this.page.locator('.mentor-row').first().locator('ul.MuiList-root');
    await expect(list).toBeVisible();

  // Assert it has at least one item
    const items = list.locator('li.MuiListItem-root');
    const itemslist = await items.count();
    await expect(itemslist).toBeGreaterThan(0);
  };
}
  












