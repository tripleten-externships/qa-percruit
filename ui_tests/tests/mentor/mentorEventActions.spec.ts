import { test, expect } from '@playwright/test';
import { EventsPage } from '../../src/pages/mentor/EventsPage';
import { getDateTimePlusMinutes } from '../../src/utils/dateUtils';
import { LoginPage } from '../../src/pages/common/LoginPage';

test.describe('Mentor - Event Actions', () => {
  let eventsPage: EventsPage;
  let loginPage: LoginPage;

  // Demo pause so the audience can see each step
  const DEMO_PAUSE_MS = 3000;

  test.beforeEach(async ({ page, baseURL }) => {
    loginPage = new LoginPage(page);
    eventsPage = new EventsPage(page);

    await page.goto(baseURL!, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    await loginPage.loginAsUserType('Mentor');

    // Pause after login so the dashboard/page transition is visible
    await page.waitForTimeout(DEMO_PAUSE_MS);
  });

  test('Mentor can edit, copy link, delete, and cancel events', async ({ page }) => {
    // Extra timeout because demo pauses make the test longer
    test.setTimeout(180000);

    await eventsPage.clickOnEvent();

    const isOnEventsPage = await eventsPage.isOnEventsManagementPage();
    expect(isOnEventsPage).toBeTruthy();

    // Pause so they can see the Events Management page
    await page.waitForTimeout(DEMO_PAUSE_MS);

    const runId = Date.now();

    // EVENT A: Create event for edit, copy link, and delete
    await eventsPage.clickCreateEvent();

    const isFirstFormVisible = await eventsPage.isEventCreationFormVisible();
    expect(isFirstFormVisible).toBeTruthy();

    // Pause so they can see the create event form open
    await page.waitForTimeout(DEMO_PAUSE_MS);

    const firstEventStartTime = getDateTimePlusMinutes();
    const firstEventEndTime = getDateTimePlusMinutes(30);

    const firstEventTitle = 'Tech Talk: QA Automation Basics';
    const updatedJoinLink = 'https://example.com/updated-event-link';

    await eventsPage.fillEventCreationForm({
      eventDetails: {
        title: firstEventTitle,
        description: `A mentor-led tech talk covering QA automation basics, Playwright testing, and best practices for validating event workflows. Test run: ${runId}`,
        joinLink: 'https://example.com/original-event-link',
        startTime: firstEventStartTime,
        endTime: firstEventEndTime,
        maxAttendees: 10,
      },
    });

    // Pause so they can see the completed form before submitting
    await page.waitForTimeout(DEMO_PAUSE_MS);

    await eventsPage.submitEventCreationForm();

    const isFirstEventVisible = await eventsPage.isEventVisible(firstEventTitle);
    expect(isFirstEventVisible).toBeTruthy();

    // Pause so they can see Event A was created
    await page.waitForTimeout(DEMO_PAUSE_MS);

    await eventsPage.editEventJoinLink(firstEventTitle, updatedJoinLink);

    // Pause so they can see the edit action finished
    await page.waitForTimeout(DEMO_PAUSE_MS);

    await eventsPage.copyEventLink(firstEventTitle);

    // Pause so they can see the copy link action
    await page.waitForTimeout(DEMO_PAUSE_MS);

    await eventsPage.deleteEvent(firstEventTitle);

    // Pause so they can see Event A was deleted
    await page.waitForTimeout(DEMO_PAUSE_MS);

    // EVENT B: Create event for cancel
    await eventsPage.clickCreateEvent();

    const isSecondFormVisible = await eventsPage.isEventCreationFormVisible();
    expect(isSecondFormVisible).toBeTruthy();

    // Pause so they can see the second create event form open
    await page.waitForTimeout(DEMO_PAUSE_MS);

    const secondEventStartTime = getDateTimePlusMinutes(60);
    const secondEventEndTime = getDateTimePlusMinutes(90);

    const secondEventTitle = 'Tech Talk: Career Readiness Q&A';

    await eventsPage.fillEventCreationForm({
      eventDetails: {
        title: secondEventTitle,
        description: `A mentor-led career readiness session focused on interview preparation, communication tips, and student support. Test run: ${runId}`,
        joinLink: 'https://example.com/cancel-event-link',
        startTime: secondEventStartTime,
        endTime: secondEventEndTime,
        maxAttendees: 10,
      },
    });

    // Pause so they can see the second completed form
    await page.waitForTimeout(DEMO_PAUSE_MS);

    await eventsPage.submitEventCreationForm();

    const isSecondEventVisible = await eventsPage.isEventVisible(secondEventTitle);
    expect(isSecondEventVisible).toBeTruthy();

    // Pause so they can see Event B was created
    await page.waitForTimeout(DEMO_PAUSE_MS);

    await eventsPage.cancelEvent(secondEventTitle);

    // Pause so they can see the cancel action complete
    await page.waitForTimeout(DEMO_PAUSE_MS);
  });
});