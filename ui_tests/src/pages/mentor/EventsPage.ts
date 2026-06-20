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
    const createEventButton = this.page.locator(
      'button:has-text("Create Event")'
    );

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

  async fillEventCreationForm({ eventDetails }: {
  eventDetails: {
    title: string;
    description: string;
    joinLink: string;
    startTime: string;
    endTime: string;
    maxAttendees: number;
  };
}): Promise<void> {
    console.log('Filling event creation form with details:');

    await expect(this.page.getByLabel(/event title|title/i)).toBeVisible({
      timeout: 30000,
    });

    await this.page.getByLabel(/event title|title/i).fill(eventDetails.title);
    await this.page.getByLabel(/description/i).fill(eventDetails.description);
    await this.page.getByLabel(/join link/i).fill(eventDetails.joinLink);
    await this.page.getByLabel(/start time/i).fill(eventDetails.startTime);
    await this.page.getByLabel(/end time/i).fill(eventDetails.endTime);

    await this.page
      .getByLabel(/max attendees/i)
      .fill(String(eventDetails.maxAttendees));
  }

  async submitEventCreationForm(): Promise<void> {
    const submitButton = this.page.locator('button:has-text("Create")').last();

    await submitButton.scrollIntoViewIfNeeded();
    await expect(submitButton).toBeVisible({ timeout: 30000 });
    await expect(submitButton).toBeEnabled({ timeout: 30000 });

    await submitButton.click();

    // Give the app a moment to close the create form/modal after submit.
    // This helps WebKit, which can be slower with UI updates.
    await this.page.waitForTimeout(1000);
  }

  async isEventCreationSuccessful(): Promise<boolean> {
    const successMessage = this.page.getByText(
      /event created successfully|created successfully/i
    );

    await expect(successMessage).toBeVisible({ timeout: 30000 });

    return await successMessage.isVisible();
  }

  async isEventVisible(eventTitle: string): Promise<boolean> {
    // PURPOSE:
    // Confirms an event title is visible on the Events page.
    //
    // WHY THIS VERSION:
    // WebKit can be slower after creating an event.
    // Sometimes the event is created, but the page does not show it right away.
    // So we check once, refresh the Events page if needed, then check again.

    const eventLocator = this.page
      .getByText(eventTitle, { exact: true })
      .first();

    const isVisibleFirstTry = await eventLocator
      .isVisible({ timeout: 10000 })
      .catch(() => false);

    if (isVisibleFirstTry) {
      return true;
    }

    await this.clickOnEvent();

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
    const cookieAccept = this.page.getByRole('button', {
      name: 'Accept all cookies',
    });

    if (await cookiePopup.isVisible().catch(() => false)) {
      await cookieAccept.click();
      console.log('✅ Cookie popup closed successfully.');
    }
  }

  // EVENT ACTION METHODS

  // These methods are used by mentorEventActions.spec.ts.
  // They do not replace your original create event methods above.
  // Your passing mentorEvents.ts test can still use the same methods.

  async getEventContainer(eventTitle: string) {
    // PURPOSE:
    // Finds the specific event card/row by its title.
    //
    // WHY:
    // The closest parent with any button may be too small.
    // We want the closest parent that contains the event title
    // AND event action buttons like Copy link.

    const eventTitleText = this.page
      .getByText(eventTitle, { exact: true })
      .first();

    await expect(eventTitleText).toBeVisible({ timeout: 30000 });

    const eventContainerWithCopyLink = eventTitleText.locator(
      'xpath=ancestor::*[.//button[@aria-label="Copy link"]][1]'
    );

    if (await eventContainerWithCopyLink.isVisible().catch(() => false)) {
      return eventContainerWithCopyLink;
    }

    // Fallback:
    // If Copy link is not available, find the closest ancestor with buttons.
    // This helps for cancel/delete after the event status changes.
    return eventTitleText.locator('xpath=ancestor::*[.//button][1]');
  }

  async closeOpenMenuIfPresent(): Promise<void> {
    // PURPOSE:
    // Closes any leftover Material UI menu/popover/backdrop.
    //
    // WHY:
    // After actions like Cancel, a MUI backdrop can stay open and block clicks.

    await this.page.keyboard.press('Escape');

    await this.page
      .locator('.MuiBackdrop-root')
      .waitFor({ state: 'detached', timeout: 5000 })
      .catch(() => {});
  }

  async openEventActionMenu(eventTitle: string): Promise<void> {
    // PURPOSE:
    // Opens the action menu for a specific event.
    //
    // WHY:
    // The event card has a Copy link button and an action/menu button.
    // This excludes the Copy link button and clicks the menu-style button.

    await this.closeOpenMenuIfPresent();

    const eventContainer = await this.getEventContainer(eventTitle);

    const actionMenuButton = eventContainer
      .locator('button:not([aria-label="Copy link"])')
      .last();

    await expect(actionMenuButton).toBeVisible({ timeout: 30000 });
    await actionMenuButton.click();

    await expect(this.page.getByRole('menu')).toBeVisible({ timeout: 10000 });
  }

  async editEventJoinLink(
    eventTitle: string,
    updatedJoinLink: string
  ): Promise<void> {
    // PURPOSE:
    // Opens the specific event menu, clicks Edit,
    // updates the Join Link field, and clicks Update.

    await this.openEventActionMenu(eventTitle);

    await this.page.getByRole('menuitem', { name: 'Edit' }).click();

    const joinLinkInput = this.page.getByRole('textbox', {
      name: 'Join Link',
    });

    await expect(joinLinkInput).toBeVisible({ timeout: 30000 });

    await joinLinkInput.fill(updatedJoinLink);

    const updateButton = this.page.getByRole('button', { name: 'Update' });

    await expect(updateButton).toBeVisible({ timeout: 30000 });
    await expect(updateButton).toBeEnabled({ timeout: 30000 });

    await updateButton.click();

    await this.closeOpenMenuIfPresent();
  }

  async copyEventLink(eventTitle: string): Promise<void> {
    // PURPOSE:
    // Clicks Copy link for the specific event.
    //
    // IMPORTANT:
    // We are not reading clipboard text because Firefox/WebKit
    // do not support clipboard permissions the same way Chromium does.

    await this.closeOpenMenuIfPresent();

    const eventContainer = await this.getEventContainer(eventTitle);

    const copyLinkButton = eventContainer
      .getByRole('button', { name: 'Copy link' })
      .first();

    await expect(copyLinkButton).toBeVisible({ timeout: 30000 });
    await copyLinkButton.click();

    await this.closeOpenMenuIfPresent();
  }

  async cancelEvent(eventTitle: string): Promise<void> {
    // PURPOSE:
    // Opens the specific event menu, clicks Cancel,
    // accepts the browser confirmation popup,
    // and confirms the event is no longer visible.
    //
    // WHY:
    // In this app, after an event is canceled,
    // it disappears from the Events page.

    await this.openEventActionMenu(eventTitle);

    this.page.once('dialog', async (dialog) => {
      console.log(`Cancel dialog message: ${dialog.message()}`);
      await dialog.accept();
    });

    await this.page.getByRole('menuitem', { name: 'Cancel' }).click();

    await expect(
      this.page.getByText(eventTitle, { exact: true })
    ).not.toBeVisible({
      timeout: 30000,
    });
  }

  async deleteEvent(eventTitle: string): Promise<void> {
    // PURPOSE:
    // Opens the specific event menu, clicks Delete,
    // accepts the browser confirmation popup,
    // and confirms the event title is no longer visible.

    await this.closeOpenMenuIfPresent();

    await this.openEventActionMenu(eventTitle);

    this.page.once('dialog', async (dialog) => {
      console.log(`Delete dialog message: ${dialog.message()}`);
      await dialog.accept();
    });

    await this.page.getByRole('menuitem', { name: 'Delete' }).click();

    await expect(
      this.page.getByText(eventTitle, { exact: true })
    ).not.toBeVisible({
      timeout: 30000,
    });
  }
}
