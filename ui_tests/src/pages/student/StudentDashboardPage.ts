import { Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';

// <span class="ant-menu-title-content">Interview Study</span>
// <span class="ant-menu-title-content">Job Board</span>

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

    // Check if required Sidebar items are visible to confirm we're on the dashboard
    return await this.areSpansVisible([
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
}
