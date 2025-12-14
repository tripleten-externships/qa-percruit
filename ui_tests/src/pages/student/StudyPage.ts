import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class StudyPage extends BasePage {
  
    StudyHeading = '//h5[text() = "Study"]';
    SearchQuestionEditBox = '//input[@placeholder="Search questions by title or content..."]';
    private SearchQuestionEditBoxWasClicked = false
    BrowseByJobRoleField = '//h6[text() = "Browse by Job Role"]'
    AllButton = '//button[text() = "All"]';
    EasyButton = '//button[text() = "Easy"]';
    MediumButton = '//p[text() = "Medium"]';
    HardButton = '//p[text() = "Hard"]';
    SoftwareEngineerTab = '//p[text() = "Software Engineer"]';
    DataScientistTab = '//p[text() = "Data Scientist"]';
    MLEngineerTab = '//p[text() = "ML Engineer"]';
    ProductManagerTab = '//p[text() = "Product Manager"]';
    QAAnalystTab = '//p[text() = "QA Analyst"]';
    CyberSecurityTab = '//p[text() = "Cyber Security"]';
    LLMsTab = '//p[text() = "LLMs"]';
    SQLTab = '//p[text() = "SQL"]';
    BehavioralTab = '//p[text() = "Behavioral"]';


  constructor(page: Page) {
    super(page);
  }

  async verifyPage(){
      await expect(this.page.locator(this.StudyHeading)).toBeVisible();
      await expect(this.page.locator(this.SearchQuestionEditBox)).toBeVisible();
      await expect(this.page.locator(this.BrowseByJobRoleField)).toBeVisible();

    }

  async clickButtonByText(buttonText: string): Promise<void> {
      this.SearchQuestionEditBoxWasClicked
  }

  async clickAllButton(buttonText: string): Promise<void> {
      await expect(this.page.locator(this.AllButton)).toHaveAttribute('aria-pressed', 'true')
  }

  async clickEasyButton(buttonText: string): Promise<void> {
      await expect(this.page.locator(this.EasyButton)).toHaveAttribute('aria-pressed', 'true')
  }

  async clickMediumButton(buttonText: string): Promise<void> {
      await expect(this.page.locator(this.MediumButton)).toHaveAttribute('aria-pressed', 'true')
  }

  async clickHardButton(buttonText: string): Promise<void> {
      await expect(this.page.locator(this.HardButton)).toHaveAttribute('aria-pressed', 'true')
  }
}