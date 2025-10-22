import { Page } from '@playwright/test';
import * as env from '../../config/world';

export class MentorDashboardPage {
  readonly page: Page;


  constructor(page: Page) {
    this.page = page;
  }

}