import { Page, expect } from '@playwright/test';
import * as env from '../../config/world';
import { BasePage } from '../common/BasePage';

// Page Object Model (POM) class for the Events page
export class EventsPage extends BasePage {
  // Constructor to initialize the page object
  constructor(page: Page) {
    super(page);
  }

  // Define element locators for Events page
  readonly eventsHeading = this.page.getByRole('heading', {
    name: 'Events Management',
  });

  // Methods to carry out actions on the Events page
  async isOnEventsManagementPage(): Promise<boolean> {
    // Wait for the heading to be visible to ensure the page has loaded
    await expect(this.eventsHeading).toBeVisible();
    // Return the visibility state (true) after waiting
    return await this.eventsHeading.isVisible();
  }

  async isEventCreationFormVisible(): Promise<boolean> {
    const formLocator = this.page.getByRole('heading', {
      name: 'Create New Event',
    });
    await expect(formLocator).toBeVisible();
    return await formLocator.isVisible();
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
    await expect(this.page.getByLabel('Event Title')).toBeVisible();
    await this.page.getByLabel('Event Title').fill(eventDetails.title);
    await this.page.getByLabel('Description').fill(eventDetails.description);
    await this.page.getByLabel('Join Link').fill(eventDetails.joinLink);
    await this.page.getByLabel('Start Time').fill(eventDetails.startTime);
  }

  async submitEventCreationForm(): Promise<void> {
    this.clickButtonByText('Accept all cookies').catch(() => {});
    this.clickByButtonRoleByText('Create');
  }

  async isEventCreationSuccessful(): Promise<boolean> {
    const successMessage = this.page.getByText('Event created successfully');
    await expect(successMessage).toBeVisible();
    return await successMessage.isVisible();
  }

  async isEventVisible(eventTitle: string): Promise<boolean> {
    const eventLocator = this.page.getByText(eventTitle, { exact: true });
    await expect(eventLocator).toBeVisible();
    return await eventLocator.isVisible();
  }
}
