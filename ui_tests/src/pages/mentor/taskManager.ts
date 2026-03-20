import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

// POM class for the Task Manager page
export class TaskManagerPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  // Click button or link by name
  async clickButtonOrLink(name: string, timeout = 30000): Promise<void> {
    const element = this.page
      .getByRole('button', { name })
      .or(this.page.getByRole('link', { name }));

    await expect(element).toBeVisible({ timeout });
    await element.click();
  }
//Verify Heading
async verifyHeading(headingName: string, timeout = 30000): Promise<void> {
  await expect(
    this.page.getByRole('heading', { name: new RegExp(headingName, 'i') })
  ).toBeVisible({ timeout });
  const headings = await this.page.getByRole('heading').allTextContents();
console.log('Headings on page:', headings);

}

  // Handle cookie popup if visible
  async handleCookiePopup(): Promise<void> {
    const cookiePopup = this.page.getByText('This website uses cookies');
    const cookieAccept = this.page.getByRole('button', { name: 'Accept all cookies' });

    if (await cookiePopup.isVisible()) {
      await cookieAccept.click();
      console.log('✅ Cookie popup closed successfully.');
    }
  }

 //Add feedback to task
  async clickAddFeedback(taskName: string) {
  await this.page
    .locator('tr')
    .filter({ hasText: taskName })
    .getByLabel('Add Feedback to Task')
    .click();
}

}