import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LogoutPage extends BasePage {
    PROFILE_MENU_LOCATOR = '.MuiAvatar-root'
    SIGNOUT_BUTTON_LOCATOR = 'Sign Out';

    constructor(page: Page) {
        super(page);
    }

    async initiateLogout() {
        await this.page.locator(this.PROFILE_MENU_LOCATOR).first().click();
        await this.page.getByRole('menuitem', { name: 'Sign Out' }).click();
    }

    async isOnLoginPage() {
        await this.page.getByRole('heading', { name: 'Welcome to Percruit' }).click();
        return true;
    }

    async isOnHomePage() {
        await expect (this.page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible({ timeout: 10000 });
    }
       
}