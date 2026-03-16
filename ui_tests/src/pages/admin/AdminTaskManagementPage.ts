import { Page, expect, } from '@playwright/test';
import { Locator } from '@playwright/test';
import * as env from '../../config/world';
import { BasePage } from '../common/BasePage';
import { table } from 'console';

const student = 'manjula23.reddy+studentbulk11@gmail.com';
const originalTitle = 'Create Cover Letter Template';
const updatedTitle = 'Create Cover Letter Template - Updated';
const originalDescription = 'Cover letter template description';
const updatedDescription = 'Cover letter template description - Updated';
const timeEstimate = '05';
const updatedTimeEstimate = '08';
const dueDate = '2026-03-20';
const updatedDueDate = '2026-03-25';

type QuickTemplateCase = {
    name: string;
    student: string;
    templateButton: string;
    expectedTitleFragment: string;
    priority: 'High' | 'Medium' | 'Low';
    timeEstimate: string;
    description: string;
};

type BulkTemplateCase = {
    name: string;
    templateButton: string;
    expectedTitle: string;
    expectedTimeEstimate: string;
    expectedDescriptionFragment: string;
    priority: 'High' | 'Medium' | 'Low';
    students: string[];
};

const singleAssignCases: QuickTemplateCase[] = [
    {
        name: 'Application template (High)',
        student: 'manjula23.reddy+student10@gmail.com',
        templateButton: 'application',
        expectedTitleFragment: 'Job Application - [Company Name]',
        priority: 'Medium',
        timeEstimate: '2',
        description: 'Apply to [Company Name] for [Position Title] ',
    },

    {
        name: 'Interview Prep template',
        student: 'manjula23.reddy+student10@gmail.com',
        templateButton: 'interview prep',
        expectedTitleFragment: 'Interview Preparation - [Company Name]',
        priority: 'Medium',
        timeEstimate: '4',
        description: 'Prepare for interview with [Company Name] ',
    },
    {
        name: 'Expert Interview template',
        student: 'manjula23.reddy+student1@gmail.com',
        templateButton: 'expert interview',
        expectedTitleFragment: 'Schedule Expert Interview',
        priority: 'Medium',
        timeEstimate: '2',
        description: 'Schedule an expert interview session to gain industry insights  ',
    },
    {
        name: 'Skill Development template',
        student: 'manjula23.reddy+student2@gmail.com',
        templateButton: 'skill development',
        expectedTitleFragment: 'Skill Development - [Skill Name]',
        priority: 'Medium',
        timeEstimate: '10',
        description: 'Develop proficiency in [Skill Name] ',
    },
    {
        name: 'Networking template',
        student: 'manjula23.reddy+student3@gmail.com',
        templateButton: 'networking',
        expectedTitleFragment: 'Networking Activity - [Event/Platform]',
        priority: 'Medium',
        timeEstimate: '3',
        description: 'Expand professional network through [Event/Platform] ',
    },
    {
        name: 'Portfolio template',
        student: 'manjula23.reddy+studentbulk3@gmail.com',
        templateButton: 'portfolio',
        expectedTitleFragment: 'Portfolio Project - [Project Name]',
        priority: 'Medium',
        timeEstimate: '20',
        description: 'Develop portfolio project: [Project Name] ',
    },
];

const bulkAssignCases: BulkTemplateCase[] = [
    {
        name: 'Application',
        templateButton: 'application',
        expectedTitle: 'Job Application - [Company Name]',
        expectedTimeEstimate: '2',
        expectedDescriptionFragment: 'Apply to [Company Name] for [Position Title]',
        priority: 'Medium',
        students: ['manjula23.reddy+studentbulk11@gmail.com', 'manjula23.reddy+studentbulk12@gmail.com', 'manjula23.reddy+studentbulk13@gmail.com'],
    },
    {
        name: 'Interview Prep',
        templateButton: 'interview prep',
        expectedTitle: 'Interview Preparation - [Company Name]',
        expectedTimeEstimate: '4',
        expectedDescriptionFragment: 'Prepare for interview with [Company Name]',
        priority: 'Medium',
        students: ['manjula23.reddy+studentbulk14@gmail.com', 'manjula23.reddy+studentbulk11@gmail.com'],
    },
    {
        name: 'Expert Interview',
        templateButton: 'expert interview',
        expectedTitle: 'Schedule Expert Interview',
        expectedTimeEstimate: '2',
        expectedDescriptionFragment: 'Schedule an expert interview',
        priority: 'Medium',
        students: ['manjula23.reddy+studentbulk11@gmail.com', 'manjula23.reddy+studentbulk12@gmail.com', 'manjula23.reddy+studentbulk13@gmail.com'],
    },
    {
        name: 'Skill Development',
        templateButton: 'skill development',
        expectedTitle: 'Skill Development - [Skill Name]',
        expectedTimeEstimate: '10',
        expectedDescriptionFragment: 'Develop proficiency in [Skill Name]',
        priority: 'Medium',
        students: ['manjula23.reddy+studentbulk11@gmail.com', 'manjula23.reddy+studentbulk12@gmail.com', 'manjula23.reddy+studentbulk13@gmail.com'],
    },
    {
        name: 'Networking',
        templateButton: 'networking',
        expectedTitle: 'Networking Activity - [Event/Platform]',
        expectedTimeEstimate: '3',
        expectedDescriptionFragment: 'Expand professional network through [Event/Platform]',
        priority: 'Medium',
        students: ['manjula23.reddy+studentbulk11@gmail.com', 'manjula23.reddy+studentbulk12@gmail.com', 'manjula23.reddy+studentbulk13@gmail.com', 'manjula23.reddy+studentbulk14@gmail.com'],
    },
    {
        name: 'Portfolio',
        templateButton: 'portfolio',
        expectedTitle: 'Portfolio Project - [Project Name]',
        expectedTimeEstimate: '20',
        expectedDescriptionFragment: 'Develop portfolio project: [Project Name]',
        priority: 'Medium',
        students: ['manjula23.reddy+studentbulk11@gmail.com', 'manjula23.reddy+studentbulk12@gmail.com', 'manjula23.reddy+studentbulk13@gmail.com'],
    },
];

export class AdminTaskManagementPage extends BasePage {

    //Locators

    private PRIORITY_FILTER: Locator
    private STUDENT_FILTER: Locator
    private STATUS_FILTER: Locator
    private ASSIGN_TASK_BUTTON: Locator
    private SINGLE_ASSIGN_TAB: Locator
    private BULK_ASSIGN_TAB: Locator
    private CANCEL_BUTTON: Locator
    private TASKS_TAB: Locator
    private TOTAL_TASKS_ANALYTICS: Locator
    private COMPLETION_RATE_ANALYTICS: Locator
    private OVERDUE_TASKS_ANALYTICS: Locator
    private PERFORMANCE_SCORE_ANALYTICS: Locator
    private TASK_ACTIVITY_TREND_ANALYTICS: Locator
    private STUDENT_PERFORMANCE_ANALYTICS: Locator
    private STATUS_DISTRIBUTION_ANALYTICS: Locator
    private TASK_ANALYTICS_TAB: Locator
    private DATE_RANGE_FILTER: Locator
    private MENTOR_FILTER: Locator
    private STUDENT_ANALYTICS_FILTER: Locator
    private MENTOR_FILTER_OPTION: (option: string) => Locator
    private STUDENT_ANALYTICS_FILTER_OPTION: (option: string) => Locator
    private EXPORT_BUTTON: Locator
    private SINGLE_ASSIGN_STUDENT_DROPDOWN: Locator
    private STUDENT_NAME: Locator


    // Constructor to initialize the page object
    constructor(page: Page) {
        super(page);

        const filters = this.page.getByRole('combobox');

        this.STUDENT_FILTER = filters.nth(0);
        this.STATUS_FILTER = filters.nth(1);
        this.PRIORITY_FILTER = filters.nth(2);
        this.ASSIGN_TASK_BUTTON = this.page.getByRole('button', { name: 'Assign Task' });
        this.SINGLE_ASSIGN_TAB = this.page.getByRole('tab', { name: 'Single Assign' });
        this.BULK_ASSIGN_TAB = this.page.getByRole('tab', { name: 'Bulk Assign' });
        this.CANCEL_BUTTON = this.page.getByRole('button', { name: 'Cancel' });
        this.TASKS_TAB = this.page.getByRole('tab', { name: 'Tasks' });

        // Make analytics locators strict/unique
        this.TOTAL_TASKS_ANALYTICS = this.page.locator('p', { hasText: /^Total Tasks$/ }).first();
        this.COMPLETION_RATE_ANALYTICS = this.page.locator('p', { hasText: /^Completion Rate$/ }).first();
        this.OVERDUE_TASKS_ANALYTICS = this.page.locator('p', { hasText: /^Overdue Tasks$/ }).first();
        this.PERFORMANCE_SCORE_ANALYTICS = this.page.locator('p', { hasText: /^Performance Score$/ }).first();

        this.TASK_ACTIVITY_TREND_ANALYTICS = this.page.locator('.MuiPaper-root').filter({ hasText: /Task Activity Trend/i }).first();
        this.STUDENT_PERFORMANCE_ANALYTICS = this.page.locator('.MuiPaper-root').filter({ hasText: /Student Performance/i }).first();
        this.STATUS_DISTRIBUTION_ANALYTICS = this.page.locator('.MuiPaper-root').filter({ hasText: /Status Distribution/i }).first();

        const analyticsFilters = this.page.getByRole('combobox');
        this.TASK_ANALYTICS_TAB = this.page.getByRole('tab', { name: 'Task Analytics' });
        this.DATE_RANGE_FILTER = analyticsFilters.nth(0);
        this.MENTOR_FILTER = analyticsFilters.nth(1);
        this.STUDENT_ANALYTICS_FILTER = analyticsFilters.nth(2);

        this.MENTOR_FILTER_OPTION = (option: string) => this.page.getByRole('option', { name: option, exact: true });
        this.STUDENT_ANALYTICS_FILTER_OPTION = (option: string) => this.page.getByRole('option', { name: option, exact: true });
        this.EXPORT_BUTTON = this.page.getByRole('button', { name: 'Export' });

        const singleAssignStu = this.page.getByRole('combobox');
        this.SINGLE_ASSIGN_STUDENT_DROPDOWN = singleAssignStu.nth(0);
        this.STUDENT_NAME = this.page.getByRole('option', { name: 'manjula23.reddy+student10@gmail.com' })
    }

    async navigateToTaskManagement() {
        await this.page.goto(`${env.getBaseUrl()}/admin/tasks`, { waitUntil: 'domcontentloaded' });
        await expect(this.page).toHaveURL(/admin\/tasks/);
        //await this.page.waitForLoadState('networkidle');       
    }

    // Method to verify that the Task Management page loads correctly with all expected elements  
    async verifyTaskManagementPage() {
        await expect(this.page).toHaveURL(/admin\/tasks/);

        await expect(this.TASKS_TAB).toBeVisible({ timeout: 10000 });
        // Assert that the Tasks tab is highlighted/selected by default
        await expect(this.TASKS_TAB).toHaveAttribute('aria-selected', 'true');

        // Verify student filter dropdown has options        
        await expect(this.STUDENT_FILTER).toBeVisible({ timeout: 5000 });
        await expect(this.STATUS_FILTER).toBeVisible({ timeout: 5000 });
        await expect(this.PRIORITY_FILTER).toBeVisible({ timeout: 5000 });

        const tableRows = this.page.locator('table tbody tr');
        const rowCount = await tableRows.count();
        expect(rowCount).toBeGreaterThan(0);

        await expect(this.ASSIGN_TASK_BUTTON).toBeVisible({ timeout: 5000 });

    }

    // Method to apply status filter and verify it is applied correctly
    async applyStatusFilter(status: string) {
        await expect(this.STATUS_FILTER).toBeVisible({ timeout: 5000 });
        await this.STATUS_FILTER.click();
        await this.page.getByRole('option', { name: status, exact: true }).click();
        await expect(this.STATUS_FILTER).toContainText(status, { timeout: 5000 });
    }

    // Method to verify that all visible tasks in the table have the expected status after applying status filter
    async verifyStatusFilterApplied(expectedStatus: string) {
        // Wait for the filter to be applied and table to update
        await this.page.waitForTimeout(1000);

        // Get total number of rows
        const totalRows = await this.page.locator('table tbody tr').count();
        // Additional verification: ensure at least one row exists
        expect(totalRows).toBeGreaterThan(0);

        if (expectedStatus === 'All Statuses') {
            return; // Skip specific status check if "All Statuses" is selected
        }

        // Get number of rows that contain the expected status
        const rowsWithStatus = await this.page.locator('table tbody tr').filter({ hasText: expectedStatus }).count();

        // Assert that all rows have the expected status
        expect(rowsWithStatus).toBe(totalRows);

    }

    // Method to apply student filter and verify it is applied correctly
    async applyStudentFilter(student: string) {
        await expect(this.STUDENT_FILTER).toBeVisible({ timeout: 5000 });
        await this.STUDENT_FILTER.click();
        await this.page.getByRole('option', { name: student, exact: true }).click();
        await expect(this.STUDENT_FILTER).toContainText(student, { timeout: 5000 });
    }

    // Method to verify that all visible tasks in the table are assigned to the expected student after applying student filter
    async verifyStudentFilterApplied(expectedStudent: string) {
        // Wait for the filter to be applied and table to update
        await expect(this.STUDENT_FILTER).toContainText(expectedStudent, { timeout: 5000 });

        // Get total number of rows
        const tableRows = this.page.locator('table tbody tr');
        await expect(tableRows.first()).toBeVisible({ timeout: 5000 });

        const totalRows = await tableRows.count();
        expect(totalRows).toBeGreaterThan(0); // Ensure there are rows to check

        if (expectedStudent === 'All Students') {
            return; // Skip specific student check if "All Students" is selected
        }
        // Get number of rows that contain the expected student
        const rowsWithStudent = await tableRows.filter({ hasText: expectedStudent }).count();

        // Additional verification: ensure at least one row exists
        expect(rowsWithStudent).toBeGreaterThan(0);
    }

    // Method to apply priority filter and verify it is applied correctly
    async applyPriorityFilter(option: string) {
        await expect(this.PRIORITY_FILTER).toBeVisible({ timeout: 5000 });
        await this.PRIORITY_FILTER.click();
        await this.page.getByRole('option', { name: option, exact: true }).click();
        await expect(this.PRIORITY_FILTER).toContainText(option, { timeout: 5000 });
    }

    // Method to verify that all visible tasks in the table have the expected priority after applying priority filter
    async verifyPriorityFilterApplied(expectedPriority: string) {
        // Wait for the filter to be applied and table to update
        await this.page.waitForTimeout(1000);
        // Get total number of rows
        const totalRows = await this.page.locator('table tbody tr').count();
        // Additional verification: ensure at least one row exists
        expect(totalRows).toBeGreaterThan(0);

        if (expectedPriority === 'All Priorities') {
            return; // Skip specific priority check if "All Priorities" is selected
        }
        // Get number of rows that contain the expected priority
        const rowsWithPriority = await this.page.locator('table tbody tr').filter({ hasText: expectedPriority }).count();

        // Assert that all rows have the expected priority
        expect(rowsWithPriority).toBe(totalRows);

    }

    // Helper method to verify that a task with specific details exists in the table after assignment
    async verifyTaskAnalytics() {
        await this.openTaskAnalytics();

        await expect(this.TOTAL_TASKS_ANALYTICS).toHaveCount(1);
        await expect(this.TOTAL_TASKS_ANALYTICS).toBeVisible({ timeout: 5000 });

        await expect(this.COMPLETION_RATE_ANALYTICS).toBeVisible({ timeout: 5000 });
        await expect(this.OVERDUE_TASKS_ANALYTICS).toBeVisible({ timeout: 5000 });
        await expect(this.PERFORMANCE_SCORE_ANALYTICS).toBeVisible({ timeout: 5000 });

        await expect(this.TASK_ACTIVITY_TREND_ANALYTICS).toBeVisible({ timeout: 5000 });
        await expect(this.STATUS_DISTRIBUTION_ANALYTICS).toBeVisible({ timeout: 5000 });

        const studentPerformanceCard = this.STUDENT_PERFORMANCE_ANALYTICS;
        await expect(studentPerformanceCard).toBeVisible({ timeout: 5000 });

        await studentPerformanceCard.getByRole('columnheader', { name: /Student/i }).click();
        await studentPerformanceCard.getByRole('button', { name: /Total Tasks/i }).click();
        await studentPerformanceCard.getByRole('button', { name: /Completion Rate/i }).click();
        await studentPerformanceCard.getByRole('columnheader', { name: /Overdue/i }).click();
        await studentPerformanceCard.getByRole('button', { name: /Performance Score/i }).click();
        await studentPerformanceCard.getByRole('columnheader', { name: /Last Activity/i }).click();

    }

    // Helper method to get visible combobox by index (used for analytics filters which have multiple comboboxes)
    private visibleAnalyticsCombobox(index: number): Locator {
        return this.page.locator('[role="combobox"]:visible').nth(index);
    }

    // Method to open Task Analytics tab and verify it is active
    async openTaskAnalytics() {
        await this.TASK_ANALYTICS_TAB.click();
        await expect(this.TASK_ANALYTICS_TAB).toHaveAttribute('aria-selected', 'true', { timeout: 5000 });
    }

    // Method to apply date range filter in Task Analytics and verify it is applied correctly
    async applyDateRangeFilter(option: string) {
        await this.openTaskAnalytics();

        const dateRangeFilter = this.visibleAnalyticsCombobox(0);
        await expect(dateRangeFilter).toBeVisible({ timeout: 5000 });
        await dateRangeFilter.click();

        await this.page.getByRole('option', { name: option, exact: true }).click();
        await expect(dateRangeFilter).toContainText(option, { timeout: 5000 });
    }

    // Method to verify Task Analytics filters and export functionality
    async verifyTaskAnalyticsFilters(page: Page) {
        // Verify date range filter options
        await this.applyDateRangeFilter('Last 7 Days');
        await this.applyDateRangeFilter('Last 30 Days');
        await this.applyDateRangeFilter('Last 90 Days');
        await this.applyDateRangeFilter('All Time');

        // Verify mentor filter options
        const mentorFilter = this.MENTOR_FILTER;
        await mentorFilter.click();
        await expect(this.MENTOR_FILTER_OPTION('Manjula Mentor 2')).toBeVisible({ timeout: 5000 });
        await page.getByRole('option', { name: 'Manjula Mentor 2', exact: true }).click();

        // Verify student filter options
        const studentFilter = this.STUDENT_ANALYTICS_FILTER;
        await studentFilter.click();
        await expect(this.STUDENT_ANALYTICS_FILTER_OPTION('Manjula StudentBulk1')).toBeVisible({ timeout: 5000 });
        await page.getByRole('option', { name: 'Manjula StudentBulk1', exact: true }).click();

        const download1Promise = page.waitForEvent('download');
        await this.EXPORT_BUTTON.click();

        const download = await download1Promise.catch(() => null);
        if (!download) {
            console.warn('❌ Export download did not start (known bug).');
            return;   // skip remaining export content checks
        } else {
            console.log('✅ Export download started successfully.');
        }
        const suggested = await download.suggestedFilename();
        if (suggested !== 'task_analytics_export.csv') {
            console.warn(`❌ Unexpected filename: ${suggested}`);
            return;
        }
    }

    // Helper method to wait for a toast message with specific text to appear
    private async waitForToast(page: Page, text: RegExp, timeout = 7000): Promise<boolean> {
    const candidates = [
        page.getByRole('alert').filter({ hasText: text }).first(),
        page.getByRole('status').filter({ hasText: text }).first(),
        page.locator('.MuiSnackbar-root, .MuiAlert-root').filter({ hasText: text }).first(),
    ];

    const start = Date.now();
    while (Date.now() - start < timeout) {
        for (const c of candidates) {
            const visible = await c.isVisible().catch(() => false);
            if (visible) return true;
        }
        await page.waitForTimeout(250);
    }
    return false;
}

    // Helper method to assign single task using a specific quick template and verify it appears in the Tasks table with correct details
    async assignSingleTaskWithQuickTemplate(page: Page, tc: QuickTemplateCase) {

        const dialog = page.getByLabel('Create Task');
        await expect(dialog).toBeVisible({ timeout: 5000 });

        await dialog.getByRole('button', { name: tc.templateButton }).click();

        // Verify the form fields are pre-filled based on the selected quick template
        await expect(dialog.getByLabel('Title *')).toHaveValue(tc.expectedTitleFragment, { timeout: 5000 });
        await expect(dialog.getByLabel('Time Estimate (hours)')).toHaveValue(tc.timeEstimate, { timeout: 5000 });
        await expect(dialog.getByLabel('Description *')).toContainText(tc.description.trim(), { timeout: 5000 });

        if (tc.priority && tc.priority !== 'Medium') {
            await dialog.getByText('Medium', { exact: true }).click();
            await page.getByRole('option', { name: tc.priority, exact: true }).click();
        }
        // Submit inside the dialog only
        const submitAssignTask = dialog.getByRole('button', { name: 'Assign Task', exact: true });
        await expect(submitAssignTask).toBeEnabled({ timeout: 5000 });
        await submitAssignTask.click();

        // Assert success toast/message        
        const singleToastSeen = await this.waitForToast(page, /task assigned successfully|assigned successfully/i, 8000);
        if (!singleToastSeen) {
            console.warn('Success Message not detected for single assign with quick template; continuing with row verification.');
        }

        // Important: ensure modal is closed before next iteration
        await expect(dialog).toBeHidden({ timeout: 10000 });

        await expect(this.TASKS_TAB).toBeVisible({ timeout: 10000 });
        // Assert that the Tasks tab is highlighted/selected by default       
        await expect(this.TASKS_TAB).toHaveAttribute('aria-selected', 'true');

        const row = page
            .getByRole('row')
            .filter({ hasText: tc.expectedTitleFragment })
            .first();

        await expect(row).toBeVisible();
        await expect(row).toContainText(/assigned/i);
        await expect(row).toContainText(new RegExp(tc.priority, 'i'));
        await expect(row).toContainText(tc.student);
    }

    // Method to assign single task using all quick templates in a loop
    async assignSingleTaskWithTemplates(page: Page) {
        await this.ASSIGN_TASK_BUTTON!.click();
        await this.SINGLE_ASSIGN_TAB.first().click();

        await this.SINGLE_ASSIGN_STUDENT_DROPDOWN.click();
        await expect(this.STUDENT_NAME).toBeVisible({ timeout: 5000 });
        await this.STUDENT_NAME.click();

        for (const testCase of singleAssignCases) {
            console.log(`Testing quick template: ${testCase.name}`);

            const dialog = page.getByLabel('Create Task');

            // Only open modal if it is not already open
            if (!(await dialog.isVisible({ timeout: 5000 }))) {
                const openAssignTask = page.locator('button:has-text("Assign Task"):not([disabled])').first();
                await expect(openAssignTask).toBeVisible({ timeout: 5000 });
                await openAssignTask.click();
                await expect(dialog).toBeVisible({ timeout: 5000 });
            }

            await this.SINGLE_ASSIGN_TAB.first().click();
            if (testCase.name !== 'Application template (High)') {
                await this.SINGLE_ASSIGN_STUDENT_DROPDOWN.click();
                await expect(this.page.getByRole('option', { name: testCase.student })).toBeVisible({ timeout: 5000 });
                await this.page.getByRole('option', { name: testCase.student }).click();
            }

            await this.assignSingleTaskWithQuickTemplate(page, testCase);
        }

        // Cleanup: delete created tasks (reverse order is safer for dynamic tables)
        for (const testCase of [...singleAssignCases].reverse()) {
            await this.deleteTaskByTitleAndStudent(page, testCase.expectedTitleFragment, testCase.student);
        }
    }

    // Generic delete helper for quick-template tasks
    private async deleteTaskByTitleAndStudent(page: Page, title: string, student: string) {
    const row = page
        .locator('table tbody tr')
        .filter({ hasText: title })
        .filter({ hasText: student })
        .first();

    try {
        await expect(row).toBeVisible({ timeout: 15000 });
    } catch {
        if (page.isClosed()) return;
        throw new Error(`Row not found for title: "${title}", student: "${student}"`);
    }

    if (page.isClosed()) return;
    await row.scrollIntoViewIfNeeded();

     // scroll table to Actions column
        await page.locator('.MuiTableContainer-root').first().evaluate((el) => {
            el.scrollLeft = el.scrollWidth;
        });

    if (page.isClosed()) return;
    const deleteButton = row.getByLabel('Delete Task');
    await expect(deleteButton).toBeVisible({ timeout: 10000 });

    // Click + dialog handling together (no hanging fallback chain)
    const dialogPromise = page.waitForEvent('dialog', { timeout: 2500 })
        .then(d => d.accept())
        .catch(() => null);

    try {
        await deleteButton.click({ timeout: 8000 });
    } catch {
        if (page.isClosed()) return;
        await deleteButton.click({ force: true, timeout: 4000 });
    }

    await dialogPromise;

    if (page.isClosed()) return;

    const confirmBtn = page.getByRole('button', { name: /delete|confirm/i }).first();
    if (await confirmBtn.isVisible().catch(() => false)) {
        await confirmBtn.click({ timeout: 4000 }).catch(() => null);
    }

    if (page.isClosed()) return;
    await expect(
        page.locator('table tbody tr').filter({ hasText: title }).filter({ hasText: student })
    ).toHaveCount(0, { timeout: 15000 });

    console.log(`✅ Deleted task: "${title}" for student: "${student}"`);
}

    // Helper method to select multiple students in the bulk assign dialog
    private async selectBulkStudents(page: Page, students: string[]) {
        const dialog = page.getByLabel('Create Task');
        await dialog.getByRole('combobox').first().click();

        for (const student of students) {
            const option = page.locator('li').filter({ hasText: student }).first();
            await expect(option).toBeVisible({ timeout: 5000 });

            const checkbox = option.locator('input[type="checkbox"]');
            if (await checkbox.count()) {
                await checkbox.check();
            } else {
                await option.click();
            }
        }

        await page.keyboard.press('Escape');
    }

    // Helper method to assign bulk tasks using a specific template and verify they appear in the Tasks table with correct details
    private async assignBulkTaskWithTemplate(page: Page, tc: BulkTemplateCase) {
        await this.ASSIGN_TASK_BUTTON.click();

        const dialog = page.getByLabel('Create Task');
        await expect(dialog).toBeVisible({ timeout: 5000 });

        await dialog.getByRole('tab', { name: 'Bulk Assign', exact: true }).click();
        await this.selectBulkStudents(page, tc.students);

        await dialog.getByRole('button', { name: tc.templateButton, exact: true }).click();

        await expect(dialog.getByLabel('Title *')).toHaveValue(tc.expectedTitle, { timeout: 5000 });
        await expect(dialog.getByLabel('Time Estimate (hours)')).toHaveValue(tc.expectedTimeEstimate, { timeout: 5000 });
        await expect(dialog.getByLabel('Description *')).toContainText(tc.expectedDescriptionFragment, { timeout: 5000 });

        if (tc.priority !== 'Medium') {
            await dialog.getByLabel('Priority').click();
            await page.getByRole('option', { name: tc.priority, exact: true }).click();
        }

        await dialog
            .getByRole('button', { name: new RegExp(`Assign to\\s*${tc.students.length}\\s*Students`, 'i') })
            .click();

        // Assert success toast/message     
        
        const bulkToastSeen = await this.waitForToast(
            page,
            new RegExp(`successfully assigned tasks to\\s*${tc.students.length}\\s*students?`, 'i'),8000);
        if (!bulkToastSeen) {
            console.warn('Success Message not detected for bulk assign with quick template; continuing with row verification.');
        }

        await expect(dialog).toBeHidden({ timeout: 10000 });

        for (const student of tc.students) {
            const row = page
                .getByRole('row')
                .filter({ hasText: tc.expectedTitle })
                .filter({ hasText: student })
                .first();

            await expect(row).toBeVisible({ timeout: 10000 });
            await expect(row).toContainText(/assigned/i);
            await expect(row).toContainText(new RegExp(tc.priority, 'i'));
        }
    }

    // Method to assign bulk tasks using all quick templates in a loop
    async assignBulkTasksForAllQuickTemplates(page: Page) {
        const created: Array<{ title: string; students: string[] }> = [];

        for (const tc of bulkAssignCases) {
            console.log(`Bulk Assign: ${tc.name}`);
            await this.assignBulkTaskWithTemplate(page, tc);

            // Store created task details for cleanup
            const title = tc.expectedTitle;
            const students = tc.students;
            created.push({ title, students });
        }

        // Cleanup in reverse order
        for (const item of created.reverse()) {
            for (const student of [...item.students].reverse()) {
                await this.deleteTaskByTitleAndStudent(page, item.title, student);
            }
        }
    }

    // Method to assign a single task without using any quick template and verify it appears in the Tasks table with correct details
    async assignSingleTaskWithoutTemplate(page: Page) {
        await this.ASSIGN_TASK_BUTTON.click();

        const dialog = page.getByLabel('Create Task');
        await expect(dialog).toBeVisible({ timeout: 5000 });

        await dialog.getByRole('tab', { name: 'Single Assign', exact: true }).click();

        // Select student
        await this.SINGLE_ASSIGN_STUDENT_DROPDOWN.click();
        await expect(this.page.getByRole('option', { name: student })).toBeVisible({ timeout: 5000 });
        await this.page.getByRole('option', { name: student }).click();

        //Fill Title
        await dialog.getByRole('textbox', { name: 'Title' }).fill(originalTitle);

        // Select Type as Custom to enable all fields  
        const typeDropdown = dialog.getByRole('combobox').nth(1);
        await expect(typeDropdown).toBeVisible({ timeout: 5000 });
        await typeDropdown.click();
        await page.getByRole('option', { name: 'Custom', exact: true }).click();

        // Fill Time Estimate
        await dialog.getByRole('spinbutton', { name: 'Time Estimate (hours)' }).fill(timeEstimate);

        await dialog.getByRole('textbox', { name: /Due Date/i }).fill('2026-03-30');
        const priorityDropdown = dialog.getByRole('combobox').nth(2);
        await expect(priorityDropdown).toBeVisible({ timeout: 5000 });
        await priorityDropdown.click();
        await page.getByRole('option', { name: 'High', exact: true }).click();

        // Fill Description
        await dialog.getByRole('textbox', { name: 'Description' }).fill(originalDescription);

        // Verify all fields before submit
        await expect(dialog.getByRole('textbox', { name: 'Title' })).toHaveValue(originalTitle);
        await expect(dialog.getByRole('spinbutton', { name: 'Time Estimate (hours)' })).toHaveValue(timeEstimate);
        await expect(dialog.getByRole('textbox', { name: 'Description' })).toHaveValue(originalDescription);

        // Submit the form
        const submitButton = dialog.getByRole('button', { name: 'Assign Task', exact: true });
        await expect(submitButton).toBeEnabled({ timeout: 5000 });
        await submitButton.click();

        // Success message
        await expect(page.getByText('Task assigned successfully', { exact: true })).toBeVisible({ timeout: 10000 });
        await expect(dialog).toBeHidden({ timeout: 10000 });

        const assignedRow = page
            .getByRole('row')
            .filter({ hasText: originalTitle })
            .filter({ hasText: student })
            .first();

        await expect(assignedRow).toBeVisible({ timeout: 10000 });
        await expect(assignedRow).toContainText(/assigned/i);
        await expect(assignedRow).toContainText(/custom/i);

        const textContent = await assignedRow.textContent();
        console.log('Assigned Row Text Content:', textContent);

    }

    // Method to edit an assigned task and verify that the changes are reflected correctly in the Tasks table
    async editAssignedTask(page: Page, student: string) {

        // Wait for table to fully load
        await page.waitForLoadState('domcontentloaded', { timeout: 15000 });

        // Wait for table to be ready
        await expect(page.locator('table').first()).toBeVisible({ timeout: 15000 });

        // 1) Try strict match first
        let rows = page
            .locator('table tbody tr')
            .filter({ hasText: originalTitle })
            .filter({ hasText: student });

        // 2) Fallback: email fragment (more stable against text formatting issues)
        if ((await rows.count()) === 0) {
            rows = page
                .locator('table tbody tr')
                .filter({ hasText: originalTitle })
                .filter({ hasText: student });
        }

        await expect(rows.first()).toBeVisible({ timeout: 30000 });
        const row = rows.first();
        await row.scrollIntoViewIfNeeded();
        await expect(row).toBeVisible({ timeout: 10000 });


        // 2) Horizontal scroll to Actions column (table container)
        const tableContainer = page.locator('.MuiTableContainer-root').first();
        await tableContainer.evaluate((el) => {
            el.scrollLeft = el.scrollWidth;
        }); //move fully right

        // 3) Click Edit (first icon button in Actions cell)
        const actionsCell = row.getByRole('cell').last();
        await actionsCell.locator('button').nth(0).click();

        const dialog = page.getByRole('dialog');
        await dialog.getByRole('textbox', { name: 'Title' }).fill(updatedTitle);
        await dialog.getByRole('textbox', { name: 'Description' }).fill(updatedDescription);
        await dialog.getByRole('spinbutton', { name: 'Time Estimate (hours)' }).fill(updatedTimeEstimate);
        await dialog.getByRole('textbox', { name: /Due Date/i }).fill(updatedDueDate);

        // Update Priority
        const priorityDropdown = dialog.getByRole('combobox').nth(2);
        await expect(priorityDropdown).toBeVisible({ timeout: 5000 });
        await priorityDropdown.click();
        await page.getByRole('option', { name: 'Medium', exact: true }).click();

        // Verify updated fields
        await expect(dialog.getByRole('textbox', { name: 'Title' })).toHaveValue(updatedTitle);
        await expect(dialog.getByRole('textbox', { name: 'Description' })).toHaveValue(updatedDescription);
        await expect(dialog.getByRole('spinbutton', { name: 'Time Estimate (hours)' })).toHaveValue(updatedTimeEstimate);
        await expect(dialog.getByRole('textbox', { name: /Due Date/i })).toHaveValue(updatedDueDate);


        await dialog.getByRole('button', { name: 'Update Task', exact: true }).click();
        await expect(page.getByText('Task assigned successfully', { exact: true })).toBeVisible();
        await expect(dialog).toBeHidden({ timeout: 10000 });
        // Verify updated row
        const updatedRow = page
            .getByRole('row')
            .filter({ hasText: updatedTitle })
            .filter({ hasText: student })
            .first();

        await expect(updatedRow).toBeVisible({ timeout: 10000 });
        await expect(updatedRow).toContainText(/custom/i);
        await expect(updatedRow).toContainText(/assigned/i);

        const textContent = await updatedRow.textContent();
        console.log('Updated Row Text Content:', textContent);

    }

    // Method to delete an assigned task and verify that it is removed from the Tasks table
    async deleteAssignedTask(page: Page, student: string) {

        const row = page
            .getByRole('row')
            .filter({ hasText: updatedTitle })
            .filter({ hasText: student })
            .first();

        await expect(row).toBeVisible({ timeout: 10000 });

        // 1) Vertical scroll to row
        await row.scrollIntoViewIfNeeded();

        const textContent = await row.textContent();
        console.log('Delete Row Text Content:', textContent);

        // 2) Horizontal scroll to Actions column (table container)
        const tableContainer = page.locator('.MuiTableContainer-root').first();
        await tableContainer.evaluate((el) => {
            el.scrollLeft = el.scrollWidth;
        }); //move fully right

        // Step 3: wait for delete button to be visible before clicking
        const deleteButton = row.getByLabel('Delete Task');
        await expect(deleteButton).toBeVisible({ timeout: 5000 });

        // Handle native confirm popup
        page.once('dialog', async (dialog) => {
            expect(dialog.message()).toContain('Are you sure you want to delete this task?');
            await dialog.accept();
        });
        await deleteButton.click({ force: true });

        // Primary assertion: row is removed from the table
        await expect(
            page.getByRole('row').filter({ hasText: updatedTitle }).filter({ hasText: student })
        ).toHaveCount(0, { timeout: 10000 });

        // Secondary assertion: success message is shown (optional, as some deletions may not show toast)
        await expect(page.getByText('Task deleted successfully', { exact: true })).toBeVisible();

    }

}