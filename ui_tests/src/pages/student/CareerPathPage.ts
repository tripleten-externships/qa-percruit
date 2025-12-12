import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class CareerPathPage extends BasePage {

    CareerPathHeading = '//h5[text() = "Career Path Advisor"]';
    CareerJourneySection = '//h5[text()="Your Career Journey"]';
    CareerMentorshipSection = '//h4[normalize-space()="Career Mentorship"]';
    CurrentPositionHeading = '//h6[normalize-space()="Current Position"]';
    CurrentRoleTextBox = 'Select from list or type your own';
    //  CurrentRoleTextBox = '#_r_50';
    TargetRoleTextBox = 'Select from list or type your own';
    ContinueButton = '//button[normalize-space()="Continue"]';
    CompleteAssessmentButton = '//button[normalize-space()="Complete Assessment"]';
    RestartButton = '//button[normalize-space()="Restart"]';
    CurrentRoleHeading = '//p[text()="Current Role"]/following-sibling::h6[1]';
    TargetRoleHeading = '//p[text()="Target Role"]/following-sibling::h6[1]';


  constructor(page: Page) {
    super(page);
  }

  async verifyPage(){
    await expect(this.page.locator(this.CareerPathHeading)).toBeVisible();
    await expect(this.page.locator(this.CareerJourneySection)).toBeVisible();
    await expect(this.page.locator(this.CareerMentorshipSection)).toBeVisible();
    
  }

}