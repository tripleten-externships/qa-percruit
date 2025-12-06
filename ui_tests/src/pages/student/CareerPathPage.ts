import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class CareerPathPage extends BasePage {

    CareerPathHeading = '//h5[text() = "Career Path Advisor"]';
    CareerJourneySection = '//h5[text()="Your Career Journey"]';
    CareerMentorshipSection = '//h4[normalize-space()="Career Mentorship"]';

  constructor(page: Page) {
    super(page);
  }

  async verifyPage(){
    await expect(this.page.locator(this.CareerPathHeading)).toBeVisible();
    await expect(this.page.locator(this.CareerJourneySection)).toBeVisible();
    await expect(this.page.locator(this.CareerMentorshipSection)).toBeVisible();
    
  }

}