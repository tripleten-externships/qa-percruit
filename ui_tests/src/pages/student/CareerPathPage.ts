import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class CareerPathPage extends BasePage {

    CareerPathHeading = '//h5[text() = "Career Path Advisor"]';
    CareerJourneySection = '//h5[text()="Your Career Journey"]';
    CareerMentorshipSection = '//h4[normalize-space()="Career Mentorship"]';
    CurrentRoleTextBox = '"Select from list or type your own", { exact: true })';
    TargetRoleTextBox = '//input[@id="_r_4p_"]';
    ContinueButton = '//button[normalize-space()="Continue"]';
    CompleteAssessmentButton = '//button[normalize-space()="Complete Assessment"]';
    RestartButton = '//button[normalize-space()="Restart"]';
    CurrentRoleHeading = '//div[@class="MuiBox-root css-1ay9vb9"]//h6[@class="MuiTypography-root MuiTypography-h6 css-13eugz2"][normalize-space()="Not specified"]';
    TargetRoleHeading = '//div[@class="MuiBox-root css-70qvj9"]//div[@class="MuiBox-root css-0"]//h6[@class="MuiTypography-root MuiTypography-h6 css-13eugz2"][normalize-space()="Not specified"]';

  constructor(page: Page) {
    super(page);
  }

  async verifyPage(){
    await expect(this.page.locator(this.CareerPathHeading)).toBeVisible();
    await expect(this.page.locator(this.CareerJourneySection)).toBeVisible();
    await expect(this.page.locator(this.CareerMentorshipSection)).toBeVisible();
    
  }

}