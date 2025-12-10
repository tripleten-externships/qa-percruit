import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class InterviewPrepPage extends BasePage {

    InterviewPrepHeading = '//h4[contains(text(),"Interview Preparation")]';
    ScheduleInterviewButton = 'button:has-text("Schedule Interview")';
    PeerInterviewOption = 'li:has-text("Peer Interview")';
    JoinAvailableSessionButton = 'button:has-text("Join Available Session")';
    CreateNewSessionButton = 'button:has-text("Create New Session")';
    DateInputField = 'input[placeholder="MM/DD/YYYY"]';
    TimeInputField = 'input[placeholder="HH:MM"]';
    InterviewTopicField = 'label:has-text("Interview Topic") + input';
    DifficultyLevelDropdown = 'label:has-text("Difficulty Level") + input'
    CreateSessionButton = 'button:has-text("Create Session")';
    UpcomingSessionsList = '#upcoming-sessions-list';

    constructor(page: Page) {
        super(page);
}

    async verifyPage(){
     await expect(this.page.locator(this.InterviewPrepHeading)).toBeVisible();    
    }

    async clickScheduleInterview(){
        await this.page.click(this.ScheduleInterviewButton);
    }

    async selectPeerInterview(){
        await expect(this.page.locator(this.PeerInterviewOption)).toBeVisible();
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

    async inputDate(date: string){
        await this.page.fill(this.DateInputField, date);
    }  

    async inputTime(time: string){
        await this.page.fill(this.TimeInputField, time);
    }

    async inputInterviewTopic(topic: string){
        await this.page.fill(this.InterviewTopicField, topic);
    }

    async selectDifficultyLevel(level: string){
        await this.page.click(this.DifficultyLevelDropdown);
        await this.page.click(`li:has-text("${level}")`);
    }   

    async clickCreateSession(){
        await this.page.click(this.CreateSessionButton);
    }

    async verifySessionInUpcomingList(topic: string, date: string, time: string){
        const sessionLocator = this.page.locator(this.UpcomingSessionsList).locator(`text=${topic} >> text=${date} >> text=${time}`);
        await expect(sessionLocator).toBeVisible();
    }
}