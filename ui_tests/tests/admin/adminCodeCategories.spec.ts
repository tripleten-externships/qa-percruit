// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect, BrowserContext, test} from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
import { LoginPage } from '../../src/pages/common/LoginPage';

test.describe('Admin Coding Categories', () => {
    // Before hook: Launch a new browser and page before each scenario and initialize page objects
    test('should display all categories and verify UI elements', async ({ page }) => {
        await page.goto(env.getBaseUrl() + 'admin/coding-problems');
        await expect(page.locator('//button[text()="Add Category"]')).toBeVisible();
        await expect(page.locator('//h4[text()="Coding Practice Administration"]')).toBeVisible();
        const categoryHeadings = page.locator('h6.MuiTypography-h6');
        await expect(categoryHeadings.first()).toBeVisible();
        // Log or count how many categories are visible
        const count = await categoryHeadings.count();
        console.log(`✅ ${count} categories are visible on the Categories tab.`);
        // Optional: assert that at least one category exists
        expect(count).toBeGreaterThan(0)
    });

});
