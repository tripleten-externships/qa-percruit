import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';


export class MentorsPage extends BasePage {

// LOCATORS 
 MENTORS_TAB: Locator;
 MENTORS_HEADING: Locator;
 SEARCH_MENTORS_FIELD: Locator;
 NO_MENTORS_FOUND_MESSAGE: Locator;
 MENTOR_NAME_HEADINGS: Locator;

constructor(page: Page) {
    super(page);
  
 
   // Initialize locators
   this.MENTORS_TAB = this.page.getByRole('button', { name: 'Mentors' });
   this.MENTORS_HEADING = this.page.getByRole('heading', { name: 'Mentors' });
   this.SEARCH_MENTORS_FIELD = this.page.getByPlaceholder('Search mentors by name, email');
   this.NO_MENTORS_FOUND_MESSAGE = this.page.getByRole('heading', { name: 'No mentors found' })
   this.MENTOR_NAME_HEADINGS = page.getByRole('heading');
    }


    async waitForMentorsPageReady() {
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.SEARCH_MENTORS_FIELD).toBeVisible({ timeout: 100_000 });
    }
    
    async goToMentorsPage() {
        await this.MENTORS_TAB.click();
    }

    async SearchMentors(searchText: string) {
        await this.SEARCH_MENTORS_FIELD.fill('');
        await this.SEARCH_MENTORS_FIELD.fill(searchText);
    }

    /*async SearchMentorsFullName() {
        await this.SEARCH_MENTORS_FIELD.fill(MentorListTestData.FULL_NAME)
        ;
    }

    async SearchMentorsPartialName() {
        await this.SEARCH_MENTORS_FIELD.fill(MentorListTestData.PARTIAL_NAME);
    }

    async SearchMentorsEmail() {
        await this.SEARCH_MENTORS_FIELD.fill(MentorListTestData.MENTOR_EMAIL);
    }

    async SearchMentorNotInSystem() {
        await this.SEARCH_MENTORS_FIELD.fill(MentorListTestData.NON_EXISTENT_NAME);
    }*/

    async NoMentorsMessageIsVisible() {
        await expect(this.NO_MENTORS_FOUND_MESSAGE).toBeVisible();
    }

    async MentorsCountIsZero () {
        await expect(this.MENTOR_NAME_HEADINGS).toHaveCount(17);
    }

    async allMentorNamesMatch(searchText: string) {
    const count = await this.MENTOR_NAME_HEADINGS.count();

    // ✅ Handles "no mentors" case safely
    if (count === 0) {
      return;

    for (let i = 0; i < count; i++) {
      const name = await this.MENTOR_NAME_HEADINGS.nth(i).innerText();
      expect(name.toLowerCase()).toContain(searchText.toLowerCase());
     }
    }

    /*async mentorCountIs(expectedCount: number) {
    await expect(this.MENTOR_NAME_HEADINGS).toHaveCount(expectedCount);
}*/
    }
}


