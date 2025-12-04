import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class InterviewPrepPage extends BasePage {

     InterviewPrepHeading = '//h4[text() = "🎯 Interview Preparation"]';
     WelcomeSign = '//h5[text() = "Welcome to Interview Preparation"]';

    constructor(page: Page) {
        super(page);
}

    async verifyPage(){
     await expect(this.page.locator(this.InterviewPrepHeading)).toBeVisible();
     await expect(this.page.locator(this.WelcomeSign)).toBeVisible();
    
    }

}