import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/common/LoginPage';
//import { LogoutPage } from '../../src/pages/common/LogoutPage';
import { MentorsPage } from '../../src/pages/admin/MentorsPage';
import * as MentorListTestData from '../../src/test-data/MentorListTestData';

test.describe('Admin - Mentors Search', () => {
  let loginPage: LoginPage;
  let mentorsPage: MentorsPage;
  // let logoutPage: LogoutPage;

  test.beforeEach(async ({ page, baseURL }) => {
    loginPage = new LoginPage(page);
    mentorsPage = new MentorsPage(page);
    // logoutPage = new LogoutPage(page);

    await page.goto(baseURL!);
    await loginPage.loginAsUserType('Admin');
   // await logoutPage.isOnHomePage();

    await page.getByRole('link', { name: 'Career Coach Insights' }).click();
    //await mentorsPage.goToMentorsPage();
    //await mentorsPage.waitForMentorsPageReady();
    // Not sure if line 23 and 24 need to be left in
  });

  /* Scenario: Filter mentors by full name
    When the admin user searches for a mentor by full name
    Then the mentors list should display only mentors whose names matches the search criteria
    And the total count should update to reflect the number of matching mentors */

  test('Search mentors by full name', async () => {
    await mentorsPage.SearchMentors(MentorListTestData.FULL_NAME);

    await mentorsPage.allMentorNamesMatch(
      MentorListTestData.FULL_NAME
    );

    // Optional stronger validation
    // await expect(mentorsPage.totalCount).toHaveText('1');
  });

  /* Scenario: Filter mentors by partial name
    When the admin user searches using part of a mentor name
    Then the mentors list should show all mentors whose names contain the part of what was typed in
    And the total count should reflect the number of matches*/

  test('Search mentors by partial name', async () => {
    await mentorsPage.SearchMentors(
      MentorListTestData.PARTIAL_NAME
    );

    await mentorsPage.allMentorNamesMatch(
      MentorListTestData.PARTIAL_NAME
    );
  });

  /* Scenario: Filter mentors by email address
    When the admin user searches using a mentor email address
    Then only the mentor with that email address should appear in the list
    And the total count should be 1 */

  test('Search mentors by email address', async () => {
    await mentorsPage.SearchMentorEmail(
      MentorListTestData.MENTOR_EMAIL
    );

    await mentorsPage.allMentorNamesMatch(
      MentorListTestData.MENTOR_EMAIL
    );

    // Strong validation example:
    // await expect(mentorsPage.getMentorRows()).toHaveCount(1);
  });

  /* Scenario: Search returns no matches
    When the admin user searches for a name or email that does not exist
    Then the mentors list should display a message saying "No mentors found"
    And the total count should be 0 */

  test('Search non-existent mentor shows no results message', async () => {
    await mentorsPage.SearchMentors(
      MentorListTestData.NON_EXISTENT_NAME
    );

    await mentorsPage.NoMentorsMessageIsVisible();
    //await mentorsPage.MentorsCountIsZero();
  })

});