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
   this.SEARCH_MENTORS_FIELD = this.page.getByRole('textbox', { name: 'Search career coaches by name' });
   this.NO_MENTORS_FOUND_MESSAGE = this.page.getByRole('heading', { name: 'No career coaches found' })
   this.MENTOR_NAME_HEADINGS = page.getByRole('heading');
    }

//Waits for the mentor page to fully load
    async waitForMentorsPageReady() {
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.SEARCH_MENTORS_FIELD).toBeVisible({ timeout: 100_000 });
    }
//Navigates to the mentor page
    async goToMentorsPage() {
        await this.MENTORS_TAB.click();
    }
//Searches for a mentors name
    async SearchMentors(searchText: string) {
        await this.SEARCH_MENTORS_FIELD.fill('');
        await this.SEARCH_MENTORS_FIELD.fill(searchText);
    }
//Confirms the 'No mentors found' message is visible
    async NoMentorsMessageIsVisible() {
        await expect(this.NO_MENTORS_FOUND_MESSAGE).toBeVisible();
    }
//Confirms the mentor count shown is 0
    async MentorsCountIsZero () {
        await expect(this.MENTOR_NAME_HEADINGS).toHaveCount(0);
    }
//Confirms all mentor names displayed after searching match what was entered in search field
    async allMentorNamesMatch(searchText: string) {
    const mentorNames = this.MENTOR_NAME_HEADINGS;
    const count = await mentorNames.count();

    for (let i = 0; i < count; i++) {
      const name = await this.MENTOR_NAME_HEADINGS.nth(i).innerText();
      expect(name.toLowerCase()).toContain(searchText.toLowerCase());
     }
    }
}



