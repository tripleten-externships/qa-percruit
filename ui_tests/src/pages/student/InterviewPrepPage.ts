import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class InterviewPrepPage extends BasePage {

    InterviewPrepHeading = '//h4[contains(text(),"Interview Preparation")]';
    ScheduleInterviewButton = '//button[contains(text(),"Schedule Interview")]';
    PeerInterviewOption = '//button[contains(text(),"Peer Interview")]';
    JoinAvailableSessionButton = '//button[contains(text(),"Join Available Session")]';
    CreateNewSessionButton = '//button[contains(text(),"Create New Session")]';



    constructor(page: Page) {
        super(page);
}

    async verifyPage(){
     await expect(this.page.locator(this.InterviewPrepHeading)).toBeVisible();    
    }

    async clickScheduleFirstInterview(){
        await this.page.click(this.ScheduleInterviewButton);
    }

    async selectPeerInterviews(){
        await this.page.click(this.ScheduleInterviewButton)
        await this.page.click(this.PeerInterviewOption); 
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