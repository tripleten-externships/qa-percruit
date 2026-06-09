import { test, expect } from '@playwright/test';
import { EventsPage } from '../../src/pages/mentor/EventsPage';
import { LoginPage } from '../../src/pages/common/LoginPage';

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
  test('should display event creation form when Create Event button is clicked and form is filled successfully', {tag:'@smoke'}, async ({ page }) => {
    // Action
   // await eventsPageInstance.clickByButtonRoleByText('Manage career coach events');
    

  await page.getByRole('link', { name: 'Manage career coach events' }).click();
  await page.getByRole('button', { name: 'Create Event' }).click();
  await page.getByRole('textbox', { name: 'Event Title' }).click();
  await page.getByRole('textbox', { name: 'Event Title' }).fill('Percruit Presentation');
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('Final demo');
  await page.getByRole('textbox', { name: 'Join Link' }).click();
  await page.getByRole('textbox', { name: 'Join Link' }).fill('tripleten.zoom.com');
  await page.getByRole('textbox', { name: 'Join Link' }).press('Tab');
  await page.getByRole('button', { name: 'Choose date, selected date is' }).click();
  // await page.getByRole('option', { name: 'PM' }).click();
   await page.getByRole('gridcell', { name: '30' }).click();
  await page.getByRole('option', { name: '6 hours' }).click();
  await page.getByRole('option', { name: '0 minutes', exact: true }).click();
  await page.getByRole('option', { name: 'PM' }).click();
  await page.getByRole('button', { name: 'Choose date', exact: true }).click();
  await page.getByRole('gridcell', { name: '30' }).click();
  await page.getByRole('option', { name: '8 hours' }).click();
  await page.getByRole('option', { name: 'PM' }).click();
  await page.getByRole('spinbutton', { name: 'Max Attendees (Optional)' }).click();
  await page.getByRole('spinbutton', { name: 'Max Attendees (Optional)' }).fill('10');
  //await page.getByText('CancelCreate').click();
  await page.getByRole('button', { name: 'Create' }).click();
  //verify text 'Event created successfully' is visible
  await expect(page.getByText('Event created successfully')).toBeVisible();
  
  });

  // Future tests for scenarios 2 and 3 would go he

//deletes event
test('test to edit the event created in previous test',{tag:'@smoke'}, async ({ page }) => {
  await page.locator('div:nth-child(5) > .MuiPaper-root > .MuiCardContent-root > .MuiBox-root.css-lhftxy > .MuiButtonBase-root').click();
  await page.getByRole('menuitem', { name: 'Edit' }).click();
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('Final demo (Edited)');
   await page.getByRole('button', { name: 'Update' }).click();

});
//copies event link
test('test to copy the link of the meeting',{tag:'@smoke'}, async ({ page }) => {
  await page.getByRole('button', { name: 'Copy link' }).first().click();
  console.log('Link copied to clipboard');
 
});


//cancels event
test('test to cancel the event created in previous test',{tag:'@smoke'}, async ({ page }) => {
 
  await page.locator('div:nth-child(5) > .MuiPaper-root > .MuiCardContent-root > .MuiBox-root.css-lhftxy > .MuiButtonBase-root').click();
  //await page.getByRole('button').nth(5).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('menuitem', { name: 'Cancel' }).click();
});

});