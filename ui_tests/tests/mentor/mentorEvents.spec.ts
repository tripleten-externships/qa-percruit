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

    // Navigate to application
    await page.goto(baseURL!);

    // Login as Mentor
    await loginPage.loginAsUserType('Mentor');
  });

  /* Scenario: Mentor successfully creates a new event
    And starts the process to create a new event
    Then the system displays the event creation form
    And the mentor provides valid event details
    And the system saves the event successfully
    And the newly created event appears on the Events page */

  test('Mentor can create a new event successfully', async ({ page }) => {
    // Navigate to Events page
    await eventsPage.clickOnEvent();
    await page.waitForLoadState('networkidle', { timeout: 30000 });

    const isOnEventsPage = await eventsPage.isOnEventsManagementPage();
    expect(isOnEventsPage).toBeTruthy();

    // Start event creation
    await eventsPage.clickByButtonRoleByText('Create Event');

    const isFormVisible = await eventsPage.isEventCreationFormVisible();
    expect(isFormVisible).toBeTruthy();

    // Generate dynamic event data
    const eventStartTime = getDateTimePlusMinutes();
    const eventEndTime = getDateTimePlusMinutes(30);

    const createdEventTitle = `Tech Talk ${eventStartTime}`;

    // Fill form
    await eventsPage.fillEventCreationForm({
      title: createdEventTitle,
      description: 'A talk on the latest in technology.',
      joinLink: 'https://example.com/techtalk',
      startTime: eventStartTime,
      endTime: eventEndTime,
      maxAttendees: 10,
    });

    // Submit form
    await eventsPage.submitEventCreationForm();

    const isSuccess = await eventsPage.isEventCreationSuccessful();
    expect(isSuccess).toBeTruthy();

    // Verify event appears in list
    const isEventVisible = await eventsPage.isEventVisible(createdEventTitle);
    expect(isEventVisible).toBeTruthy();
  });

});