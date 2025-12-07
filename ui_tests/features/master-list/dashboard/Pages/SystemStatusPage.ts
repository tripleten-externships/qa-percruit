import { Page } from '@playwright/test';

export class SystemStatusPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForSystemHealthMonitor() {
    await this.page
      .getByRole('heading', { name: 'System Health Monitor' })
      .waitFor();
  }



  async waitForSummaryMetrics() {
    await this.page.getByText('System Uptime').waitFor();
    await this.page.getByText('Avg Response Time').waitFor();
    await this.page.getByText('Critical Issues').waitFor();
  }

  async waitForAllSystemsOperational() {
    await this.page.getByText('All Systems Operational').waitFor();
  }

  async waitForUptimeLabel() {
    await this.page.getByText('System Uptime').waitFor();
  }


  async waitForAvgResponseTimeWithMs() {
    await this.page.getByText('250msAvg Response Time').waitFor();
    await this.page.getByText('ms').first().waitFor();
  }

  async waitForAvgResponseTimeLabel() {
    await this.page.getByText('Avg Response Time').waitFor();
  }
}
