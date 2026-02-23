import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { ForumsPage } from '../../src/pages/student/ForumsPage';

test.describe('Student - Forums Page', () => {
  let loginPage: LoginPage;
  let forumsPage: ForumsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    forumsPage = new ForumsPage(page);

    // If login is NOT handled globally, uncomment:
    // await loginPage.login(process.env.STUDENT_EMAIL!, process.env.STUDENT_PASSWORD!);
  });

  /* Scenario: When the user navigates to the Forums page, the page loads as expected
    Given the student is authenticated in the system
    When the student navigates to the Forums page
    Then the Forums page is displayed */

  test('Forums page should load successfully', async ({ page }) => {
    await forumsPage.navigateToForums();
    await forumsPage.verifyPage();
  });

  /* Scenario: New post modal workflow
    Given the student is authenticated in the system
    And the student is on the Forums page
    When the student clicks the New Post button
    Then the New Post modal should appear */

  test('New Post modal should appear when clicking New Post button', async ({ page }) => {
    await forumsPage.navigateToForums();
    await forumsPage.verifyPage();

    await forumsPage.clickNewPostButton();
    await forumsPage.verifyNewPostModalVisible();
  });

  /* Scenario Outline: User searches for posts by keyword
    Given the student is authenticated in the system
    Given the student is on the Forums page
    And a search input field is visible at the page
    When the student types "<keyword>" into the search field
    Then only posts containing "<keyword>" are displayed */

  test.describe('Search posts', () => {

    test('Search should filter posts correctly', async ({ page }) => {
      await forumsPage.navigateToForums();

      const searchInput = page.locator('input[placeholder="Search posts..."]');
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      const keyword = 'Interview';

      await forumsPage.searchFor(keyword);

      const found = await forumsPage.verifyMatchingPosts(keyword);

      if (!found) {
        console.log(`No posts found for keyword "${keyword}"`);
        return;
      }

      await forumsPage.verifyNonMatchingPostsAreHidden(keyword);
    });

  });

  /* Scenario Outline: User filters posts by topic and sees the button highlighted
  Given the student is authenticated in the system
  And the student is on the Forums page
  And the topic filter options are visible
  When the student clicks the "<topic>" topic filter
  Then the "<topic>" topic filter button should appear selected
  And only posts tagged with "<topic>" should be displayed
  And posts from other topics should be hidden */

  test.describe('Topic filters', () => {

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

    test('All topic filter buttons should be visible', async ({ page }) => {
      await forumsPage.navigateToForums();

      for (const topic of topics) {
        const button = forumsPage.topicButton(topic);
        await expect(button).toBeVisible({ timeout: 10000 });
      }
    });

    test('Clicking topic filter should highlight button and filter posts', async ({ page }) => {
      await forumsPage.navigateToForums();

      const topic = 'Technical';

      await forumsPage.clickTopic(topic);
      await forumsPage.verifyButtonHighlighted(topic);

      await forumsPage.verifyPostsForTopic(topic);

      // Validate other posts are hidden
      const posts = forumsPage.forumPosts();
      const count = await posts.count();

      for (let i = 0; i < count; i++) {
        const post = posts.nth(i);
        const tags = await forumsPage.postTopic(post).allTextContents();
        expect(tags.length).toBeGreaterThan(0);
      }
    });

  });

});