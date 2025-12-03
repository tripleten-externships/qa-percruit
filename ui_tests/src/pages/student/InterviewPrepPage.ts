import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class InterviewPrepPage extends BasePage {

     InterviewPrepHeading = '//h5[text() = "Interview Preparation"]';
     PeerInterviews = '//button[.//p[text()="Peer Interviews"]]';
     ExpertInterviews = '//button[.//p[text()="Expert Interviews"]]';
     AIInterviews = '//button[.//p[text()="AI Interviews"]]';

    constructor(page: Page) {
        super(page);
}

    async verifyPage(){
     await expect(this.page.locator(this.InterviewPrepHeading)).toBeVisible();
     await expect(this.page.locator(this.PeerInterviews)).toBeVisible();
     await expect(this.page.locator(this.ExpertInterviews)).toBeVisible();
     await expect(this.page.locator(this.AIInterviews)).toBeVisible();
    
    }

}