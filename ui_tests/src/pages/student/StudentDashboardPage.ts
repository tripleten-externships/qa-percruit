import { Page } from '@playwright/test';
import * as env from '../../config/world';

export class StudentDashboardPage {
  readonly page: Page;
  readonly CAREER_DIARY_WIDGET_LOCATOR = 'h6:has-text("Career Diary")';


  constructor(page: Page) {
    this.page = page;
  }

  async isCareerDiaryWidgetVisible(): Promise<boolean> {
    return this.page.isVisible(this.CAREER_DIARY_WIDGET_LOCATOR);
  }
}