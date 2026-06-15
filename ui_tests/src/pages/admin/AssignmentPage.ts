import { Page, expect } from '@playwright/test';
import * as env from '../../config/world';
import { BasePage } from '../common/BasePage';

export class AssignmentPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async goToAssignments() {
        await this.page.goto(`${env.getBaseUrl()}/admin/mentor-assignments`);
        await this.page.waitForLoadState('networkidle');
    }

    async waitForDashboard(timeout = 40000) {
        await expect(this.page.locator('h1')).toContainText(/Good (morning|afternoon|evening)/i, { timeout });
    }

    async assignStudentToMentor(studentText: string, mentorText: string) {
        // Select student
        const studentInput = this.page.getByRole('combobox', { name: /select students/i });
        await studentInput.click();
        await studentInput.fill(studentText);

        const studentOption = this.page.locator('li[role="option"]').filter({
            hasText: studentText,
        });

        await expect(studentOption).toBeVisible({ timeout: 10000 });
        await studentOption.click();

        // Select mentor / career coach
        const mentorInput = this.page.getByRole('combobox', { name: /career coach/i });
        await mentorInput.click();
        await mentorInput.fill(mentorText);

        const mentorOption = this.page.locator('li[role="option"]').filter({
            hasText: mentorText,
        });

        await expect(mentorOption).toBeVisible({ timeout: 10000 });
        await mentorOption.click();

        // Click create
        await this.page.getByRole('button', { name: 'Create Assignment' }).click();
    }

    async verifyAssignmentCreated() {
        await expect(
            this.page.getByText(/Mentor Assignment created|created successfully|successfully/i)
        ).toBeVisible({ timeout: 10000 });
    }

    async verifyDisplay(studentText: string) {
        await expect(this.page.getByText(studentText)).toBeVisible();
    }

    async removeAssignment(studentName: string) {
        const row = this.page.locator(`tr:has-text("${studentName}")`);
        await row.locator('button:has-text("Remove")').click();

        const confirmButton = this.page.getByRole('button', { name: /confirm|remove|yes/i });

        if (await confirmButton.isVisible().catch(() => false)) {
            await confirmButton.click();
        }
    }

    async removeAssignmentIfExists(studentName: string) {
        const row = this.page.locator(`tr:has-text("${studentName}")`);
        const rowCount = await row.count();

        if (rowCount > 0) {
            await row.first().locator('button:has-text("Remove")').click();

            const confirmButton = this.page.getByRole('button', { name: /confirm|remove|yes/i });

            if (await confirmButton.isVisible().catch(() => false)) {
                await confirmButton.click();
            }

            await expect(row.first()).not.toBeVisible({ timeout: 10000 });
        }
    }

    async assignmentMissingMentor(studentText: string) {
        const studentInput = this.page.getByRole('combobox', { name: /select students/i });
        await studentInput.click();
        await studentInput.fill(studentText);

        const studentOption = this.page.locator('li[role="option"]').filter({
            hasText: studentText,
        });

        await expect(studentOption).toBeVisible({ timeout: 10000 });
        await studentOption.click();
    }

    async verifyNoAssignments(studentName: string) {
        const createButton = this.page.getByRole('button', { name: 'Create Assignment' });
        await expect(createButton).toBeDisabled();

        const row = await this.page.locator(`tr:has-text("${studentName}")`).count();
        expect(row).toBe(0);
    }

    async checkAssignmentIssues(studentName: string, mentorName: string) {
        const satisfiedMessage = this.page.getByText(
            'All students have mentors assigned with complete information!'
        );

        await satisfiedMessage.first().waitFor({ timeout: 3000 }).catch(() => {});

        if (await satisfiedMessage.isVisible()) {
            return 'all-complete';
        }

        await this.page.getByRole('button', { name: 'Check Assignment Issues' }).click();

        const studentRow = this.page.locator(`li:has(span:text("${studentName}"))`);
        await studentRow.scrollIntoViewIfNeeded();

        const dropdown = studentRow.locator('div[role="combobox"]');
        await dropdown.click();

        const mentorOption = this.page.locator(`li[role="option"]:has-text("${mentorName}")`);
        await mentorOption.scrollIntoViewIfNeeded();
        await mentorOption.click();

        const assignMentorButton = studentRow.getByRole('button', { name: 'Assign Mentor' });
        await expect(assignMentorButton).toBeEnabled();
        await assignMentorButton.click();

        return 'assigned';
    }

    async verifyAssignmentIssue() {
        const createdMessage = this.page.getByText(/Mentor Assignment created successfully|created successfully/i);
        const allAssignedMessage = this.page.getByText(
            'All students have mentors assigned with complete information!'
        );

        if (await allAssignedMessage.isVisible()) {
            await expect(allAssignedMessage).toBeVisible();
        } else {
            await expect(createdMessage).toBeVisible();
        }
    }

    async verifyTableDisplay() {
        const tableRows = this.page.locator('table tbody tr');
        const rowCount = await tableRows.count();
        expect(rowCount).toBeGreaterThan(0);
    }

    async verifyColumnHeaders() {
        const headers = this.page.locator('tr.MuiTableRow-head th.MuiTableCell-head');
        const headerTexts = await headers.allTextContents();

        expect(headerTexts).toContain('Student');
        expect(headerTexts).toContain('Career Coach');
        expect(headerTexts).toContain('Status');
        expect(headerTexts).toContain('Assigned Date');
    }
}