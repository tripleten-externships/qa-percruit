import { Page, expect } from '@playwright/test';
import * as env from '../../config/world';
import { BasePage } from '../common/BasePage';


// Page Object Model (POM) class for the AssignmentPage
export class AssignmentPage extends BasePage {
    // Constructor to initialize the page object
    constructor(page: Page) {
        super(page);
    }

// Navigate to the Mentor Assignments section
    async goToAssignments() {
        await this.page.goto(`${env.getBaseUrl()}/admin/mentor-assignments`);
        await this.page.waitForLoadState('networkidle');
    }

// Create a new mentor-student assignment
    async assignStudentToMentor(studentText: string, mentorText: string) {
        // Select student
        this.page.locator('#studentId').click();
        const studentOption = this.page.locator('li[role="option"]', { hasText: studentText });
        await studentOption.scrollIntoViewIfNeeded();
        await studentOption.click();
        // Select mentor
        await this.page.locator('#mentorId').click();
        const mentorOption = this.page.locator('li[role="option"]', { hasText: mentorText });
        await mentorOption.scrollIntoViewIfNeeded();
        await mentorOption.click();
        // Click create
        await this.page.getByRole('button', { name: 'Create Assignment' }).click();
    }
// Verify that the assignment was created successfully
    async verifyAssignmentCreated() {
        await expect(this.page.getByText('Mentor Assignment created')).toBeVisible();
    }
// Verify that the new assignment appears in the assignments list
    async verifyDisplay() {
        await this.page.getByRole('cell', { name: 'Eric Hibbard eric.hibbard91+' });
        
    }
// Remove assignment to maintain test isolation
    async removeAssignment(studentName: string) {
        const row = this.page.locator(`tr:has-text("${studentName}")`);
        // Finds row with specific student name and clicks remove button
        await row.locator('button:has-text("Remove")').click();
    }
// Attempt to create assignment without selecting a mentor
    async assignmentMissingMentor(studentText: string) {
        // Select student only
        this.page.locator('#studentId').click();
        const studentOption = this.page.locator('li[role="option"]', { hasText: studentText });
        await studentOption.scrollIntoViewIfNeeded();
        await studentOption.click();
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

    async checkAssignmentIssues(studentName: string, mentorName: string) {
        // Finds and clicks Check Assignment Issues button to reveal table
        await this.page.getByRole('button', { name: 'Check Assignment Issues' }).click();       
        // Locate the student row
        const studentRow = this.page.locator(`li:has(span:text("${studentName}"))`);
        await studentRow.scrollIntoViewIfNeeded();
        // Locate the dropdown inside that row and click to open
        const dropdown = studentRow.locator('div[role="combobox"]');
        await dropdown.click();
        // Select mentor from dropdown
        const mentorOption = this.page.locator(`li[role="option"]:has-text("${mentorName}")`);
        await mentorOption.scrollIntoViewIfNeeded();
        await mentorOption.click();
        const assignMentorButton = studentRow.getByRole('button', { name: 'Assign Mentor' });
        await expect(assignMentorButton).toBeEnabled();
        await assignMentorButton.click();
    } 

    async verifyTableDisplay() {
    // Verify that table displays existing assignments
        const tableRows = this.page.locator('table tbody tr');
        const rowCount = await tableRows.count();
        expect(rowCount).toBeGreaterThan(0);
    }

    async verifyColumnHeaders() {
    // Verify that the table contains the correct columns
        const headers = this.page.locator('tr.MuiTableRow-head th.MuiTableCell-head');
    // Collect the visible text of all headers
        const headerTexts = await headers.allTextContents();
    // Assert the required columns are present
        expect(headerTexts).toContain('Student');
        expect(headerTexts).toContain('Mentor');
        expect(headerTexts).toContain('Status');
        expect(headerTexts).toContain('Assigned Date');
    }
}
