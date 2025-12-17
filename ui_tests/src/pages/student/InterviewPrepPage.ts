import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class InterviewPrepPage extends BasePage {

    // Interview Prep Page Locators
    InterviewPrepHeading = '//h4[contains(text(),"Interview Preparation")]';
    ScheduleInterviewButton = 'button:has-text("Schedule Interview")';
    PeerInterviewOption = 'li:has-text("Peer Interview")';
    ExpertInterviewOption = 'li:has-text("Expert Interview")';
    AIPracticeOption = 'li:has-text("AI Practice")';
    UpcomingSessionIcon = 'svg[aria-label="Upcoming Session"]';

    // Peer Interview Page Locators
    JoinAvailableSessionButton = 'button:has-text("Join Available Session")';
    CreateNewSessionButton = 'button:has-text("Create New Session")';
    DatePickerIconButton = 'button[aria-label^="Choose date"]';
    DateInputField = 'input[placeholder="MM/DD/YYYY"]';
    PeerTimePicker = 'button[aria-label^="Choose time"]';
    QuickSelectTime = (time: string) => `span.MuiChip-label:has-text("${time}")`;
    SetTimeButton = 'button:has-text("Set Time")';
    InterviewTopicField = 'label:has-text("Interview Topic") + input';
    DifficultyLevelDropdown = 'label:has-text("Difficulty Level") + input'
    CreatePeerSession = 'button:has-text("Create Session")';

    // Expert Interview Page Locators
    AssignedMentor = 'h5:has-text("Schedule with Your Assigned Mentor")';
    MentorDate = 'input[placeholder="MM/DD/YYYY"]';
    TimeSlotButton = 'button:has-text("${time}")';
    MentorInterviewTopicField = 'label:has-text("Interview Topic") + input';
    MentorScheduleInterviewButton = 'button:has-text("Schedule Interview")';
    NextButton = 'button:has-text("Next")';

    // AI Practice Page Locators
    StartInterviewButton = 'button:has-text("Start Interview")';
    EndInterviewButton = 'button:has-text("End Interview")';

    constructor(page: Page) {
        super(page);
    }

// Interview Prep Page
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

    async verifyUpcomingSession(){
        await expect(this.page.locator(this.UpcomingSessionIcon)).toBeVisible();
    }

// Different Interview Pages verification
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

// Peer Interview Session Creation
    async joinAvailableSession(){
        await this.page.click(this.JoinAvailableSessionButton);
    }

    async clickCreateNewSession(){
        await this.page.click(this.CreateNewSessionButton);
    }

    async clickDatePicker(){
        await this.page.click(this.DatePickerIconButton);
    }
    
    async inputDate(date: string){
        await this.page.click(this.DateInputField);
        await this.page.waitForSelector(this.DateInputField, { state: 'visible' });
        await this.page.fill(this.DateInputField, date);
    }  

    async selectPeerTime(time: string) {
        const timeButton = this.page.locator(this.QuickSelectTime(time));
        await timeButton.waitFor({ state: 'visible' });
        await timeButton.click();
    }

    async clickSetTimeButton() {    
        await this.page.waitForSelector(this.SetTimeButton, { state: 'visible' });
        await this.page.click(this.SetTimeButton);
    }

    async inputInterviewTopic(topic: string){
        await this.page.waitForSelector(this.InterviewTopicField, { state: 'visible' });
        await this.page.fill(this.InterviewTopicField, topic);
    }

    async selectDifficultyLevel(level: string){
        await this.page.click(this.DifficultyLevelDropdown);
        await this.page.click(`li:has-text("${level}")`);
    }   

    async clickCreatePeerSession(){
        await this.page.click(this.CreatePeerSession);
    }

// Expert Interview Session Creation
    async selectMentorDate(year: number, month: string, day: number) {
        // Open the date picker
        await this.page.click(this.MentorDate);

        // Wait for calendar to appear
        const calendarLabel = this.page.locator('div.MuiPickersCalendarHeader-label');
        await expect(calendarLabel).toBeVisible();

        // Navigate to correct month/year
        let currentLabel = await calendarLabel.textContent();
        while (!currentLabel?.includes(`${month} ${year}`)) {
            await this.page.click('button[aria-label="Next month"]');
            currentLabel = await calendarLabel.textContent();}

        // Click the day
        await this.page.click(`button[role="gridcell"]:not([disabled]):has-text("${day}")`);
    }

    async selectTimeSlot(time: string) {
        const timeButton = this.page.locator(`button:has-text("${time}")`);
        await timeButton.waitFor({ state: 'visible' });
        await timeButton.click();
    }

    async clickNextButton(){
        const nextBtn = this.page.locator(this.NextButton);
        await nextBtn.waitFor({ state: 'visible', timeout: 10000 });
        await expect(nextBtn).toBeEnabled();
        await nextBtn.scrollIntoViewIfNeeded();
        await nextBtn.click();
    }

    async inputMentorInterviewTopic(topic: string){
        await this.page.waitForSelector(this.MentorInterviewTopicField, { state: 'visible' });
        await this.page.fill(this.MentorInterviewTopicField, topic);
    }

    async clickMentorScheduleInterview(){
        await this.page.waitForSelector(this.MentorScheduleInterviewButton, { state: 'visible' });
        await this.page.click(this.MentorScheduleInterviewButton);
    }

    async verifyMentorUpcomingSession(){
        await this.page.waitForSelector(this.UpcomingSessionIcon, { state: 'visible' });
        await expect(this.page.locator(this.UpcomingSessionIcon)).toBeVisible();
    }

// AI Practice Session 
    async clickStartInterview(){
        await this.page.click(this.StartInterviewButton);
    }

    async clickEndInterview(){
        await this.page.click(this.EndInterviewButton);
    }

}