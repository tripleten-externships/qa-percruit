// Cucumber step definition imports for BDD test structure
import { Given, Then, Before } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import { EventsPage } from '../pages/mentor/EventsPage';
import { getDateTimePlusMinutes } from '../utils/dateUtils';

// Setup hook that runs before each scenario to initialize the EventsPage instance
Before(async function () {
  // Initialize the EventsPage object with the current browser page context
  this.eventsPage = new EventsPage(this.page);
});

// Step definition: Navigate to the Events page and verify successful navigation
Given('the mentor navigates to the Events page', async function () {
  // Click on the "Events" button to navigate to the Events page
  await this.eventsPage.clickByButtonRoleByText('Events');

  // Wait for navigation to complete before verifying page load
  await this.page.waitForLoadState('networkidle', { timeout: 30000 });

  // Verify that the mentor has successfully navigated to the Events Management page
  const isOnEventsPage = await this.eventsPage.isOnEventsManagementPage();
  expect(isOnEventsPage).toBeTruthy();
});

// Step definition: Initiate the event creation process
Given('starts the process to create a new event', async function () {
  // Click the "Create Event" button to open the event creation form
  await this.eventsPage.clickByButtonRoleByText('Create Event');
});

// Step definition: Verify that the event creation form is displayed
Then('the system displays the event creation form', async function () {
  // Check if the event creation form is visible to the user
  const isFormVisible = await this.eventsPage.isEventCreationFormVisible();
  expect(isFormVisible).toBeTruthy();
});

// Step definition: Fill out the event creation form with valid data
Then('the mentor provides valid event details', async function () {
  // Generate dynamic timestamps for event start and end times
  // Start time is current time plus a few minutes to avoid scheduling conflicts
  const eventStartTime = getDateTimePlusMinutes();
  // End time is 30 minutes after the start time
  const eventEndTime = getDateTimePlusMinutes(30);

  // Create a unique event title using the timestamp to avoid naming conflicts
  this.createdEventTitle = 'Tech Talk ' + eventStartTime;

  // Fill out the event creation form with all required details
  await this.eventsPage.fillEventCreationForm({
    title: this.createdEventTitle,
    description: 'A talk on the latest in technology.',
    joinLink: 'https://example.com/techtalk',
    startTime: eventStartTime,
    endTime: eventEndTime,
    maxAttendees: 10,
  });

  // Submit the completed form to create the event
  await this.eventsPage.submitEventCreationForm();
});

// Step definition: Verify that the event was saved successfully
Then('the system saves the event successfully', async function () {
  // Check for success confirmation after event creation
  const isSuccess = await this.eventsPage.isEventCreationSuccessful();
  expect(isSuccess).toBeTruthy();
});

// Step definition: Verify that the newly created event appears in the events list
Then('the newly created event appears on the Events page', async function () {
  // Verify that the event with the created title is now visible on the Events page
  // This confirms the event was successfully created and is displayed to users
  const isEventVisible = await this.eventsPage.isEventVisible(
    this.createdEventTitle
  );
  expect(isEventVisible).toBeTruthy();
});
