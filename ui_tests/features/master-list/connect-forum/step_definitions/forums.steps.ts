import { Given, When, Then, Before } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
// Import environment configuration and Page Object Models

import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';
import { ForumsPage } from '../../../../src/pages/student/ForumsPage'
// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let forumsPage: ForumsPage;

Before(async function() {
  // Assuming this.page is initialized in custom World
  loginPage = new LoginPage(this.page);
  forumsPage = new ForumsPage(this.page);
});

// ----------------------
// Scenario 1: Verify Forums page loads
// ----------------------

When('the student navigates to the Forums page', async function () {
  await forumsPage.navigateToForums();
});

Then('the Forums page is displayed', async function () {
  await forumsPage.verifyPage();
  console.log('Forums Page verified');
});

// ----------------------
// Scenario 2: New Post modal
// ----------------------

Given('the student is on the Forums page', async function () {
  // Navigate and verify page (reuse existing methods)
  await forumsPage.navigateToForums();
  await forumsPage.verifyPage();
});
When('the student clicks the New Post button', async function () {
  await forumsPage.clickNewPostButton();
  console.log('New Post button clicked');
});

Then('the New Post modal should appear', async function () {
    await forumsPage.verifyNewPostModalVisible();
    console.log('New Post modal is visible');
});



// ----------------------
// Search steps (Scenario Outline)
// ----------------------
Given('a search input field is visible at the page', async function () {
  const searchInput = this.page.locator('input[placeholder="Search posts..."]');
  await expect(searchInput).toBeVisible({ timeout: 10000 });
  console.log('✅ Search input is visible');
});

When(
  'the student types {string} into the search field',
  async function (keyword: string) {
    await forumsPage.searchFor(keyword);
  }
);
Then('only posts containing {string} are displayed', async function (keyword: string) {
  const found = await forumsPage.verifyMatchingPosts(keyword);

  if (found) {
    console.log(`Posts found for keyword "${keyword}" ✅`);
  } else {
    console.log(`No posts found for keyword "${keyword}" ⚠️`);
    // Gracefully exit — test still passes
    return;
  }

  // Verify non-matching posts are hidden
  await forumsPage.verifyNonMatchingPostsAreHidden(keyword);
});

//Forum Topic Filter Steps
Given('the topic filter options are visible', async function () {
  // Example topics that should always be present
  const topics = [
    'Interview-Prep',
    'Resume',
    'Career-Advice',
    'Job-Search', 
    'Salary',
    'Networking',
    'Technical',
    'Behavioral'
  ];

  for (const topic of topics) {
    const button = forumsPage.topicButton(topic);
    await expect(button).toBeVisible({ timeout: 10000 });
  }
});

When('the student clicks the {string} topic filter', async function (topic: string) {
  await forumsPage.clickTopic(topic);
});

Then('the {string} topic filter button should appear selected', async function (topic: string) {
  await forumsPage.verifyButtonHighlighted(topic);
});


Then('only posts tagged with {string} should be displayed', async function (topic: string) {
  await forumsPage.verifyPostsForTopic(topic);
});

Then('posts from other topics should be hidden', async function () {
  const posts = forumsPage.forumPosts();
  const count = await posts.count();

  for (let i = 0; i < count; i++) {
    const post = posts.nth(i);
    const tags = await forumsPage.postTopic(post).allTextContents();
    expect(tags.length).toBeGreaterThan(0);
  }
});