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
    SoftwareEngineerRoleTab = '//ph6[text() = "Software Engineer Questions"]';
    DataScientistTab = '//p[text() = "Data Scientist"]';
    DataScientistRoleTab = '//ph6[text() = "Data Scientist Questions"]';
    MLEngineerTab = '//p[text() = "ML Engineer"]';
    MLEngineerRoleTab = '//ph6[text() = "ML Engineer Questions"]';
    ProductManagerTab = '//p[text() = "Product Manager"]';
    ProductManagerRoleTab = '//ph6[text() = "Product Manager Questions"]';
    QAAnalystTab = '//p[text() = "QA Analyst"]';
    QAAnalystRoleTab = '//ph6[text() = "QA Analyst Questions"]';
    CybersecurityTab = '//p[text() = "Cyber Security"]';
    CybersecurityRoleTab = '//ph6[text() = "CyberSecurity Questions"]';
    LLMsTab = '//p[text() = "LLMs"]';
    LLMsRoleTab = '//ph6[text() = "LLMs Questions"]';
    SQLTab = '//p[text() = "SQL"]';
    SQLRoleTab = '//ph6[text() = "SQL Questions"]';
    BehavioralTab = '//p[text() = "Behavioral"]';
    BehavioralRoleTab = '//ph6[text() = "Behavioral Questions"]';



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

  async clickSoftwareEngineer(buttonText: string): Promise<void> {
      this.SoftwareEngineerTab
      this.SoftwareEngineerRoleTab
  }

  async clickDataScientist(buttonText: string): Promise<void> {
      this.DataScientistTab
      this.DataScientistRoleTab
  }

  async clickMLEngineer(buttonText: string): Promise<void> {
      this.MLEngineerTab
      this.MLEngineerRoleTab
  }

  async clickProductManager(buttonText: string): Promise<void> {
      this.ProductManagerTab
      this.ProductManagerRoleTab
  }

  async clickQAAnalyst(buttonText: string): Promise<void> {
      this.QAAnalystTab
      this.QAAnalystRoleTab
  }

  async clickCybersecurity(buttonText: string): Promise<void> {
      this.CybersecurityTab
      this.CybersecurityRoleTab
  }

  async clickLLMs(buttonText: string): Promise<void> {
      this.LLMsTab
      this.LLMsRoleTab
  }

  async clickSQL(buttonText: string): Promise<void> {
      this.SQLTab
      this.SQLRoleTab
  }

  async clickBehavioral(buttonText: string): Promise<void> {
      this.BehavioralTab
      this.BehavioralRoleTab
  }
}