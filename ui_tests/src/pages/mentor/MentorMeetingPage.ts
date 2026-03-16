import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import * as MentorMeetingPagTestData from '../../test-data/MentorMeetingPageTestData';
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

    // async method for filling meeting title with user input flexibility. If user does not provide input within 3 seconds, 
    // it falls back to random title from test data or provided value.
    async fillMeetingTitle(meetingTitle?: string) {
        const meetingTitleTextBox = this.page.getByRole('textbox', { name: 'Meeting Title' });
        await expect(meetingTitleTextBox).toBeVisible({ timeout: 5000 });
        console.log('Meeting Title text box is visible');

        // Focus the textbox
        await meetingTitleTextBox.click();

        // ⭐ Give user 2 seconds to type manually
        console.log('Waiting 2 seconds for user to type Meeting Title...');
        await this.page.waitForTimeout(2000);

        // Read whatever the user typed
        let userTypedValue = (await meetingTitleTextBox.inputValue())?.trim();

        if (userTypedValue) {
            console.log(`User entered Meeting Title: ${userTypedValue}`);
            return userTypedValue;
        }

        // ⭐ If user did NOT type anything → fallback to random or provided value
        meetingTitle = meetingTitle?.trim() || MentorMeetingPagTestData.getRandomMeetingTitle();
        console.log(`No user input detected. Using Meeting Title: ${meetingTitle}`);

        // Fill the textbox with the chosen title
        await meetingTitleTextBox.fill(meetingTitle);

        return meetingTitle;
    }
    
    // fillMeetingDescription is implemented here with the same user input flexibility
    async fillMeetingDescription(meetingDescription?: string) {
        const meetingDescriptionTextBox = this.page.getByRole('textbox', { name: 'Description' });
        await expect(meetingDescriptionTextBox).toBeVisible({ timeout: 5000 });
        console.log('Meeting Description text box is visible');
        // Focus the textbox
        await meetingDescriptionTextBox.click();
        // ⭐ Give user 2 seconds to type manually
        console.log('Waiting 2 seconds for user to type Meeting Description (optional field)...');
        await this.page.waitForTimeout(2000);
        // Read whatever the user typed
        let userTypedValue = (await meetingDescriptionTextBox.inputValue())?.trim();

        if (userTypedValue) {
            console.log(`User entered Meeting Description: ${userTypedValue}`);
            return userTypedValue;
        }

        // ⭐ If user did NOT type anything → fallback to provided value
        meetingDescription = meetingDescription?.trim() || MentorMeetingPagTestData.getRandomMeetingDescription();
        console.log(`No user input detected. Using Meeting Description: ${meetingDescription}`);

        // Fill the textbox with the chosen description
        await meetingDescriptionTextBox.fill(meetingDescription);

        return meetingDescription;
    }

    // async method for meeting type selection with user input flexibility wait for 2 seconds or fetch the value from test data
    async selectMeetingType(meetingType?: string) {

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
        // 5. Determine meeting type: user choice first wait for 2 seconds, otherwise random
        console.log('Waiting 2 seconds for user to select Meeting Type from dropdown...');
        await this.page.waitForTimeout(2000);
        meetingType = meetingType?.trim() || MentorMeetingPagTestData.getRandomMeetingType();
        console.log(`Meeting Type chosen: ${meetingType}`);
        // 6. Select the requested option
        await this.page.locator('[role="option"]').filter({ hasText: meetingType }).first().click();
        // 7. Wait for dropdown to close
        await expect(this.page.locator('[role="listbox"]')).toBeHidden();
        // 8. Move to next field
        await this.page.keyboard.press('Tab');
        console.log('Cursor moved to next field after Meeting Type selection');
        return meetingType;
    }

    //async method for meeting duration selection where user can adjust the duration using arrows and 
    // we validate the selected duration is within the allowed range. 
    // We give user 3 attempts to select a valid duration if they initially select an out-of-range value, other chose a random valid duration from test data
    async selectMeetingDuration(meetingDuration?: number) {
        const durationLabel = this.page.locator('label', { hasText: 'Duration (minutes)' });
        const durationInput = durationLabel.locator('..').locator('input[type="number"]');
        const min = 15;
        const max = 120;
        const defaultMinutes = 30;
        let meetingMinutes = 0;
        // 1. Verify label is visible
        await expect(durationLabel).toBeVisible({ timeout: 5000 });
        console.log('Duration (minutes) label is visible');
        // 2. Verify input is visible
        await expect(durationInput).toBeVisible({ timeout: 5000 });
        console.log('Duration input box is visible');
        // ⭐ Give MUI time to render spinner (prevents freeze)
        await this.page.waitForTimeout(150);
        // 3. Read current value        
        let currentValue = parseInt(await durationInput.inputValue(), 10);
        console.log(`Current duration: ${currentValue}`);
        // 4. Confirm default value is 30
        if (currentValue !== defaultMinutes) {
            throw new Error(`Expected default duration to be ${defaultMinutes}, but got ${currentValue}`);
        }
        // 5. Click to reveal arrows
        await durationInput.click();
        console.log('Clicked Duration input box');
        //6. Wait for user to choose the duration manually/using arrows.
        // If not selected within 2 seconds, fallback to provided value or random value from test data
        console.log('Waiting 2 seconds for user to adjust Meeting Duration using arrows...');
        await this.page.waitForTimeout(2000);
        meetingDuration = meetingDuration || MentorMeetingPagTestData.getRandomMeetingDuration();
        if (!meetingDuration || meetingDuration < min || meetingDuration > max) {
            console.log(`Meeting Duration: ${meetingDuration} minutes`);
            meetingDuration = MentorMeetingPagTestData.getRandomMeetingDuration();
        }
        await durationInput.fill(meetingDuration.toString());
        //7. Move to next field
        await this.page.keyboard.press('Tab');
        console.log('Moved to next field after Meeting Duration selection');
        // ⭐ Return the selected duration for potential further validation
        return meetingDuration;
    }

    //aync method for meeting date & time selection where user must select a date & time from the calendar pop-up. We wait for the user to make a selection and close the pop-up, then we fetch the selected value for potential further validation
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

        let userClosedPopup = false;

        try {
            // ⭐ Wait up to 10 seconds for user to close the popup
            await expect(calendarPopup).toBeHidden({ timeout: 10000 });
            userClosedPopup = true;
            console.log('User closed the calendar pop-up');
        } catch {
            console.log('⏳ User did NOT select a date & time within 10 seconds.');
        }

        // ============================================================
        // CHECK IF USER SELECTED A VALUE
        // ============================================================
        let selectedDateTimeValue = await input.inputValue();

        if (userClosedPopup && selectedDateTimeValue.trim() !== "") {
            console.log(`User selected date & time: ${selectedDateTimeValue}`);

            // Move to next field
            await this.page.keyboard.press('Tab');
            console.log('Calendar selection complete — moved to next field');

            return selectedDateTimeValue;
        }

        // ============================================================
        // FALLBACK: AUTO-SELECT TOMORROW AT 10:00 AM
        // ============================================================
        console.log('⚠️ No user selection detected — applying fallback date & time.');

        // fetch data from test data generator using the function getRandomFutureDateTime which generates a random date 
        // within the next 30 days and time between 9 AM to 5 PM
        const futureDateTime = MentorMeetingPagTestData.getRandomFutureDateTime();
        // console.log(`Generated random future date & time: ${futureDateTime}`);
        
        // Format the date & time to match the expected input format "MM/DD/YYYY hh:mm aa"
        const month = String(futureDateTime.getMonth() + 1).padStart(2, '0');
        const day = String(futureDateTime.getDate()).padStart(2, '0');
        const year = String(futureDateTime.getFullYear());
        const hour = String(futureDateTime.getHours()).padStart(2, '0');
        const minute = String(futureDateTime.getMinutes()).padStart(2, '0');
        const period = futureDateTime.getHours() >= 12 ? 'PM' : 'AM';

        const fallbackValue = `${month}/${day}/${year} ${hour}:${minute} ${period}`;


        // Fill fallback value directly into the input
        await input.fill(fallbackValue);
        console.log(`Fallback Meeting Date & Time applied: ${fallbackValue}`);

        // ⭐ CLICK OK BUTTON TO CLOSE CALENDAR POP-UP
        const okButton = this.page.getByRole('button', { name: 'OK' });
        await expect(okButton).toBeVisible({ timeout: 5000 });
        await okButton.click();
        console.log('Clicked OK button on calendar pop-up');

        // Move to next field
        await this.page.keyboard.press('Tab');
        console.log('Moved to next field after fallback');

        return fallbackValue;
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

        // Wait briefly for redirect
        await this.page.waitForTimeout(500);

        // Check URL to confirm scheduling
        const currentUrl = this.page.url();
        if (this.MEETINGS_PAGE_URL_REGEX.test(currentUrl)) {
            console.log('Meeting was successfully scheduled');
            return 'scheduled';
        } else {
            await conflictAlert.isVisible();
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
            else{return 'scheduled';}
            // If scheduled again → check conflict again
        }

    }

    async confirmMeetingScheduled(studentName: string, meetingTitle: string, meetingDateTime: string) {
        console.log('🔍 Verifying meeting appears in Upcoming Meetings list...');

        // 1. Ensure we are on the meetings page
        //write line to refresh the page and have the url
        await this.page.reload({ waitUntil: 'domcontentloaded' });
        await expect(this.page).toHaveURL(this.MEETINGS_PAGE_URL_REGEX, { timeout: 5000 });

        // 2. Click the "Upcoming" tab
        const upcomingTab = this.page.getByRole('tab', {name: /Upcoming.*\d*/ });
        await expect(upcomingTab).toBeVisible();
        await upcomingTab.click();
        console.log('Opened Upcoming Meetings tab');

        // 3. Get all upcoming meeting list items
        const upcomingMeetings = this.page.getByRole('listitem');
        const count = await upcomingMeetings.count();

        console.log(`Found ${count} upcoming meeting(s). Checking for match...`);

        // Normalize date for partial matching (UI may round minutes)
        const dateOnly = meetingDateTime.split(',')[0]; // "MM/DD/YYYY"

        let matchFound = false;

        for (let i = 0; i < count; i++) {
            const item = upcomingMeetings.nth(i);
            const text = (await item.innerText()).trim();

            console.log(`\n📌 Checking meeting item #${i + 1}:`);
            console.log(text);

            // Check all fields
            const hasStudent = text.includes(studentName);
            const hasTitle = text.includes(meetingTitle);
            const hasDate = text.includes(dateOnly); // partial match
            
            if (hasStudent && hasTitle && hasDate) {
                console.log(`\n✅ MATCH FOUND — Meeting is correctly listed in Upcoming Meetings`);
                console.log(`   Student: ${studentName}`);
                console.log(`   Title: ${meetingTitle}`);
                console.log(`   Date: ${meetingDateTime}`);
                matchFound = true;
                break;
            }
        }

        if (!matchFound) {
            console.log('\n❌ NO MATCH FOUND — Meeting is NOT listed in Upcoming Meetings');
            console.log('Expected details:');
            console.log(`   Student: ${studentName}`);
            console.log(`   Title: ${meetingTitle}`);
            console.log(`   Date: ${meetingDateTime}`);
        }

        return matchFound;
    }


    // async confirmMeetingScheduled() {
    //     // if handleScheduleOrCancelFlow returns final status as scheduled, we can add additional checks here to confirm the meeting 
    //     // appears in the list of meetings with correct details (date/time/type/student)
    //     // This can be done by locating the meeting in the list and verifying its details match what was selected during scheduling
    //     if (await this.handleScheduleOrCancelFlow() === 'scheduled') {
    //         // Add confirmation checks here

    //         //get the selected date & time from selectMeetingDateTime function
    //         const selectedDateTime = await this.selectMeetingDateTime();
    //         //verify the page has the URL of /mentor-dashboard/meetings
    //         await expect(this.page).toHaveURL(this.MEETINGS_PAGE_URL_REGEX, { timeout: 5000 });
            
    //         //verify the meeting appears in the upcoming meetings list with correct date & time that matches 
    //         // partially the selectedDateTime (since the time might be adjusted to nearest 15 min interval by the system, 
    //         // we can check for the date and hour to confirm it's the same meeting)

    //         //upcoming meeting with role tab name 'Upcoming'
    //         const upcomingMeeting = this.page.getByRole('tab', { name: 'Upcoming', exact: true });
    //         await expect(upcomingMeeting).toBeVisible({ timeout: 5000 });
    //         await upcomingMeeting.click();
    //         //locate the meeting in the list with the selected date & time
    //         const scheduledMeeting = this.page.getByRole('listitem').filter({ hasText: selectedDateTime });
    //         await expect(scheduledMeeting).toBeVisible({ timeout: 5000 });

    //         console.log('Confirmed the meeting appears in the upcoming meetings list with correct date & time', scheduledMeeting);
    //     }
    // }
}
    

