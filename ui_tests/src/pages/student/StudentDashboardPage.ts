import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class StudentDashboardPage extends BasePage {
  readonly sideBar = {
    JOB_BOARD: 'Job Board',
    JOB_TRACKER: 'Job Tracker',
    RESUME_MANAGER: 'Resume Manager',
    STUDY: 'Study',
    INTERVIEWS: 'Interviews',
    CODING_PRACTICE: 'Coding Practice',
    MESSAGES: 'Messages',
    TASKS_GOALS: 'Tasks & Goals',
    FORUMS: 'Forums',
    CAREER_PATH: 'Career Path',
    CAREER_INSIGHTS: 'Career Insights',
    INDUSTRY_NEWS: 'Industry News',
  };

  constructor(page: Page) {
    super(page);
  }

  async isOnDashboardPage(): Promise<boolean> {
    // Wait for the Career Diary heading to appear (gives page time to fully load)
    try {
      await this.page.waitForSelector('text=Career Diary', { timeout: 10000 });
    } catch {
      return false;
    }

    // Check if required headings are visible to confirm we're on the dashboard
    const hasHeading = await this.isHeadingVisible('Career Diary');
    if (!hasHeading) {
      return false;
    }

    return await this.areMenuItemsVisible([
      this.sideBar.JOB_BOARD,
      this.sideBar.JOB_TRACKER,
      this.sideBar.RESUME_MANAGER,
      this.sideBar.STUDY,
      this.sideBar.INTERVIEWS,
      this.sideBar.CODING_PRACTICE,
      this.sideBar.MESSAGES,
      this.sideBar.TASKS_GOALS,
    ]);
  
  }

  async verifyPage(){
        await expect((this.isHeadingVisible));
      }
}
