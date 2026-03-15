import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import * as MentorMeetingPagTestData from '../../src/test-data/MentorMeetingPageTestData';
import { assert } from 'console';

export class MentorMeetingPage extends BasePage {
    readonly meetingsAndCommunication: Locator;
    readonly scheduleAndManageMeetings: Locator;
    readonly scheduleMeeting: Locator;
    readonly scheduleNewMeetingPopup: Locator;
    readonly MEETINGS_PAGE_URL_REGEX: RegExp;

    constructor(page: Page) {
        super(page);

        // Meetings & Communication section in the sidebar
        this.meetingsAndCommunication = this.page.locator('#root').getByText('MEETINGS & COMMUNICATION');

        // Schedule and Manage Meetings link in the sidebar
        this.scheduleAndManageMeetings = this.page.getByRole('link', { name: 'Schedule and Manage Meetings' });

        // Schedule Meeting button on the Schedule and Manage Meetings page
        this.scheduleMeeting = this.page.getByRole('button', { name: 'Schedule Meeting' });

        // Schedule New Meeting popup (assuming it has a heading with text 'Schedule New Meeting')
        this.scheduleNewMeetingPopup = this.page.getByRole('heading', { name: 'Schedule New Meeting' });

        // Define the URL regex for the Schedule and Manage Meetings page
        this.MEETINGS_PAGE_URL_REGEX = /\/mentor-dashboard\/meetings$/;
    }

    async meetingsAndCommunicationIsVisible() {
        await expect(this.meetingsAndCommunication).toBeVisible({ timeout: 5000 });
        console.log('Meetings & Communication section is visible in the sidebar');
    }

    async clickOnscheduleAndManageMeetingsLink() {
        await expect(this.scheduleAndManageMeetings).toBeVisible({ timeout: 5000 });
        console.log('Schedule and Manage Meetings link is visible in the sidebar');
        await this.scheduleAndManageMeetings.click();
        console.log('Clicked on Schedule and Manage Meetings link');
        await expect(this.page).toHaveURL(this.MEETINGS_PAGE_URL_REGEX, { timeout: 5000 });
        console.log('Navigated to Schedule and Manage Meetings page');
    }

    async clickOnscheduleMeetingButton() {
        await expect(this.scheduleMeeting).toBeVisible({ timeout: 5000 });
        console.log('Schedule Meeting button is visible on Schedule and Manage Meetings page');
        await this.scheduleMeeting.click();
        console.log('Clicked on Schedule Meeting button');
    }

    async scheduleNewMeetingPopupIsVisible() {
        await expect(this.scheduleNewMeetingPopup).toBeVisible({ timeout: 5000 });
        console.log('Schedule New Meeting popup is visible');
    }

    async selectStudent(studentName?: string) {
        // Student text box on Schedule New Meeting popup
        // readonly studentTextBox = this.page.getByPlaceholder('Student *');
        const studentTextBox = this.page.getByRole('combobox').first();
        await expect(studentTextBox).toBeVisible({ timeout: 5000 });
        console.log('Student text box is visible');

        // Open dropdown
        await studentTextBox.click();

        // If studentName is not provided, select a random student from test data
        studentName = studentName?.trim() || MentorMeetingPagTestData.getRandomStudentName();
        console.log(`Student chosen: ${studentName}`);

        // Select student dynamically
        await this.page.locator('[role="option"]').filter({ hasText: studentName }).first().click();
        // console.log(`Selected Student: ${studentName}`);
        // ⭐ Wait for dropdown to fully close
        await expect(this.page.locator('[role="listbox"]')).toBeHidden({ timeout: 5000 });

        // Move cursor to next field
        await this.page.keyboard.press('Tab');
        console.log('Cursor moved to next field');
        // ⭐ Return the selected student name for potential further validation
        return studentName;
    }

    async fillMeetingTitle(meetingTitle?: string){
        const meetingTitleTextBox = this.page.getByRole('textbox', { name: 'Meeting Title' });
        await expect(meetingTitleTextBox).toBeVisible({ timeout: 5000 });
        console.log('Meeting Title text box is visible');
        // Focus the textbox
        await meetingTitleTextBox.click();
        // If the meetingTitle is not provided, allow the user to type in manually
        meetingTitle = meetingTitle?.trim() || MentorMeetingPagTestData.getRandomMeetingTitle();
        console.log(`Meeting Title chosen: ${meetingTitle}`);
        // await this.page.pause(); // User types manually in UI
        // ⭐ Return the filled title for potential further validation
        return await meetingTitleTextBox.inputValue();
    }

    /* async fillMeetingDescription(meetingDescription: string) {
        const meetingDescriptionTextBox = this.page.getByRole('textbox', { name: 'Description' });
        await expect(meetingDescriptionTextBox).toBeVisible({ timeout: 5000 });
        console.log('Meeting Description text box is visible');
        // If the user wants to type in manually, allow the user to type or give the option to move to next field as Description is not a mandatory field
        console.log('Paused — please type the Meeting Description manually or press Tab to skip...');
        await this.page.pause(); // User types manually in UI or presses Tab to skip
        // ⭐ Return the filled description for potential further validation
        return await meetingDescriptionTextBox.inputValue();
    }

    async selectMeetingType(optionText?: string) {

        // 1. Verify Meeting Type label is visible to ensure the section is loaded before interacting with the dropdown
        const meetingTypeLabel  = this.page.locator('label', { hasText: 'Meeting Type' });
        await expect(meetingTypeLabel).toBeVisible({ timeout: 5000 });
        console.log('Meeting Type label is visible');

        // 2. Locate the actual dropdown (combobox)
        const meetingTypeDropdown  = meetingTypeLabel.locator('..').locator('[role="combobox"]');
        await expect(meetingTypeDropdown).toBeVisible();
        console.log('Meeting Type dropdown is visible');

        // 3. Assert default value is "Regular Check-in"
        await expect(meetingTypeDropdown).toHaveText('Regular Check-in');
        console.log('Verified default Meeting Type: Regular Check-in');

        // 4. Open dropdown so user can choose
        await meetingTypeDropdown.click();
        console.log('Dropdown opened');

        // 5. Determine meeting type: user choice first, otherwise random
        optionText = optionText?.trim() || MentorMeetingPagTestData.getRandomMeetingType();
        console.log(`Meeting Type chosen: ${optionText}`);

        // 6. Select the requested option
        await this.page.locator('[role="option"]').filter({ hasText: optionText }).first().click();

        // 7. Wait for dropdown to close
        await expect(this.page.locator('[role="listbox"]')).toBeHidden();

        // 8. Move to next field
        await this.page.keyboard.press('Tab');

        return optionText;
    }

    async selectMeetingDuration(meetingDuration?: number) {
        
        const durationLabel = this.page.locator('label', { hasText: 'Duration (minutes)' });
        const durationInput = durationLabel.locator('..').locator('input[type="number"]');

        const min = 15;
        const max = 120;
        const step = 15;
        const defaultMinutes = 30;

        // 1. Verify label is visible
        await expect(durationLabel).toBeVisible({ timeout: 5000 });
        console.log('Duration (minutes) label is visible');

        // 2. Verify input is visible
        await expect(durationInput).toBeVisible({ timeout: 5000 });
        console.log('Duration input box is visible');

        // 3. Click to reveal arrows
        await durationInput.click();
        console.log('Clicked Duration input box');
        // ⭐ Give MUI time to render spinner (prevents freeze)
        await this.page.waitForTimeout(150);

        // 4. Read current value
        let currentValue = parseInt(await durationInput.inputValue(), 10);
        console.log(`Current duration: ${currentValue}`);

        // 5. Confirm default value is 30
        if (currentValue !== defaultMinutes) {
            throw new Error(`Expected default duration to be ${defaultMinutes}, but got ${currentValue}`);
        }

        // 6. Let user manually adjust using arrows
        console.log('Paused — please use the up/down arrows to adjust the duration...');
        await this.page.pause();

        // 7. After user adjusts, read final value
        currentValue = parseInt(await durationInput.inputValue(), 10);
        // console.log(`Final duration selected: ${currentValue} minutes`);

        // 8. Validate range with retry logic
        let attempts = 0;
        const maxAttempts = 3;
        while (attempts < maxAttempts) {
            if (currentValue >= min && currentValue <= max) {
            console.log(`Final duration selected: ${currentValue} minutes`);
            break;
            }

            attempts++;
            console.log(
            `❗ Duration ${currentValue} is out of range (${min}-${max}). ` +
            `Please choose a valid duration. Attempt ${attempts} of ${maxAttempts}.`
            );

            if (attempts === maxAttempts) {
            throw new Error(
                `❌ Invalid duration selected after ${maxAttempts} attempts. ` +
                `Expected a value between ${min} and ${max}.`
            );
            }

            console.log('Paused — please adjust the duration again...');
            await this.page.pause();
            currentValue = parseInt(await durationInput.inputValue(), 10);
        }
 
        // 9. Move to next field
        await this.page.keyboard.press('Tab');
        console.log('Moved to next field');
        // ⭐ Return the selected duration for potential further validation
        return currentValue;

    }

    async selectMeetingDateTime() {
        // -------------------------------
        // Locators
        // -------------------------------
        const label = this.page.locator('label', { hasText: 'Meeting Date & Time' });

        const input = label
            .locator('..')
            .locator('input[placeholder="MM/DD/YYYY hh:mm aa"]');

        const openCalendarButton = label
            .locator('..')
            .locator('button[aria-label*="Choose date"]');  // Always opens unified calendar pop-up

        // -------------------------------
        // Ensure field is visible
        // -------------------------------
        await expect(label).toBeVisible({ timeout: 5000 });
        await expect(input).toBeVisible({ timeout: 5000 });
        console.log('Meeting Date & Time field is visible');

        // ============================================================
        // OPEN CALENDAR POP-UP ONLY
        // ============================================================
        await expect(openCalendarButton).toBeVisible({ timeout: 5000 });
        await openCalendarButton.click();
        console.log('Opened calendar pop-up');

        // ⭐ Unified calendar pop-up (date + time)
        const calendarPopup = this.page
            .locator('div[role="dialog"]')
            .filter({ has: this.page.locator('button[role="gridcell"]') });

        await expect(calendarPopup).toBeVisible({ timeout: 5000 });
        console.log('Calendar pop-up is visible');

        // ============================================================
        // USER SELECTS DATE & TIME MANUALLY
        // ============================================================
        console.log('******** Waiting for user to manually select date & time... ********');

        // ⭐ Wait until the user closes the pop-up
        await expect(calendarPopup).toBeHidden({ timeout: 60000 });
        console.log('User closed the calendar pop-up');

        // ============================================================
        // FETCH USER-SELECTED DATE & TIME
        // ============================================================
        const selectedDateTimeValue = await input.inputValue();
        // console.log(`User selected date & time: ${selectedDateTimeValue}`);

        // ============================================================
        // Move to next field
        // ============================================================
        await this.page.keyboard.press('Tab');
        console.log('Calendar selection complete — moved to next field');

        return selectedDateTimeValue; // ⭐ Return the selected date & time for potential further validation
    }

    async handleScheduleOrCancelFlow(): Promise<'scheduled' | 'cancelled'> {
        const modal = this.page.locator('div[role="dialog"]').filter({ hasText: 'Schedule New Meeting' });

        const scheduleBtn = this.page.getByRole('button', { name: 'Schedule Meeting' });
        const cancelBtn = this.page.getByRole('button', { name: 'Cancel' });
        const conflictAlert = this.page.getByRole('alert'); // conflict banner

        // Ensure modal is visible
        await expect(modal).toBeVisible({ timeout: 5000 });
        console.log('Schedule New Meeting pop-up is visible');

        // -------------------------------
        // USER CLICKS SCHEDULE MEETING
        // -------------------------------
        await scheduleBtn.click();
        console.log('User clicked Schedule Meeting');

        // -------------------------------
        // CHECK FOR CONFLICT ALERT
        // -------------------------------
        if (await conflictAlert.isVisible()) {
            console.log('⚠️ Conflict detected: The selected meeting time overlaps with an existing meeting.');
            console.log('Please choose a different time from the calendar pop-up.');

            // ⭐ ONLY retry date & time selection
            await this.selectMeetingDateTime();

            console.log('User selected a new date & time. Waiting for user to choose Schedule or Cancel again.');

            // ⭐ Wait for whichever button disappears first
            const userChoice = await Promise.race([
            scheduleBtn.waitFor({ state: 'detached' }).then(() => 'scheduled' as const),
            cancelBtn.waitFor({ state: 'detached' }).then(() => 'cancelled' as const)
            ]);

            if (userChoice === 'cancelled') {
            await expect(this.page).toHaveURL(this.MEETINGS_PAGE_URL_REGEX, { timeout: 5000 });
            console.log('Meeting scheduling was cancelled by the user');
            return 'cancelled';
            }

            // If scheduled again → check conflict again
            return await this.handleScheduleOrCancelFlow();

        }

        // -------------------------------
        // NO CONFLICT → REDIRECT HAPPENS
        // -------------------------------
        await expect(this.page).toHaveURL(this.MEETINGS_PAGE_URL_REGEX, { timeout: 5000 });
        console.log('Meeting was successfully scheduled');
        return 'scheduled';

    }



    async scheduleMeetingButton() {
        const scheduleButton = this.page.getByRole('button', { name: 'Schedule Meeting' });
        await expect(scheduleButton).toBeVisible({ timeout: 5000 });
        await scheduleButton.click();
        console.log('Clicked Schedule Meeting button to finalize scheduling');
    }

    async scheduleMeetingCancelButton() {
        const cancelButton = this.page.getByRole('button', { name: 'Cancel' });
        await expect(cancelButton).toBeVisible({ timeout: 5000 });
        await cancelButton.click();
        console.log('Clicked Schedule Meeting cancel button');
    }

    async confirmMeetingScheduled() {
        // if handleScheduleOrCancelFlow returns final status as scheduled, we can add additional checks here to confirm the meeting appears in the list of meetings with correct details (date/time/type/student)
        // This can be done by locating the meeting in the list and verifying its details match what was selected during scheduling
        if (await this.handleScheduleOrCancelFlow() === 'scheduled') {
            // Add confirmation checks here
            //get the selected date & time from selectMeetingDateTime function
            const selectedDateTime = await this.selectMeetingDateTime();
            //verify the page has the URL of /mentor-dashboard/meetings
            await expect(this.page).toHaveURL(this.MEETINGS_PAGE_URL_REGEX, { timeout: 5000 });
            //verify the meeting appears in the upcoming meetings list with correct date & time
            //upcoming meeting with role tab name 'Upcoming'
            const upcomingMeeting = this.page.getByRole('tab', { name: 'Upcoming', exact: true });
            await expect(upcomingMeeting).toBeVisible({ timeout: 5000 });
            //locate the meeting in the list with the selected date & time
            const scheduledMeeting = this.page.getByRole('listitem').filter({ hasText: selectedDateTime });
            await expect(scheduledMeeting).toBeVisible({ timeout: 5000 });
            console.log('Confirmed the meeting appears in the upcoming meetings list with correct date & time');
        }

    }   */

}