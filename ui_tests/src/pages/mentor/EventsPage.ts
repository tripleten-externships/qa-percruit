import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import * as env from '../../config/world';

export class EventsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly eventsHeading = this.page.getByRole('heading', {
    name: /events management/i,
  });

  async clickOnEvent(): Promise<void> {
    await this.page.goto(`${env.getBaseUrl()}/mentor/events`);
    await expect(this.eventsHeading).toBeVisible({ timeout: 30000 });
  }

  async clickCreateEvent(): Promise<void> {
    const createEventButton = this.page.locator('button:has-text("Create Event")');

    await expect(createEventButton).toBeVisible({ timeout: 30000 });
    await createEventButton.click();
  }

  async isOnEventsManagementPage(): Promise<boolean> {
    await expect(this.eventsHeading).toBeVisible({ timeout: 30000 });
    return await this.eventsHeading.isVisible();
  }

  async isEventCreationFormVisible(): Promise<boolean> {
    const titleInput = this.page.getByLabel(/event title|title/i);

    await expect(titleInput).toBeVisible({ timeout: 30000 });

    return await titleInput.isVisible();
  }

  async fillEventCreationForm(eventDetails: {
    title: string;
    description: string;
    joinLink: string;
    startTime: string;
    endTime: string;
    maxAttendees: number;
  }): Promise<void> {
    console.log('Filling event creation form with details:');

    await expect(this.page.getByLabel(/event title|title/i)).toBeVisible({ timeout: 30000 });

    await this.page.getByLabel(/event title|title/i).fill(eventDetails.title);
    await this.page.getByLabel(/description/i).fill(eventDetails.description);
    await this.page.getByLabel(/join link/i).fill(eventDetails.joinLink);
    await this.page.getByLabel(/start time/i).fill(eventDetails.startTime);

    // Uncomment these if the app requires them and the labels match:
    await this.page.getByLabel(/end time/i).fill(eventDetails.endTime);
    await this.page.getByLabel(/max attendees/i).fill(String(eventDetails.maxAttendees));
  }

  async submitEventCreationForm(): Promise<void> {
  const submitButton = this.page.locator('button:has-text("Create")').last();

  await submitButton.scrollIntoViewIfNeeded();
  await expect(submitButton).toBeVisible({ timeout: 30000 });
  await expect(submitButton).toBeEnabled({ timeout: 30000 });
  await submitButton.click();
}

  async isEventCreationSuccessful(): Promise<boolean> {
    const successMessage = this.page.getByText(/event created successfully|created successfully/i);

    await expect(successMessage).toBeVisible({ timeout: 30000 });

    return await successMessage.isVisible();
  }

  async isEventVisible(eventTitle: string): Promise<boolean> {
    const eventLocator = this.page.getByText(eventTitle, { exact: true }).first();

    await expect(eventLocator).toBeVisible({ timeout: 30000 });

    return await eventLocator.isVisible();
  }

  async clickButtonOrLink(name: string, timeout = 30000): Promise<void> {
    const element = this.page
      .getByRole('button', { name })
      .or(this.page.getByRole('link', { name }));

    await expect(element).toBeVisible({ timeout });
    await element.click();
  }

  async verifyHeading(headingName: string, timeout = 30000): Promise<void> {
    await expect(
      this.page.getByRole('heading', { name: new RegExp(headingName, 'i') })
    ).toBeVisible({ timeout });

    const headings = await this.page.getByRole('heading').allTextContents();
    console.log('Headings on page:', headings);
  }

  async handleCookiePopup(): Promise<void> {
    const cookiePopup = this.page.getByText('This website uses cookies');
    const cookieAccept = this.page.getByRole('button', { name: 'Accept all cookies' });

    if (await cookiePopup.isVisible().catch(() => false)) {
      await cookieAccept.click();
      console.log('✅ Cookie popup closed successfully.');
    }
  }
}