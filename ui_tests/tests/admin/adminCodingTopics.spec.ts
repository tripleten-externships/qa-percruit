// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect, BrowserContext, test } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { AdminCodingProblemsTopicsPage } from '../../src/pages/admin/coding-problems/AdminCodingProblemsTopicsPage';

// Declare variables to hold browser, page, and page object instances
let topicsPage: AdminCodingProblemsTopicsPage;

test.describe('Admin Coding Topics', () => {
    // Before hook: Launch a new browser and page before each scenario and initialize page objects
    test.beforeEach(async ({ page }) => {
        topicsPage = new AdminCodingProblemsTopicsPage(page);
    });
    /*Scenario:  View Topics page elements
        When the Admin views the Topics tab
        Then the Topics heading should be visible
        And the Select Category dropdown should be visible
        And the Add Topic button should be visible*/
    test('the user navigates to the Coding Topics page and coding topics page displays', async ({ page }) => {
        await topicsPage.contentManagementButton.click();
        await topicsPage.codingCoursesButton.click();
        await topicsPage.openTopicsTab();
        await topicsPage.openTopicsTab();
        await topicsPage.isTopicsPageVisible();
        await page.getByRole('combobox').click();
        await topicsPage.isAddTopicButtonVisible();
    });

});
