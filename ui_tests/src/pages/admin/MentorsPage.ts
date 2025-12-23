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
   this.SEARCH_MENTORS_FIELD = this.page.getByRole('textbox', { name: 'Search mentors by name, email' });
   
    }

    async clickMentorsTab() {
        await this.MENTORS_TAB.click();
    }

    async mentorsHeadingIsVisible() {
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.MENTORS_HEADING).toBeVisible();

        /*await this.MENTORS_HEADING.waitFor({ state: 'visible' });
        await expect(this.MENTORS_HEADING).toBeVisible({timeout: 40000});*/
    }

    async clickSearchMentorsField() {
        await this.SEARCH_MENTORS_FIELD.fill('value');
    }
}
