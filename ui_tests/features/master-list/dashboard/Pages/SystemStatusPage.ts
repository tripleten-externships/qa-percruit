// SystemStatusPage.ts
// Page Object for the System Health Monitor section

import { Page, Locator, expect } from '@playwright/test';

export class SystemStatusPage {
  private page: Page;

  private statusCard: Locator;
  private statusMessage: Locator;

  private uptimeLabel: Locator;
  private uptimeValue: Locator;

  private responseTimeLabel: Locator;
  private responseTimeValue: Locator;

  constructor(page: Page) {
    this.page = page;

    // MAIN SYSTEM HEALTH CARD
    this.statusCard = page.getByText('System Health Monitor', { exact: false });

    // “All Systems Operational”
    this.statusMessage = page.getByText('All Systems Operational', {
      exact: false,
    });

    // SYSTEM UPTIME
    this.uptimeLabel = page.getByText('System Uptime', { exact: false });
    this.uptimeValue = this.page.getByRole('heading', { name: /%$/ }).first();


    // AVG RESPONSE TIME
    this.responseTimeLabel = page.getByText('Avg Response Time', {
      exact: false,
    });
    this.responseTimeValue = page.getByRole('heading', { name: /ms$/ }); // ex: "250ms"
  }

  // == WAIT FOR HEALTH CARD ==
  async waitForSystemHealthCard(): Promise<void> {
    await this.statusCard.waitFor();
  }

  // == VERIFY SYSTEM OPERATIONAL ==
  async verifyAllSystemsOperational(): Promise<void> {
    await expect(this.statusMessage).toBeVisible();
  }

  // == VERIFY UPTIME ==
  async verifyUptimeVisible(): Promise<void> {
    await expect(this.uptimeLabel).toBeVisible();
    await expect(this.uptimeValue).toBeVisible();
  }

  // == VERIFY RESPONSE TIME ==
  async verifyResponseTimeVisible(): Promise<void> {
    await expect(this.responseTimeLabel).toBeVisible();
    await expect(this.responseTimeValue).toBeVisible();
  }
}
