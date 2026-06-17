import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import * as MentorMeetingPagTestData from '../../test-data/MentorMeetingPageTestData';
import * as ConvertUIDateTime from '../common/ConvertUIDateTime';

export class MentorMeetingPage extends BasePage {
    readonly meetingsAndCommunication: Locator;
    readonly scheduleAndManageMeetings: Locator;
    readonly scheduleMeeting: Locator;
    readonly scheduleNewMeetingPopup: Locator;
    readonly MEETINGS_PAGE_URL_REGEX: RegExp;
    readonly modal: Locator;
    readonly meetingScheduleBtn:Locator;
    readonly meetingCancelBtn: Locator;

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

        // Define Schedule Meeting popup modal, to handle schedule meeting conflict
        this.modal = this.page.locator('div[role="dialog"]').filter({ hasText: 'Schedule New Meeting' });

        // Schedule and Cancel buttons are visible only in Schedule New Meeting window
        this.meetingScheduleBtn = this.page.getByRole('button', { name: 'Schedule Meeting' });
        this.meetingCancelBtn = this.page.getByRole('button', { name: 'Cancel' });
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

    //aync method for meeting date & time selection where user must select a date & time from the calendar pop-up. 
    // We wait for the user to make a selection and close the pop-up, then we fetch the selected value for potential further validation
    async selectMeetingDateTime() {
        let userChoseTime = 0;
        let randomGeneratedTime = 0;
        // ⭐ SAFETY CHECK — Do NOT open calendar if modal is not visible
        if (!(await this.modal.isVisible())) {
            console.log("Modal is not visible — skipping date/time selection.");
            return "modal is not visible";
        }

        // -------------------------------
        // Locators
        // -------------------------------
        const label = this.page.locator('label', { hasText: 'Meeting Date & Time' });
        const input = label.locator('..').locator('input[placeholder="MM/DD/YYYY hh:mm aa"]');
        const openCalendarButton = label.locator('..').locator('button[aria-label*="Choose date"]');  // Always opens unified calendar pop-up
        
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
        const calendarPopup = this.page.locator('div[role="dialog"]').filter({ has: this.page.locator('button[role="gridcell"]') });
        await expect(calendarPopup).toBeVisible({ timeout: 5000 });
        console.log('Calendar pop-up is visible');

        // ============================================================
        // USER SELECTS DATE & TIME MANUALLY
        // ============================================================
        console.log('******** Waiting for user to manually select date & time... ********');

        let userClosedPopup = false;

        try {
            // ⭐ Wait up to 5 seconds for user to close the popup
            await expect(calendarPopup).toBeHidden({ timeout: 10000 });
            userClosedPopup = true;
            // Ensure modal is visible
            await expect(this.modal).toBeVisible({ timeout: 5000 });
            console.log('User closed the calendar pop-up');
            
        } catch {
            console.log('⏳ User did NOT select a date & time within 5 seconds.');
        }
        // ============================================================
        // CHECK IF USER SELECTED A VALUE
        // ============================================================
        const selectedDateTimeValue = await input.inputValue();  

        if (userClosedPopup && selectedDateTimeValue.trim() !== "") {
            console.log(`User selected date & time: ${selectedDateTimeValue}`);

            // Move to next field
            await this.page.keyboard.press('Tab');
            console.log('Calendar selection complete — moved to next field');
            userChoseTime++;
        }
        // ============================================================
        // FALLBACK: AUTO-SELECT RANDOM Date & time [9 AM - 5PM]
        // ============================================================
        console.log('⚠️ No user selection detected — applying fallback date & time.');

        // fetch data from test data generator using the function getRandomFutureDateTime which generates a random date 
        // within the next 30 days and time between 9 AM to 5 PM
        const futureDateTime = MentorMeetingPagTestData.getRandomFutureDateTime();
        console.log(`Generated random future date & time: ${futureDateTime}`);
        
        // Format the date & time to match the expected input format "MM/DD/YYYY hh:mm aa"
        const month = String(futureDateTime.getMonth() + 1).padStart(2, '0');
        const day = String(futureDateTime.getDate()).padStart(2, '0');
        const year = String(futureDateTime.getFullYear());
        const hour = String(futureDateTime.getHours()).padStart(2, '0');
        const minute = String(futureDateTime.getMinutes()).padStart(2, '0');
        const period = futureDateTime.getHours() >= 12 ? 'PM' : 'AM';

        const fallbackValue = `${month}/${day}/${year} ${hour}:${minute} ${period}`;
        // const fallbackValue = '3/24/2026 12:00 PM' //fallbackValue example to use literal value 
        // Fill fallback value directly into the input
        await input.fill(fallbackValue);
        // ⭐ FIRST close the calendar pop-up
        const okButton = this.page.getByRole('button', { name: 'OK' });
        await expect(okButton).toBeVisible({ timeout: 5000 });
        await okButton.click();
        console.log('Clicked OK button on calendar pop-up');
        await this.page.waitForTimeout(3000);
        // Ensure modal is visible
        await expect(this.modal).toBeVisible({ timeout: 5000 });
        const appliedDateTime = await input.inputValue();
        await this.page.waitForTimeout(3000);
        console.log(`Fallback Meeting Date & Time applied: ${appliedDateTime}`);

        await this.page.waitForTimeout(3000);
        // Move to next field
        await this.page.keyboard.press('Tab');
        console.log('Moved to next field after fallback');    
        randomGeneratedTime++;

        if(!(userChoseTime === 0)) {
            console.log("User selected meeting date & time");
            return selectedDateTimeValue;
        }
        else {
            if(!(randomGeneratedTime === 0)) {
                console.log("Meeting date & time was randomly generated");
                return appliedDateTime;
            }
        }
    }

    async handleScheduleOrCancelFlow(): Promise<'scheduled' | 'cancelled'> {
        // Ensure modal is visible
        await expect(this.modal).toBeVisible({ timeout: 5000 });
        console.log('Schedule New Meeting pop-up is visible');

        // ⭐ Wait up to 3 seconds for user to choose Schedule or Cancel
        let userChoice: 'scheduled' | 'cancelled';
        try {
            userChoice = await Promise.race([
                this.meetingScheduleBtn.waitFor({ state: 'detached' }).then(() => 'scheduled' as const),
                this.meetingCancelBtn.waitFor({ state: 'detached' }).then(() => 'cancelled' as const),
                this.page.waitForTimeout(3000).then(() => 'scheduled' as const) // ⭐ default after 3 seconds
            ]);
        } catch {
            userChoice = 'scheduled'; // fallback
            this.meetingScheduleBtn.click();
        }
        if (userChoice === 'cancelled') {
            console.log("User cancelled scheduling.");
            return 'cancelled';
        }

        console.log("User chose to schedule.");

        const conflictResult = await this.meetingConflictSchedule();

        if (conflictResult === 'cancelled') {
            return 'cancelled';
        }

        // await this.meetingScheduleBtn.click();
        await this.page.waitForTimeout(5000);

        // ⭐ Wait for redirect → modal closes here
        await this.waitForModalToCloseAfterAction();

        return 'scheduled';        
    }

    async meetingConflictSchedule(): Promise<'resolved' | 'cancelled' | 'scheduled'> {
        // ⭐ WAIT for backend validation to show conflict banner
        await this.page.waitForTimeout(5000);
        // Now check conflict
        return await this.handleMeetingConflict();;
    }

    async handleMeetingConflict(): Promise<'resolved' | 'cancelled' | 'scheduled'> {
        const conflictAlert = this.page.getByRole('alert'); // conflict banner
        let attempts = 0;
        const maxAttempts = 3; 
        await this.meetingScheduleBtn.click();    
        console.log('Schedule Meeting was clicked');  
        // ⭐ Wait for conflict banner to appear (if it will)
        await conflictAlert.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
        const conflictVisible = await conflictAlert.isVisible();
        // await this.meetingScheduleBtn.click();
        if (!conflictVisible) {
            console.log("No conflict detected.");
            return 'scheduled';
        }
        // Check & Repeat only while conflict banner is visible
        // console.log("⚠️ Conflict detected.");

        while (attempts < maxAttempts && await conflictAlert.isVisible()) {

            // ⭐ SAFETY CHECK — If modal closed, stop immediately
            if (!(await this.modal.isVisible())) {
                console.log("Modal closed — stopping conflict handling.");
                return 'scheduled';
            }
            console.log("⚠️ Conflict detected.");
            console.log('Please choose a different time from the calendar pop-up.');

            await this.selectMeetingDateTime();

            await this.meetingScheduleBtn.click();
            await this.page.waitForTimeout(3000);

            attempts++;
            console.log(`Attempts to clear schedule conflict: ${attempts}`);
        }

        if (attempts === maxAttempts && await conflictAlert.isVisible()) {
            console.log('❌ Meeting conflict still exists after maximum retries.');
            await this.meetingCancelBtn.click();
            return 'cancelled';
        }

        console.log('✅ Conflict resolved.');
        return 'resolved';
    }

    async waitForModalToCloseAfterAction() {
        console.log("Waiting for Schedule New Meeting modal to close...");

        // The modal closes ONLY when the page redirects to /mentor-dashboard/meetings
        await expect(this.page).toHaveURL(this.MEETINGS_PAGE_URL_REGEX, { timeout: 8000 });

        console.log("Modal closed and user redirected to /mentor-dashboard/meetings");
    }

        /**
     * EXPLANATION:
     * The variable `upcomingMeetings` is not an array. It is an object containing:
     *    { upComingMeetingsCount: number, upcomingMeetings: Meeting[] }
     *
     * Because of this structure: Access the actual array inside the object:
     *    upcomingMeetings.upcomingMeetings.length
     *    upcomingMeetings.upcomingMeetings.find(...)
     *
     * This ensures we are operating on the correct array and resolves the TypeScript errors.
     */

    //Method to verify the successfully scheduled meeting
    async verifyScheduledMeeting(selectedStudent: string, meetingTitle: string, selectedDateTime: string) {
        // Ensure we are on the meetings page
        await expect(this.page).toHaveURL(this.MEETINGS_PAGE_URL_REGEX, { timeout: 5000 });
        console.log("🔍 Verifying scheduled meeting in Upcoming tab...");

        const upcomingMeetings = await this.getUpcomingMeetingsList();

        // Length check
        if (upcomingMeetings.upcomingMeetings.length === 0) {
            throw new Error("❌ No meetings found in Upcoming tab.");
        }

        // Normalize expected date
        const expectedFormatted = ConvertUIDateTime.formatUiDate(selectedDateTime);
        const expectedDateOnly = ConvertUIDateTime.getDateOnly(expectedFormatted);

        console.log("Expected Date:", expectedFormatted);

        // Correct find() method to verify required values
        const match = upcomingMeetings.upcomingMeetings.find(m => {
            const uiFormatted = ConvertUIDateTime.formatUiDate(m.meetingDate);
            const uiDateOnly = ConvertUIDateTime.getDateOnly(uiFormatted);

            return (
                m.studentName.toLowerCase().includes(selectedStudent.toLowerCase()) &&
                m.meetingTitle.toLowerCase().includes(meetingTitle.toLowerCase()) &&
                uiDateOnly === expectedDateOnly
            );
        });

        if (match) {
            console.log("✅ Scheduled meeting verified successfully!");
            console.log("Matched Meeting:", match);
            return true;
        }

        console.log("❌ Scheduled meeting NOT found in Upcoming tab.");
        return false;
    }

    //Method to get the details of all the upcoming meetings
    async getUpcomingMeetingsList() {
        console.log('📄 Fetching list of meetings from Upcoming tab...');
        // Ensure we are on the meetings page
        await expect(this.page).toHaveURL(this.MEETINGS_PAGE_URL_REGEX, { timeout: 5000 });

        // 1. Click the Upcoming tab (badge count varies, so use hasText)
        const upcomingTab = this.page.locator('button[role="tab"]', { hasText: 'Upcoming' });
        await expect(upcomingTab).toBeVisible({ timeout: 5000 });
        await upcomingTab.click();
        console.log('Opened Upcoming Meetings tab');

        // 2. Locate the table body
        const tableBody = this.page.locator('tbody.MuiTableBody-root');
        await expect(tableBody).toBeVisible({ timeout: 5000 });

        // 3. Get all rows
        const rows = tableBody.locator('tr');
        const count = await rows.count();

        console.log(`Found ${count} meeting row(s) in Upcoming Meetings table`);

        const upcomingMeetings = [];
        let upMeetingsCount = 0;

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            let meetingDescription = '';

            // ⭐ Skip placeholder rows (no <h6> = no meeting)
            const hasTitle = await row.locator('h6').count();
            if (hasTitle === 0) {
                console.log(`⏭ Skipping placeholder row ${i + 1}`);
                continue;
            }
            upMeetingsCount++;
            // Extract each cell
            const titleCell = row.locator('td').nth(0);
            const studentCell = row.locator('td').nth(1);
            const typeCell = row.locator('td').nth(2);
            const dateDurationCell = row.locator('td').nth(3);

            // Extract title + description inside first cell
            const meetingTitle = (await titleCell.locator('h6').innerText().catch(() => '')).trim();
            const descLocator = titleCell.locator('span');
            if (await descLocator.count() > 0) {
                meetingDescription = (await descLocator.innerText()).trim();
            }
            const studentName = (await studentCell.innerText().catch(() => '')).trim();
            const meetingType = (await typeCell.locator('span').innerText().catch(() => '')).trim();
            const meetingDate = (await dateDurationCell.locator('p').innerText().catch(() => '')).trim();
            const meetingDuration = (await dateDurationCell.locator('span').innerText().catch(() => '')).trim();

            upcomingMeetings.push({
                meetingTitle,
                meetingDescription,
                studentName,
                meetingType,
                meetingDate,
                meetingDuration
            });
            // console.log(`📌 Row ${i + 1}:`, upcomingMeetings[i]);
        }
        // ⭐ Return both meeting count value and meetings list
        return {
            upComingMeetingsCount: upMeetingsCount,
            upcomingMeetings
        };
    }

    //Method to get the count of upcoming meetings
    async getUpcomingMeetingsBadgeCount() {
        // Ensure we are on the meetings page
        await expect(this.page).toHaveURL(this.MEETINGS_PAGE_URL_REGEX, { timeout: 5000 });
        // 1. Click the Upcoming tab (badge count varies, so use hasText)
        const upcomingTab = this.page.locator('button[role="tab"]', { hasText: 'Upcoming' });
        await expect(upcomingTab).toBeVisible({ timeout: 5000 });
        const badge = upcomingTab.locator('.MuiBadge-badge');
        await expect(badge).toBeVisible({ timeout: 5000 });
        const count = parseInt(await badge.innerText(), 10);
        return count;
    }

    async getPastMeetingsList() {
        console.log('📄 Fetching list of meetings from Past tab...');
        // Ensure we are on the meetings page
        await expect(this.page).toHaveURL(this.MEETINGS_PAGE_URL_REGEX, { timeout: 5000 });

        // 1. Click the Upcoming tab (badge count varies, so use hasText)
        const pastTab = this.page.locator('button[role="tab"]', { hasText: 'Past' });
        await expect(pastTab).toBeVisible({ timeout: 5000 });
        await pastTab.click();
        console.log('Opened Past Meetings tab');

        // 2. Locate the table body
        const tableBody = this.page.locator('tbody.MuiTableBody-root');
        await expect(tableBody).toBeVisible({ timeout: 5000 });

        // 3. Get all rows
        const rows = tableBody.locator('tr');
        const count = await rows.count();

        console.log(`Found ${count} row(s) in Past Meetings table`);

        const pastMeetings = [];
        let realRowCount = 0;

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            
            // // ⭐ Skip placeholder rows (no meeting title)
            const firstCell = row.locator('td').nth(0);
            const firstCellText = (await firstCell.innerText().catch(() => '')).trim();
            if (!firstCellText) {
                console.log(`⏭ Skipping placeholder row ${i + 1}`);
                continue;
            }
            realRowCount++;

            const studentCell = row.locator('td').nth(1);
            const typeCell = row.locator('td').nth(2);
            const dateCell = row.locator('td').nth(3);
            const statusCell = row.locator('td').nth(4);
            const notesCell = row.locator('td').nth(5);

            const meetingTitle = firstCellText;
            const studentName = (await studentCell.innerText().catch(() => '')).trim();
            const meetingType = (await typeCell.locator('span').innerText().catch(() => '')).trim();
            const meetingDate = (await dateCell.innerText().catch(() => '')).trim();
            const meetingStatus = (await statusCell.locator('span').innerText().catch(() => '')).trim();
            // ⭐ NOTES extraction logic (TypeScript-safe)
            let meetingNotes = '';
            const notesIcon = notesCell.locator('svg[aria-label]');
            if (await notesIcon.count() > 0) {
                const rawLabel = await notesIcon.getAttribute('aria-label');
                meetingNotes = (rawLabel ?? '').trim();   // <-- FIXED
            } else {
                meetingNotes = (await notesCell.innerText().catch(() => '')).trim();
            }

            pastMeetings.push({
                meetingTitle,
                studentName,
                meetingType,
                meetingDate,
                meetingStatus,
                meetingNotes
            });

            // console.log(`📌 Row ${i + 1}:`, pastMeetings[i]);
        }
        // ⭐ Return both meeting count value and meetings list
        return {
            pastMeetingsCount: realRowCount,
            pastMeetings
        };
    }

    //Method to get the count of past meetings
    async getPastMeetingsBadgeCount() {
        const pastTab = this.page.locator('button[role="tab"]', { hasText: 'Past' });
        await expect(pastTab).toBeVisible({ timeout: 5000 });
        const badge = pastTab.locator('.MuiBadge-badge');
        await expect(badge).toBeVisible({ timeout: 5000 });
        const count = parseInt(await badge.innerText(), 10);
        return count;
    }


}
    

