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
    async assignStudentToMentor(studentEmail: string, mentorName: string) {
        await this.page.getByRole('combobox', { name: 'Student' }).click();
        await this.page.getByRole('option', { name: 'Eric Hibbard Student (eric.hibbard91+student@gmail.com)' }).click();
        await this.page.getByRole('combobox', { name: 'Mentor' }).click();
        await this.page.getByRole('button', { name: 'Create Assignment' }).click();
    }

    async verifyAssignmentCreated() {
        await expect(this.page.getByText('Mentor Assignment created')).toBeVisible();
    }
} 
/*
  await page.getByRole('switch', { name: 'Find student by email instead' }).check();
  await page.getByRole('combobox', { name: 'Student Email' }).click();
  await page.getByRole('combobox', { name: 'Student Email' }).fill('eric.h');
  await page.getByText('eric.hibbard91+student@gmail.').click();
  await page.getByRole('combobox', { name: 'Mentor' }).click();
  await page.getByRole('option', { name: 'Eric Hibbard (eric.hibbard91+' }).click();
  await page.getByRole('button', { name: 'Create Assignment' }).click();
  await page.getByText('Mentor Assignment created').click();
  await page.getByText('Current Assignments (63)StudentMentorEmailAssigned DateStatusActionsEric').click();
  await page.getByText('Current Assignments (63)StudentMentorEmailAssigned DateStatusActionsEric').click();
  await page.getByRole('cell', { name: 'Eric Hibbard Student eric.' }).click();
  await page.getByRole('combobox', { name: 'Student' }).click();
  await page.getByRole('option', { name: 'Eric Hibbard (eric.hibbard91+' }).click();
  await page.getByRole('combobox', { name: 'Mentor' }).click();
  await page.getByRole('option', { name: 'Eric Hibbard (eric.hibbard91+' }).click();
  await page.getByRole('button', { name: 'Create Assignment' }).click();
  await page.getByText('Mentor Assignment created').click();
  await page.getByText('Current Assignments (64)StudentMentorEmailAssigned DateStatusActionsEric').click();
  await page.getByRole('cell', { name: 'Eric Hibbard eric.hibbard91+' }).click();
  await page.getByRole('cell', { name: 'Eric Hibbard eric.hibbard91+' }).click();


await page.getByRole('combobox', { name: 'Student' }).click();
await page.getByRole('option', { name: 'Eric Hibbard Student (eric.hibbard91+student' }).click();
await page.getByRole('combobox', { name: 'Mentor' }).click();
await page.getByRole('option', { name: 'Eric Hibbard (eric.hibbard91+' }).click();

*/