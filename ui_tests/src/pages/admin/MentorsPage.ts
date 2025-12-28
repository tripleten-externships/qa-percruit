import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import * as MentorListTestData from '../../test-data/MentorListTestData';

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

    async SearchMentorsFullName() {
        await this.SEARCH_MENTORS_FIELD.fill(MentorListTestData.FULL_NAME);
    }

    async SearchMentorsPartialName() {
        await this.SEARCH_MENTORS_FIELD.fill(MentorListTestData.PARTIAL_NAME);
    }

    async SearchMentorsEmail() {
        await this.SEARCH_MENTORS_FIELD.fill(MentorListTestData.MENTOR_EMAIL);
    }

    async SearchMentorNotInSystem() {
        await this.SEARCH_MENTORS_FIELD.fill(MentorListTestData.NON_EXISTENT_NAME);
    }

    async 

}

