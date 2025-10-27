import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage class containing common methods that can be extended by all page object models
 * Provides reusable functionality for web automation testing with Playwright
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isHeadingVisible(heading: string): Promise<boolean> {
    const selector = [
      `h1:has-text("${heading}")`,
      `h2:has-text("${heading}")`,
      `h3:has-text("${heading}")`,
      `h4:has-text("${heading}")`,
      `h5:has-text("${heading}")`,
      `h6:has-text("${heading}")`
    ].join(',');
    return this.page.isVisible(selector);
  }

  async areHeadingsVisible(headings: string[]): Promise<boolean> {
    for (const heading of headings) {
      const isVisible = await this.isHeadingVisible(heading);
      if (!isVisible) {
        return false;
      }
    }
    return true;
  }

  async areSpansVisible(spans: string[]): Promise<boolean> {
    const results = await Promise.all(
      spans.map(span =>
        this.page.locator(`span:has-text("${span}")`).isVisible()
      )
    );
    return results.every(result => result);
  }

  async clickButtonByText(buttonText: string): Promise<void> {
    await this.page.click(`button:has-text("${buttonText}")`);
  }
}
