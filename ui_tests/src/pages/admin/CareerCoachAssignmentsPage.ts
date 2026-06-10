import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import * as env from '../../config/world';

export class CareerCoachAssignmentsPage extends BasePage {

//LOCATORS
CAREER_COACH_ASSIGNMENTS_TAB: Locator;
STUDENT_SELECTOR: Locator;
SEARCH_STUDENT_FIELD: Locator;
CLOSE_STUDENT_SEARCH_FIELD: Locator;
CAREER_COACH_LIST: Locator;
SELECT_CAREER_COACH: Locator;
SELECT_NOTES_FIELD: Locator;
INPUT_NOTES: Locator;
CREATE_ASSIGNMENT: Locator;

constructor(page: Page) {
    super(page);

  // Initialize locators
   this.CAREER_COACH_ASSIGNMENTS_TAB = this.page.getByRole('link', { name: 'Career Coach Assignments' });
   this.STUDENT_SELECTOR = this.page.getByRole('combobox', { name: 'Select Students' });
   this.SEARCH_STUDENT_FIELD = this.page.getByRole('combobox', { name: 'Select Students' });
   this.CLOSE_STUDENT_SEARCH_FIELD = this.page.getByRole('button', { name: 'Close' });
   this.CAREER_COACH_LIST = this.page.getByRole('combobox', { name: 'Career Coach' });
   this.SELECT_CAREER_COACH = this.page.getByRole('option', { name: 'John Doe (young.hui.y+mentor1' });
   this.SELECT_NOTES_FIELD = this.page.getByRole('textbox', { name: 'Notes (Optional)' });
   this.INPUT_NOTES = this.page.getByRole('textbox', { name: 'Notes (Optional)' });
   this.CREATE_ASSIGNMENT = this.page.getByRole('button', { name: 'Create Assignment' });

    }

//Navigates to the career coach assignments page
    async goToCareerCoachAssignmentsPage() {
        await this.CAREER_COACH_ASSIGNMENTS_TAB.click();
    }
//Opens student selection field
    async AccessStudentSelector() {
        await this.STUDENT_SELECTOR.click();
    }
//Search student
    async SearchStudentField(searchText: string) {
        await this.SEARCH_STUDENT_FIELD.fill('');
        await this.SEARCH_STUDENT_FIELD.fill(searchText);
    } 
// Close student list
    async CloseStudentSearchField() {
        await this.CLOSE_STUDENT_SEARCH_FIELD.click();
    }    
// Open career coach list
    async OpenCareerCoachList() {
        await this.CAREER_COACH_LIST.click();
    } 
// Select career coach
    async SelectCareerCoach() {
        await this.SELECT_CAREER_COACH.click();
    } 
// Select notes field
    async SelectNotesField() {
        await this.SELECT_NOTES_FIELD.click();
    } 
// Input notes
    async InputNotes(searchText: string) {
        await this.INPUT_NOTES.fill('');
        await this.INPUT_NOTES.fill(searchText);
    } 
  // Click Create Assignment
    async CreateAssignment() {
        await this.CREATE_ASSIGNMENT.click();
    }



}