import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../../src/config/world';
import { EventsPage } from '../../../../src/pages/mentor/EventsPage';
import { getDateTimePlusMinutes } from '../../../../src/utils/dateUtils';

Before(async function () {
  this.eventsPage = new EventsPage(this.page);
});

Given('the mentor navigates to the Events page', async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.eventsPage.clickByButtonRoleByText('Events');
  const isOnEventsPage = await this.eventsPage.isOnEventsManagementPage();
  expect(isOnEventsPage).toBeTruthy();
});

Given('starts the process to create a new event', async function () {
  await this.eventsPage.clickByButtonRoleByText('Create Event');
});

Then('the system displays the event creation form', async function () {
  const isFormVisible = await this.eventsPage.isEventCreationFormVisible();
  expect(isFormVisible).toBeTruthy();
});

Then('the mentor provides valid event details', async function () {
  // Write code here that turns the phrase above into concrete actions
  const eventStartTime = getDateTimePlusMinutes();
  const eventEndTime = getDateTimePlusMinutes(30);

  this.createdEventTitle = 'Tech Talk ' + eventStartTime;

  await this.eventsPage.fillEventCreationForm({
    title: this.createdEventTitle,
    description: 'A talk on the latest in technology.',
    joinLink: 'https://example.com/techtalk',
    startTime: eventStartTime,
    endTime: eventEndTime,
    maxAttendees: 10,
  });
  await this.eventsPage.submitEventCreationForm();
});

Then('the system saves the event successfully', async function () {
  const isSuccess = await this.eventsPage.isEventCreationSuccessful();
  expect(isSuccess).toBeTruthy();
});

Then('the newly created event appears on the Events page', async function () {
  // Write code here that turns the phrase above into concrete actions
  const isEventVisible = await this.eventsPage.isEventVisible(this.createdEventTitle);
  expect(isEventVisible).toBeTruthy();
});
