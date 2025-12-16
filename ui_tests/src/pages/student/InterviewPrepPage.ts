import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class InterviewPrepPage extends BasePage {

    InterviewPrepHeading = '//h4[contains(text(),"Interview Preparation")]';
    ScheduleInterviewButton = 'button:has-text("Schedule Interview")';
    PeerInterviewOption = 'li:has-text("Peer Interview")';
    ExpertInterviewOption = 'li:has-text("Expert Interview")';
    AiPracticeOption = 'li:has-text("AI Practice")';
    StartInterviewButton = 'button:has-text("Start Interview")';
    AssignedMentor = 'h5:has-text("Schedule with Your Assigned Mentor")';
    EndInterviewButton = 'button:has-text("End Interview")';
    JoinAvailableSessionButton = 'button:has-text("Join Available Session")';
    CreateNewSessionButton = 'button:has-text("Create New Session")';
    DatePickerIconButton = 'button[aria-label^="Choose date"]';
    DateInputField = 'input[placeholder="MM/DD/YYYY"]';
    TimeInputField = 'input[placeholder="HH:MM"]';
    InterviewTopicField = 'label:has-text("Interview Topic") + input';
    DifficultyLevelDropdown = 'label:has-text("Difficulty Level") + input'
    CreatePeerSession = 'button:has-text("Create Session")';
    UpcomingSessionIcon = 'svg[viewBox="0 0 24 24"]';
    MentorDateInputField = 'input[placeholder="MM/DD/YYYY"]';
    TimeSlotButton = 'button:has-text("12:00 PM")';
    MentorInterviewTopicField = 'label:has-text("Interview Topic") + input';
    MentorScheduleInterviewButton = 'button:has-text("Schedule Interview")';

    constructor(page: Page) {
        super(page);
}

    async verifyPage(){
     await expect(this.page.locator(this.InterviewPrepHeading)).toBeVisible();    
    }

    async clickScheduleInterview(){
        await this.page.click(this.ScheduleInterviewButton);
    }

    async selectInterviewOption(option: 'Peer Interview' | 'Expert Interview' | 'AI Practice') {
        const optionLocator = this.page.locator(`li:has-text("${option}")`);
        await expect(optionLocator).toBeVisible({ timeout: 5000 });
        await optionLocator.click();
    }
    
    async verifyPeerInterviewPage(){
        await expect(this.page.locator(this.JoinAvailableSessionButton)).toBeVisible();
        await expect(this.page.locator(this.CreateNewSessionButton)).toBeVisible();
    }   

    async verifyExpertInterviewPage(){
        await expect(this.page.locator(this.AssignedMentor)).toBeVisible();
    }

    async verifyAIPracticePage(){
        await expect(this.page.locator(this.StartInterviewButton)).toBeVisible();
        await expect(this.page.locator(this.EndInterviewButton)).toBeVisible();
    }

    async clickStartInterview(){
        await this.page.click(this.StartInterviewButton);
    }

    async clickEndInterview(){
        await this.page.click(this.EndInterviewButton);
    }

    async joinAvailableSession(){
        await this.page.click(this.JoinAvailableSessionButton);
    }

    async createNewSession(){
        await this.page.click(this.CreateNewSessionButton);
    }   

    async clickDatePicker(){
        await this.page.click(this.DatePickerIconButton);
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

    async clickCreateNewSession(){
        await this.page.click(this.CreateNewSessionButton);
    }

    async clickCreatePeerSession(){
        await this.page.click(this.CreatePeerSession);
    }

    async verifyUpcomingSession(){
        await expect(this.page.locator(this.UpcomingSessionIcon)).toBeVisible();
    }

    async inputMentorDate(date: string){
        await this.page.fill(this.MentorDateInputField, date);
    }

    async selectTimeSlot(){
        await this.page.click(this.TimeSlotButton);
    }

    async inputMentorInterviewTopic(topic: string){
        await this.page.fill(this.MentorInterviewTopicField, topic);
    }

    async clickMentorScheduleInterview(){
        await this.page.click(this.MentorScheduleInterviewButton);
    }

    async verifyMentorUpcomingSession(){
        await expect(this.page.locator(this.UpcomingSessionIcon)).toBeVisible();
    }

}