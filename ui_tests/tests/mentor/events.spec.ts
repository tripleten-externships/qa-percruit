import { test, expect, type Page } from '@playwright/test';
import { EventsPage } from '../../src/pages/mentor/EventsPage';
import { LoginPage } from '../../src/pages/common/LoginPage';

async function createMentorEvent(page: Page, title = `Percruit Presentation ${Date.now()}`) {
  await page.getByRole('button', { name: 'Create Event' }).click();
  await expect(page.getByRole('textbox', { name: 'Event Title' })).toBeVisible({ timeout: 10000 });

  await page.getByRole('textbox', { name: 'Event Title' }).fill(title);
  await page.getByRole('textbox', { name: 'Description' }).fill('Final demo');
  await page.getByRole('textbox', { name: 'Join Link' }).fill('tripleten.zoom.com');

  await page.getByRole('button', { name: /Choose date/ }).first().click();
  await page.getByRole('gridcell', { name: '30' }).click();
  await page.getByRole('option', { name: '6 hours' }).click();
  await page.getByRole('option', { name: '0 minutes' }).click();
  await page.getByRole('option', { name: 'PM' }).click();

  await page.getByRole('button', { name: /Choose date/ }).nth(1).click();
  await page.getByRole('gridcell', { name: '30' }).click();
  await page.getByRole('option', { name: '8 hours' }).click();
  await page.getByRole('option', { name: 'PM' }).click();

  await page.getByRole('spinbutton', { name: 'Max Attendees (Optional)' }).fill('10');
  await page.getByRole('button', { name: 'Create' }).click();

  await expect(page.getByText('Event created successfully')).toBeVisible({ timeout: 10000 });
  await expect(page.getByText(title)).toBeVisible({ timeout: 10000 });

  return title;
}

async function openEventActionMenu(page: Page, eventTitle: string) {
  const actionButton = page.locator(`.MuiPaper-root:has-text("${eventTitle}") .MuiButtonBase-root`).first();
  await expect(actionButton).toBeVisible({ timeout: 10000 });
  await actionButton.click();
}

test.describe('Mentor-Events', () => {
  let eventsPageInstance: EventsPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    // 1. Initialize Page Objects
    eventsPageInstance = new EventsPage(page);
    loginPage = new LoginPage(page);

    // 2. Navigation and Login
    await page.goto('/'); 

    await loginPage.loginAsUserType('Mentor');
    
    // 3. Setup State
    await eventsPageInstance.handleCookiePopup();
    
    // 4. Navigate to the specific area
    // Note: If 'Create Event' is a link that navigates, ensure the URL changes
    await page.getByRole('link', { name: 'Manage career coach events' }).click();
    await eventsPageInstance.verifyHeading('Events & Workshops');
  });

  /**
   * Scenario 1: Verify form visibility amd fill the form successfully
   */
  test('should display event creation form when Create Event button is clicked and form is filled successfully', { tags: ['@smoke'] }, async ({ page }) => {
    await createMentorEvent(page);
  });

  /**
   * Scenario 2: Edit event
   */
  test('test to edit the event created in previous test', { tags: ['@smoke'] }, async ({ page }) => {
    const eventTitle = await createMentorEvent(page);
    await expect(page.getByText(eventTitle)).toBeVisible({ timeout: 10000 });
    await openEventActionMenu(page, eventTitle);
    await page.getByRole('menuitem', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Description' }).fill('Final demo (Edited)');
    await page.getByRole('button', { name: 'Update' }).click();
  });

  /**
   * Scenario 3: Copy event link
   */
  test('test to copy the link of the meeting', { tags: ['@smoke'] }, async ({ page }) => {
    const eventTitle = await createMentorEvent(page);
    const eventCard = page.locator('.MuiPaper-root', { hasText: eventTitle });
    await expect(eventCard).toBeVisible({ timeout: 10000 });
    await eventCard.getByRole('button', { name: 'Copy link' }).click();
    console.log('Link copied to clipboard');
  });

  /**
   * Scenario 4: Cancel event
   */
  test('test to cancel the event created in previous test', { tags: ['@smoke'] }, async ({ page }) => {
    const eventTitle = await createMentorEvent(page);
    await expect(page.getByText(eventTitle)).toBeVisible({ timeout: 10000 });
    await openEventActionMenu(page, eventTitle);
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole('menuitem', { name: 'Cancel' }).click();
  });
});