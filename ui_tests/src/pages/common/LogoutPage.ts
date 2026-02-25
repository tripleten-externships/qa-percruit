import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LogoutPage extends BasePage {
    PROFILE_MENU_LOCATOR = '.MuiAvatar-root'
    SIGNOUT_BUTTON_LOCATOR = 'Sign Out';

    constructor(page: Page) {
        super(page);
    }
    //clicks profile icon and sign out menu item to initiate logout
    async initiateLogout() {
        await this.page.locator(this.PROFILE_MENU_LOCATOR).first().click();
        await this.page.getByRole('menuitem', { name: 'Sign Out' }).click();
    }
    //confirms user is on the login page, Welcome message is visible
    async isOnLoginPage() {
        await this.page.getByRole('heading', { name: 'Welcome to Percruit' }).click();
        return true;
    }
    //confirms admin dashboard text is visible
    async isOnHomePage() {
        await expect(this.page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible({ timeout: 30000 });
    }
    //checks admin dashboard text is no longer visible to confirm a successful logout
    async noLongerOnDashboard() {
        const locator = this.page.locator('Admin Dashboard');
            await expect(locator).toBeHidden();
    }
}