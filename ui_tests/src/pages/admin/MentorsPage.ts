import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class MentorsPage extends BasePage {

// LOCATORS 
 MENTORS_TAB!: Locator;
 MENTORS_HEADING!: Locator;
 SEARCH_MENTORS_FIELD!: Locator;


constructor(page: Page) {
    super(page);
  
 
   // Initialize locators
   this.MENTORS_TAB = this.page.getByRole('button', { name: 'Mentors' });
   this.MENTORS_HEADING = this.page.getByRole('heading', { name: 'Mentors' });
   this.SEARCH_MENTORS_FIELD = this.page.getByPlaceholder('Search mentors by name, email');
   
    }


    async waitForMentorsPageReady() {
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.SEARCH_MENTORS_FIELD).toBeVisible({ timeout: 100_000 });
    }
    
    async goToMentorsPage() {
        await this.MENTORS_TAB.click();
    }

    async clickSearchMentorsField() {
        await this.SEARCH_MENTORS_FIELD.fill('value');
    }

}

