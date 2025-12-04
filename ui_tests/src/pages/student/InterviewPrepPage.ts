import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class InterviewPrepPage extends BasePage {

    InterviewPrepHeading = '//h4[contains(text(),"Interview Preparation")]';
    WelcomeSign = '//h5[contains(text(), "Welcome to Interview Preparation")]';
    ScheduleFirstInterviewButton = '//button[contains(text(),"Schedule Your First Interview")]';
    PeerInterviewsOption = '//button[contains(text(),"Peer Interviews")]';
    JoinAvailableSessionButton = '//button[contains(text(),"Join Available Session")]';
    CreateNewSessionButton = '//button[contains(text(),"Create New Session")]';



    constructor(page: Page) {
        super(page);
}

    async verifyPage(){
     await expect(this.page.locator(this.InterviewPrepHeading)).toBeVisible();
     await expect(this.page.locator(this.WelcomeSign)).toBeVisible();
    
    }

    async clickScheduleFirstInterview(){
        await this.page.click(this.ScheduleFirstInterviewButton);
    }

    async selectPeerInterviews(){
        await this.page.click(this.ScheduleFirstInterviewButton)
        await this.page.click(this.PeerInterviewsOption); 
    }

    async joinAvailableSession(){
        await this.page.click(this.JoinAvailableSessionButton);
    }

    async createNewSession(){
        await this.page.click(this.CreateNewSessionButton);
    }   

    async verifyPeerInterviewsPage(){
        await expect(this.page.locator(this.JoinAvailableSessionButton)).toBeVisible();
        await expect(this.page.locator(this.CreateNewSessionButton)).toBeVisible();
    }

}