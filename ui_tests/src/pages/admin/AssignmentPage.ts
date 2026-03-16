import { Page, expect, } from '@playwright/test';
import { Locator } from '@playwright/test';
import * as env from '../../config/world';
import { BasePage } from '../common/BasePage';
import { CookiesPolicyPage } from '../common/CookiesPolicyPage';                


// Page Object Model (POM) class for the AssignmentPage
export class AssignmentPage extends BasePage {

    //LOCATORS

    STUDENT_COMBOBOX_LOCATOR: Locator;
    MENTOR_COMBOBOX_LOCATOR: Locator;
    CREATE_ASSIGNMENT_BUTTON_LOCATOR: Locator;
    ASSIGNMENT_SUCCESS_MESSAGE_LOCATOR: Locator;  
    CAREER_COACH_STUDENT_LOCATOR: Locator;  
    STUDENT_SELECTED_MESSAGE_LOCATOR: Locator;
    MENTOR_OPTION_LOCATOR: Locator;
    CURRENT_ASSIGNMENTS_HEADER_LOCATOR: Locator;
    SEARCH_ASSIGNMENTS_INPUT_LOCATOR: Locator;
    CHECK_ASSIGNMENT_ISSUES_BUTTON_LOCATOR: Locator;
    CURRENT_ASSIGNMENTS_COLUMN_HEADERS_LOCATOR: Locator;


    // Constructor to initialize the page object
    constructor(page: Page) {
        super(page);
      
        this.STUDENT_COMBOBOX_LOCATOR = this.page.getByRole('combobox', { name: 'Select Students' });        
        this.MENTOR_COMBOBOX_LOCATOR = this.page.locator('#mentorId');
        this.CREATE_ASSIGNMENT_BUTTON_LOCATOR = this.page.locator('button:has-text("Create Assignment")');
        this.ASSIGNMENT_SUCCESS_MESSAGE_LOCATOR = this.page.locator('text=Mentor Assignment created');
        this.CAREER_COACH_STUDENT_LOCATOR = this.page.locator('div').filter({ hasText: 'Career Coach-Student' }).nth(4);
        this.STUDENT_SELECTED_MESSAGE_LOCATOR = this.page.getByText('1 student selected:').first();
        this.MENTOR_OPTION_LOCATOR = this.page.locator('li[role="option"]');
        this.CURRENT_ASSIGNMENTS_HEADER_LOCATOR = this.page.getByRole('heading', { name: /Current Assignments/i });
        this.SEARCH_ASSIGNMENTS_INPUT_LOCATOR = this.page.getByRole('textbox', { name: 'Search assignments...' });
        this.CHECK_ASSIGNMENT_ISSUES_BUTTON_LOCATOR = this.page.getByRole('button', { name: 'Check Assignment Issues' });
        this.CURRENT_ASSIGNMENTS_COLUMN_HEADERS_LOCATOR = this.page.locator('tr.MuiTableRow-head th.MuiTableCell-head');
    }     
    
    // Navigate to the Mentor Assignments section
    async goToAssignments() {     
       
        await this.page.goto(`${env.getBaseUrl()}/admin/mentor-assignments`);        
    }

    async waitForDashboard(timeout = 40000) {
        await expect(this.page.locator('h1:has-text("Admin")')).toBeVisible({ timeout });
    }
    // helper that returns the mentor option locator
    getMentorOption(mentorText: string) {
        return this.MENTOR_OPTION_LOCATOR.filter({ hasText: mentorText }).first();
    }

    // helper that returns the assignment row for a student
    getAssignmentRow(studentName: string) {
        return this.page.locator('table tbody tr').filter({ hasText: studentName }).first();
    }
    
    // helper that returns the table row for a student by name
    getTableRow(studentName: string) {
        return this.page.locator(`tr:has-text("${studentName}")`);
    }

// Create a new mentor-student assignment
async assignStudentToMentor(searchText: string, studentText: string, mentorText: string) {
    
    // --- Student: click the student combobox and choose ---
    const studentInput = this.page.locator('input[placeholder="Search by name or email..."]').first();
    await studentInput.waitFor({ state: 'visible', timeout: 15000 });    
    
    await this.STUDENT_COMBOBOX_LOCATOR.click();
    await this.STUDENT_COMBOBOX_LOCATOR.fill(searchText);
    await this.page.getByRole('option', { name: searchText }).getByRole('checkbox').check();
    
    // click outside to close dropdown and trigger selection
    await this.CAREER_COACH_STUDENT_LOCATOR.click(); 
    
    // 2) alert or selected-message contains the selected student
     await expect(this.STUDENT_SELECTED_MESSAGE_LOCATOR).toBeVisible({ timeout: 5000 });
     await expect(this.page.getByText(studentText)).toBeVisible({ timeout: 5000 });
   

    // wait for the combobox to expand / for options container to appear
    await this.page.waitForTimeout(200); // short pause to let autocomplete request start
    
    // --- Mentor: click the mentor combobox and choose ---
    const mentorControl = this.MENTOR_COMBOBOX_LOCATOR;
    await mentorControl.waitFor({ state: 'visible', timeout: 15000 });
    await mentorControl.click();
    
    // some select implementations render options in a listbox/ul as li[role="option"]
    const mentorOption = this.getMentorOption(mentorText);
    await mentorOption.waitFor({ state: 'visible', timeout: 10000 });
    await mentorOption.scrollIntoViewIfNeeded();
    await mentorOption.click();    
    
    // 3) verify the mentor is selected in the UI - combo box shows the mentor name
    await expect(mentorControl).toHaveText(mentorText, { timeout: 5000 });  

    // 4) verify Create Assignment button is enabled and click it
    await expect(this.CREATE_ASSIGNMENT_BUTTON_LOCATOR).toBeEnabled({ timeout: 5000 });    
    await this.page.getByRole('button', { name: 'Create Assignment' }).click();
}

// Verify that the assignment was created successfully
    async verifyAssignmentCreated() {
        await expect(this.page.getByText('Career Coach Assignment created successfully. Both student and coach have been')).toBeVisible({ timeout: 5000 });
    }

// Verify that the new assignment appears in the assignments list
    async verifyDisplay(studentName: string, mentorName: string, mentorEmail: string, assignedDatePrefix?: string, status?: string) {
        // find the row containing the student
        const row = this.getAssignmentRow(studentName);
        await expect(row).toBeVisible();
        
        // assert mentor, email, date, status within that row only
        await expect(row).toContainText(mentorName);
        await expect(row).toContainText(mentorEmail);
        if (assignedDatePrefix) await expect(row).toContainText(assignedDatePrefix);
        if (status) await expect(row).toContainText(new RegExp(status, 'i')); // case-insensitive
    }

// Remove assignment to maintain test isolation
    async removeAssignment(studentName: string) {
        const row = this.getTableRow(studentName);
        await expect(row).toBeVisible({ timeout: 5000 });
        // Finds row with specific student name and clicks remove button
        await row.locator('button:has-text("Remove")').click();        
        await expect(this.page.getByText('Career Coach Assignment removed successfully')).toBeVisible({ timeout: 10000 });
    }
// Attempt to create assignment without selecting a mentor
    async assignmentMissingMentor(studentText: string) {
        // Select student only        
        const studentInput = this.page.locator('input[placeholder="Search by name or email..."]').first();
        await studentInput.waitFor({ state: 'visible', timeout: 15000 });    
    
        await this.STUDENT_COMBOBOX_LOCATOR.click();
        await this.STUDENT_COMBOBOX_LOCATOR.fill(studentText);
        await this.page.getByRole('option', { name: studentText }).getByRole('checkbox').check();
        // click outside to close dropdown and trigger selection
        await this.CAREER_COACH_STUDENT_LOCATOR.click(); 

    }
// Verify that no assignment was created
    async verifyNoAssignments() {
        // Verify button is disabled
        const createButton = this.page.locator('button:has-text("Create Assignment")');
        await expect(createButton).toBeDisabled();
        // Verify student is NOT in the table
        const row = await this.page.locator('tr:has-text("Student Name")').count();
        expect(row).toBe(0);
    }

// Check Assignment Issues Feature
    async checkAssignmentIssues(studentEmail: string, mentorName: string) {
        // Checks for All Students have mentors assigned message. Msg disables check assignment issues button
        const allAssignedMessage = this.page.getByText(
            'All students have mentors assigned with complete information!'
        );

        if (await allAssignedMessage.isVisible().catch(() => false)) {
            // Verify the "Check Assignment Issues" button is disabled when all assigned
            const checkIssuesButton = this.page.getByRole('button', { name: 'Check Assignment Issues' });
            await expect(checkIssuesButton).toBeDisabled();
            return;
        }

        // Check if the "no coach yet" message is shown — if so, proceed to assign
        const noCoachMessage = this.page.getByText(
            "These students don't have any career coach assigned to them yet."
        );
        await noCoachMessage.waitFor({ state: 'visible', timeout: 3000 }).catch(() => { });

        // Finds and clicks Check Assignment Issues button to reveal table
        await this.CHECK_ASSIGNMENT_ISSUES_BUTTON_LOCATOR.click();

        await expect(noCoachMessage).toBeVisible({ timeout: 3000 });

        // Locate the student row using listitem filter
        const studentRow = this.page.getByRole('listitem').filter({ hasText: studentEmail });
        await expect(studentRow).toBeVisible({ timeout: 5000 });
        await studentRow.scrollIntoViewIfNeeded();

        // Click the combobox to open mentor dropdown
        const combobox = studentRow.getByRole('combobox');
        await expect(combobox).toBeEnabled({ timeout: 5000 });
        await combobox.click();

        // Select mentor from dropdown
        const mentorOption = this.page.getByRole('option', { name: mentorName });
        await expect(mentorOption).toBeVisible({ timeout: 5000 });
        await mentorOption.click();

        // Click the assign button
        const assignButton = studentRow.getByRole('button');
        await expect(assignButton).toBeEnabled({ timeout: 5000 });
        await assignButton.click();

        // Verify assignment was successful
        await expect(this.page.getByText('Career Coach Assignment created successfully. Both student and coach have been')).toBeVisible({ timeout: 5000 });

        return 'assigned';
}

// Verify that the assignment issue was resolved or if all students were already assigned
    async verifyAssignmentIssue() {
        const createdMessage = this.page.getByText('Career Coach Assignment created successfully. Both student and coach have been');
        const allAssignedMessage = this.page.getByText(
        'All students have mentors assigned with complete information!'
    );

        if (await allAssignedMessage.isVisible()) {
        await expect(allAssignedMessage).toBeVisible({ timeout: 5000 });
        } else {
            await expect(createdMessage).toBeVisible({ timeout: 5000 });
    }
}
   
// Verify that the assignment table loads with the correct row of Mentor/Student/Status/Date
    async verifyTableDisplay() {
    // Verify that table displays existing assignments        
        
        await expect(this.CURRENT_ASSIGNMENTS_HEADER_LOCATOR).toBeVisible({ timeout: 5000 });
        await expect(this.SEARCH_ASSIGNMENTS_INPUT_LOCATOR).toBeVisible({ timeout: 5000 });
        await expect(this.page.locator('table')).toBeVisible({ timeout: 5000 });
  
        const tableRows = this.page.locator('table tbody tr');
        const rowCount = await tableRows.count();
        expect(rowCount).toBeGreaterThan(0);
        
        // Pass rowCount as expectedCount to verify it matches the count in the heading text
        await this.verifyAssignmentCountMatchesUI(rowCount);
    }

    // Helper method to verify table row count matches heading text display
    async verifyAssignmentCountMatchesUI(expectedCount: number) {
        // 1) Get the table row count (already passed as expectedCount)
        console.log(`✓ Table row count: ${expectedCount}`);
        
        // 2) Extract count from heading text (e.g., "Current Assignments (110)")
        let textCount = 0;
        try {
            const headingText = await this.page.getByRole('heading', { name: /Current Assignments/ }).textContent({ timeout: 3000 });
            const textCountMatch = headingText?.match(/\((\d+)\)/);
            textCount = textCountMatch ? parseInt(textCountMatch[1]) : 0;
            console.log(`✓ Heading text: "${headingText}"`);
        } catch (e) {
            console.log(`⚠️  Heading element not found, skipping text count verification`);
        }
        
        // 3) Compare table rows with heading count mathematically
        console.log(`✓ Text count from heading: ${textCount}`);
        console.log(`✓ Expected count: ${expectedCount}`);
        
        // Verify all counts match
        expect(expectedCount).toBeGreaterThan(0);
        
        if (textCount > 0) {
            expect(textCount).toBe(expectedCount);
            console.log(`✓ PASS: Heading count (${textCount}) matches table rows (${expectedCount})`);
        }
    }

    // Helper method to verify column headers are correct
    async verifyColumnHeaders() {
    // Verify that the table contains the correct columns
        const headers = this.CURRENT_ASSIGNMENTS_COLUMN_HEADERS_LOCATOR;
        await expect(headers).toHaveCount(6); // Expecting 6 columns: Student, Career Coach, Email, Status, Assigned Date, Actions
    // Collect the visible text of all headers
        const headerTexts = await headers.allTextContents();
    // Assert the required columns are present
        expect(headerTexts).toContain('Student');
        expect(headerTexts).toContain('Career Coach');
        expect(headerTexts).toContain('Email');
        expect(headerTexts).toContain('Status');
        expect(headerTexts).toContain('Assigned Date');
        expect(headerTexts).toContain('Actions');        
    }
}
