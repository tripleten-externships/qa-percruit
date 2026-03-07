import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class CookiesPolicyPage extends BasePage {

    constructor(page: Page) {
    super(page);

    }

    // Cookie policy banner locator
    readonly cookieBanner = this.page.getByText('This website uses cookies', { exact: false });

    // Close button locator (assuming it's a button with an "×" text)
    // readonly closeButton = this.page.getByRole('button', { name: '×' });
    readonly closeButton = this.page.getByRole('button', { name: '\u00D7' });
    // Accept Cookies button
    // readonly closeButton = this.page.getByRole('button', { name: 'Accept Cookies' });

    async isCookieBannerVisible(): Promise<boolean> {
        return await this.cookieBanner.isVisible();
    }

    async closeCookieBanner(): Promise<void> {
        // Wait briefly for banner to appear (do not fail if it doesn't)
        await this.cookieBanner.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

        if (await this.cookieBanner.isVisible()) {
            await this.closeButton.click();
            await expect(this.cookieBanner).not.toBeVisible({ timeout: 5000 });
        }
    }



    // // Method to check if the cookie banner is visible
    // async isCookieBannerVisible(): Promise<boolean> {
    //     return await this.cookieBanner.isVisible({ timeout: 5000 });
    // }

    // /**
    //  * Method to close the cookie banner if it appears.
    //  * - Waits briefly for the banner to show up
    //  * - Does NOT fail if the banner never appears
    //  * - Ensures the banner is fully dismissed before continuing
    //  */
    // async closeCookieBanner(): Promise<void> {
    //     // Give the banner a moment to appear (but don't fail if it doesn't)
    //     await this.cookieBanner.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

    //     if (await this.cookieBanner.isVisible()) {
    //         await this.closeButton.click();
    //         await expect(this.cookieBanner).not.toBeVisible({ timeout: 5000 });
    //     }

    // }

}