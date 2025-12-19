import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class CareerPathPage extends BasePage {

    CareerPathHeading = '//h5[text() = "Career Path Advisor"]';
    CareerJourneySection = '//h5[text()="Your Career Journey"]';
    CareerMentorshipSection = '//h4[normalize-space()="Career Mentorship"]';
    CurrentPositionHeading = '//h6[normalize-space()="Current Position"]';
    CurrentRoleTextBox = 'Select from list or type your own';
    TargetRoleTextBox = 'Select from list or type your own';
    ContinueButton = 'Continue';
    CompleteAssessmentButton = '//button[normalize-space()="Complete Assessment"]';
    RestartButton = '//button[normalize-space()="Restart"]';
    CurrentRoleHeading = '//p[text()="Current Role"]/following-sibling::h6[1]';
    TargetRoleHeading = '//p[text()="Target Role"]/following-sibling::h6[1]';

    currentRole = 'Student';
    targetRole= 'QA Engineer';


    constructor(page: Page) {
        super(page);
    }

    async verifyPage(){
        await expect(this.page.locator(this.CareerPathHeading)).toBeVisible();
        await expect(this.page.locator(this.CareerJourneySection)).toBeVisible();
        await expect(this.page.locator(this.CareerMentorshipSection)).toBeVisible();

    }
    //Fill Assessment Fields with Req'd Current Role and Target Role
    async fillAssessment(currentRole:string, targetRole:string){
        await expect(this.page.getByPlaceholder(this.CurrentRoleTextBox)).toBeVisible();
        await this.page.getByPlaceholder(this.CurrentRoleTextBox).click({timeout:5000});
        console.log("Clicked Current Role textbox");
        await this.page.getByPlaceholder(this.CurrentRoleTextBox).fill(currentRole);
        console.log("Filled in current role : "+ currentRole);
        await this.page.getByText(this.ContinueButton).click({timeout:5000});
        console.log("Clicked Continue Button 1");
        await this.page.waitForTimeout(5000);
        await this.page.getByPlaceholder(this.TargetRoleTextBox).click({timeout:5000});
        console.log("Clicked target role box");
        await this.page.getByPlaceholder(this.TargetRoleTextBox).fill(targetRole);
        console.log("Filled in Target Role: " + targetRole);
        await this.page.getByText(this.ContinueButton).click()
        console.log("Clicked Continue Button 2");
          await this.page.locator(this.CompleteAssessmentButton).click({timeout:5000});
          console.log("Clicked Complete Assessment Button");


    }
}