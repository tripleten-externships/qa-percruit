import { Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class StudyPage extends BasePage {
  
    StudyHeading = '//h5[text() = "Study"]';
    SearchEditBox = '//input[@placeholder="Search questions by title or content..."]';
    AllButton = '//button[text() = "All"]';
    EasyButton = '//button[text() = "Easy"]';
    MediumButton = '//p[text() = "Medium"]';
    HardButtoon = '//p[text() = "Hard"]';
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


}