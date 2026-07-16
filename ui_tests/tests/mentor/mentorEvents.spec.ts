import * as env from '/Users/ashl3yymari3/Documents/GitHub/qa-percruit/ui_tests/src/config/world';
import { test, expect } from '@playwright/test';
import { EventsPage } from '../../src/pages/mentor/EventsPage';
import { getDateTimePlusMinutes } from '../../src/utils/dateUtils';
import { LoginPage } from '../../src/pages/common/LoginPage';

test.describe('Mentor - Events Management', () => {
  let eventsPage: EventsPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page, baseURL }) => {
    loginPage = new LoginPage(page);
    eventsPage = new EventsPage(page);

    await page.goto(baseURL!);

    await loginPage.loginAsUserType('Mentor');
  });

  test('Mentor can create a new event successfully', async ({ page }) => {
    await eventsPage.clickOnEvent();

    const isOnEventsPage = await eventsPage.isOnEventsManagementPage();
    expect(isOnEventsPage).toBeTruthy();

    await eventsPage.clickCreateEvent();

    const isFormVisible = await eventsPage.isEventCreationFormVisible();
    expect(isFormVisible).toBeTruthy();

    const eventStartTime = getDateTimePlusMinutes();
    const eventEndTime = getDateTimePlusMinutes(30);

    const createdEventTitle = `Tech Talk ${eventStartTime}`;

    await eventsPage.fillEventCreationForm({
      title: createdEventTitle,
      description: 'A talk on the latest in technology.',
      joinLink: 'https://example.com/techtalk',
      startTime: eventStartTime,
      endTime: eventEndTime,
      maxAttendees: 10,
    });

    await eventsPage.submitEventCreationForm();

    const isSuccess = await eventsPage.isEventCreationSuccessful();
    expect(isSuccess).toBeTruthy();

    const isEventVisible = await eventsPage.isEventVisible(createdEventTitle);
    expect(isEventVisible).toBeTruthy();
  });
});