import { test, expect } from '@playwright/test';
import { LoginPage } from "../../src/pages/common/LoginPage";
import { CareerCoachAssignmentsPage } from '../../src/pages/admin/CareerCoachAssignmentsPage';
import * as env from '../../src/config/world';

let loginPage: LoginPage;

test.describe('Career Coach Assignments', () => {
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);

        // Navigate to application
        await page.goto('/');
        await loginPage.loginAsUserType('Admin');

        // Verify Career 'Coach-Student Assignments' banner is visible
        expect(page.getByRole('heading', { name: 'Career Coach-Student Assignments' })).toBeVisible;

    });


    // Sceanario: The Admin can sucsessfully create a new Mentor-Student assignment.

    test('Create New Assignment', async () => {
      await CareerCoachAssignmentsPage.SearchStudentField(
        env.getStudentName()
      );

  

        // Verify confirmation message
      //  await expect(page.getByText('Career Coach Assignment created successfully. Both student and coach have been')).toBeVisible();




        /* // Verify assignment appears in list
          // Student
          await page.getByText('Student Robot').click();
          // Mentor
          await page.getByText('John Doe').first().click();  */

    });



});