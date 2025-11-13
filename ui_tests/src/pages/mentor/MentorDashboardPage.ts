import { Page, Locator } from '@playwright/test';

export class MentorDashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Clicks the Mentors navigation item and waits for the mentors heading to appear
  async openMentorsList(): Promise<void> {
    // try button first, then link
    const button = this.page.getByRole('button', { name: 'Mentors' }).first();
    const link = this.page.getByRole('link', { name: 'Mentors' }).first();

    if ((await button.count()) > 0) {
      await Promise.all([
        this.page.waitForLoadState('networkidle').catch(() => {}),
        button.click(),
      ]);
    } else if ((await link.count()) > 0) {
      await Promise.all([
        this.page.waitForLoadState('networkidle').catch(() => {}),
        link.click(),
      ]);
    } else {
      // fallback: try a text click
      await this.page.click('text=Mentors').catch(() => {});
      await this.page.waitForLoadState('networkidle').catch(() => {});
    }

    // wait for the mentors heading to appear
    await this.page.getByRole('heading', { name: /Mentors/i }).waitFor({ state: 'visible', timeout: 10000 });
  }

  heading(): Locator {
    return this.page.getByRole('heading', { name: /Mentors/i });
  }

  async isMentorListVisible(): Promise<boolean> {
    return this.page.getByRole('heading', { name: /Mentors/i }).isVisible();
  }

  // return the first mentor's name (assumes table/list structure)
  async getFirstMentorName(): Promise<string> {
    const row = this.page.locator('table tbody tr, [data-testid="mentor-row"]').first();
    // try common name cell selectors
    const nameCell = row.locator('td >> nth=0, .mentor-name, [data-testid="mentor-name"]');
    return nameCell.innerText().catch(() => '');
  }

  async getMentorCountHeading(): Promise<string> {
    return this.page.getByRole('heading', { name: /Mentors\s*\(\d+\)/ }).innerText().catch(() => '');
  }

  // helper to access all mentor rows
  mentorRows() {
    return this.page.locator('table tbody tr, [data-testid="mentor-row"]');
  }
}