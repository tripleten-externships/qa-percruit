import { Page, Locator } from '@playwright/test';
import * as env from '../../config/world';

export class AdminDashboardPage {
  readonly page: Page;
  readonly ADMIN_DASHBOARD_TEXT_LOCATOR: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ADMIN_DASHBOARD_TEXT_LOCATOR = this.page.getByRole('heading', { name: 'Admin Dashboard' });
  }

  async isAdminDashboardVisible(){
    await this.ADMIN_DASHBOARD_TEXT_LOCATOR.isVisible();
  }

}