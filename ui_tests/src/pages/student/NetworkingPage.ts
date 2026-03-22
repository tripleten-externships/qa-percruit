import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class NetworkingPage extends BasePage {
    readonly networkingSidbarLink: Locator;
    readonly contactNavigationPanel: Locator;
    readonly searchInput: Locator;
    readonly addContactButton: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly linkedinInput: Locator;
    readonly detailsPanel: Locator;
    readonly deleteButton: Locator;
    readonly confirmRemoveButton: Locator;
    readonly industryFilter: Locator;

    constructor(page: Page) {
        super(page);
        this.networkingSidbarLink = page.getByRole('link', { name: 'Networking' });
        this.contactNavigationPanel = page.locator('div').filter({ hasText: /^AllFavoritesFollow-up \(0\)NewFilters$/ }).first()
        this.searchInput = page.getByRole('textbox', { name: 'Search contacts...' })
        this.addContactButton = page.getByRole('button', { name: 'Add Contact' });
        this.nameInput = page.getByRole('textbox', { name: 'Full Name' })
        this.emailInput = page.getByRole('textbox', { name: 'Email' })
        this.phoneInput = page.getByRole('textbox', { name: 'Phone' })
        this.linkedinInput = page.getByRole('textbox', { name: 'LinkedIn URL' })
        this.detailsPanel = page.locator('[data-testid="connection-details"]');
        this.deleteButton = page.getByRole('menuitem', { name: 'Delete' })
        this.confirmRemoveButton = page.locator('[data-testid="confirm-remove"]');
        this.industryFilter = page.locator('[data-testid="industry-filter"]');
    }

    async navigateToNetworkingPage() {
        await this.networkingSidbarLink.click();
    }
    //velify navigate to networking page and loading the page correctly
    async verifyNetworkingPageLoaded() {
        await expect(this.page.getByRole('heading', { name: 'Networking' })).toBeVisible();
    }
}
