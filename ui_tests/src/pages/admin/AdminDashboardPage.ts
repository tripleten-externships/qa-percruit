import { Page } from '@playwright/test';
import * as env from '../../config/world';

export class AdminDashboardPage {
  waitForPageLoad() {
    throw new Error('Method not implemented.');
  }
  isOnDashboardPage() {
    throw new Error('Method not implemented.');
  }
  readonly page: Page;


  constructor(page: Page) {
    this.page = page;
  }

}