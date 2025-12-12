import { Given, When, Then, Before } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ForumPage } from '../../../../src/pages/student/ForumPage';

let forumPage: ForumPage;

Before(async function() {
  // Assuming this.page is initialized in custom World
  forumPage = new ForumPage(this.page);
});

/**
 * Step: Student navigates to a specific page
 */
Given('the student is on the {string} page', async function (pageName: string) {
  if (pageName.toLowerCase() === 'forum') {
    await forumPage.navigateTo();
  } else {
    throw new Error(`Unknown page: ${pageName}`);
  }
});

/**
 * Step: Student clicks a button (New Post / Cancel)
 */
When('the student clicks the {string} button', async function (buttonName: string) {
  switch(buttonName.toLowerCase()) {
    case 'new post':
      await forumPage.clickNewPostButton();
      break;
    case 'cancel':
      await forumPage.clickCancelInModal(); // use correct method
      break;
    default:
      throw new Error(`Unknown button: ${buttonName}`);
  }
});

/**
 * Step: Verify the new post modal appears
 */
Then('the new post modal should appear', async function () {
  await forumPage.expectNewPostModalVisible(); // use POM method
});

/**
 * Step: Verify the new post modal closes
 */
Then('the new post modal should close', async function () {
  await forumPage.expectNewPostModalHidden(); // use POM method
});

/**
 * Step: Verify the student remains on the Forum page
 */
Then('the student should remain on the {string} page', async function (pageName: string) {
  const currentURL = this.page.url();
  expect(currentURL.toLowerCase()).toContain(pageName.toLowerCase());
});
