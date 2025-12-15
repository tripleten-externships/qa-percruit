import { Locator, Page } from '@playwright/test';
import * as env from '../../config/world';

export class AdminDashboardPage {
  isOnDashboardPage() {
      throw new Error('Method not implemented.');
  }
  waitForPageLoad() {
      throw new Error('Method not implemented.');
  }
  readonly page: Page;
  

  constructor(page: Page) {
    this.page = page;
   
  }


    }
  