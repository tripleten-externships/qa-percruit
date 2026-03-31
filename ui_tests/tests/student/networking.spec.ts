import { test, expect } from '@playwright/test';
import { NetworkingPage } from '../../src/pages/student/NetworkingPage';
import { LoginPage } from '../../src/pages/common/LoginPage';
import * as env from '../../src/config/world';

test.describe('Student Networking Feature', () => {
    let loginPage: LoginPage;
    let networkingPage: NetworkingPage;
    const baseUrl = env.getBaseUrl();

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        networkingPage = new NetworkingPage(page);
        // Navigate to the application
        await page.goto(baseUrl);
        // Handle cookie consent if it appears
        const cookieButton = page.locator('button:has-text("Accept all cookies")');
        if (await cookieButton.isVisible()) {
            await cookieButton.click();
        }
        //Log in as student
        await loginPage.loginAsUserType('student');

    });

    test('should be able to load the networking page', async ({ page }) => {
        await networkingPage.navigateToNetworkingPage();
        await networkingPage.verifyNetworkingPageLoaded();
    });

});
