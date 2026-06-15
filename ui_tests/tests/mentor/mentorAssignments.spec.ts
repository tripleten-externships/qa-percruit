import { expect, test } from '@playwright/test';

import * as env from '../../src/config/world';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { AssignmentPage } from '../../src/pages/admin/AssignmentPage';
import { AdminDashboardPage } from '../../src/pages/admin/AdminDashboardPage';

let assignmentPage: AssignmentPage;

// Test data
const studentText = 'Ashlynn Marie';
const studentName = 'Ashlynn Marie';

const mentorText = 'ashl3yy.mari3+mentor01@gmail.com';

test.describe('Mentor Assignments', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto(env.getBaseUrl());
        await loginPage.loginAsUserType('Admin');

        const dashboardPage = new AdminDashboardPage(page);
        await dashboardPage.waitForDashboard();

        await page.goto(`${env.getBaseUrl()}/admin/mentor-assignments`);

        assignmentPage = new AssignmentPage(page);

        await expect(page).toHaveURL(/mentor-assignments/);
    });

    test.afterEach(async ({ page, browserName }) => {
        // Only the create-assignment test changes shared test data,
        // and that test only runs in Chromium.
        if (browserName !== 'chromium') {
            return;
        }

        assignmentPage = new AssignmentPage(page);

        await page.goto(`${env.getBaseUrl()}/admin/mentor-assignments`);

        await assignmentPage.removeAssignmentIfExists(studentName);
    });

    test('Mentor-Student Assignments - the system should allow administrators to link students with mentors to ensure proper mentorship assignments.', async ({ page, browserName }) => {
        test.skip(browserName !== 'chromium', 'Create assignment test uses shared student data, so run only in Chromium.');

        await assignmentPage.assignStudentToMentor(studentText, mentorText);

        await assignmentPage.verifyAssignmentCreated();

        await assignmentPage.verifyDisplay(studentName);

        await expect(page).toHaveURL(/mentor-assignments/);
    });

    test('Assignment Table Loads with the correct row of Mentor/Student/Status/Date', async ({ page }) => {
        await expect(page).toHaveURL(/mentor-assignments/);

        await page.waitForSelector('table');

        await assignmentPage.verifyTableDisplay();

        await assignmentPage.verifyColumnHeaders();
    });
});