import { test, expect } from '@playwright/test';
import { EventsPage } from '../../src/pages/mentor/EventsPage';
import { getDateTimePlusMinutes } from '../../src/utils/dateUtils';
import { LoginPage } from '../../src/pages/common/LoginPage';

test.describe('Mentor - Event Actions', () => {
  let eventsPage: EventsPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page, baseURL }) => {
    loginPage = new LoginPage(page);
    eventsPage = new EventsPage(page);

    await page.goto(baseURL!);

    await loginPage.loginAsUserType('Mentor');
  });

  test('Mentor can edit, copy link, delete, and cancel events', async ({}, testInfo) => {
    // ============================================================
    // STEP 1: GO TO EVENTS MANAGEMENT PAGE
    // ============================================================

    await eventsPage.clickOnEvent();

    const isOnEventsPage = await eventsPage.isOnEventsManagementPage();
    expect(isOnEventsPage).toBeTruthy();

    // ============================================================
    // UNIQUE TEST ID
    // ============================================================
    // This keeps each browser event unique.
    // Shorter titles are easier for WebKit to find reliably.

    const uniqueId = `${testInfo.project.name}-${Date.now()}`;

    // ============================================================
    // EVENT A: CREATE EVENT FOR EDIT, COPY LINK, AND DELETE
    // ============================================================

    await eventsPage.clickCreateEvent();

    const isFirstFormVisible = await eventsPage.isEventCreationFormVisible();
    expect(isFirstFormVisible).toBeTruthy();

    const firstEventStartTime = getDateTimePlusMinutes();
    const firstEventEndTime = getDateTimePlusMinutes(30);

    const firstEventTitle = `Edit Delete ${uniqueId}`;
    const updatedJoinLink = 'https://example.com/updated-event-link';

    await eventsPage.fillEventCreationForm({
      eventDetails: {
        title: firstEventTitle,
        description: 'Event created for edit, copy link, and delete testing.',
        joinLink: 'https://example.com/original-event-link',
        startTime: firstEventStartTime,
        endTime: firstEventEndTime,
        maxAttendees: 10,
      }
    });

    await eventsPage.submitEventCreationForm();

    const isFirstEventVisible =
      await eventsPage.isEventVisible(firstEventTitle);
    expect(isFirstEventVisible).toBeTruthy();

    await eventsPage.editEventJoinLink(firstEventTitle, updatedJoinLink);

    await eventsPage.copyEventLink(firstEventTitle);

    await eventsPage.deleteEvent(firstEventTitle);

    // ============================================================
    // EVENT B: CREATE EVENT FOR CANCEL
    // ============================================================

    await eventsPage.clickCreateEvent();

    const isSecondFormVisible = await eventsPage.isEventCreationFormVisible();
    expect(isSecondFormVisible).toBeTruthy();

    const secondEventStartTime = getDateTimePlusMinutes(60);
    const secondEventEndTime = getDateTimePlusMinutes(90);

    const secondEventTitle = `Cancel ${uniqueId}`;

    await eventsPage.fillEventCreationForm({
      eventDetails: {
        title: secondEventTitle,
        description: 'Event created for cancel testing.',
        joinLink: 'https://example.com/cancel-event-link',
        startTime: secondEventStartTime,
        endTime: secondEventEndTime,
        maxAttendees: 10,
      }
    });

    await eventsPage.submitEventCreationForm();

    const isSecondEventVisible =
      await eventsPage.isEventVisible(secondEventTitle);
    expect(isSecondEventVisible).toBeTruthy();

    await eventsPage.cancelEvent(secondEventTitle);
  });
});
