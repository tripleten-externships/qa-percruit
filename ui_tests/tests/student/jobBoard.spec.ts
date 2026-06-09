import { test, expect } from '@playwright/test';
import * as env from '../../src/config/world';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { JobBoardPage } from '../../src/pages/student/JobBoardPage';

let loginPage: LoginPage;
let jobBoardPage: JobBoardPage;

const baseURL = env.getBaseUrl();

test.describe('Student Job Board Navigation', () => {

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    jobBoardPage = new JobBoardPage(page);

    // Navigate to application
    await page.goto(baseURL!);

    // Login as Student
    await loginPage.loginAsUserType('Student');
  });

  test('Student can navigate to Recommended Jobs page and page displays correctly', async ({ page }) => {
    /* Scenario: Student accesses Recommended Jobs from sidebar and top search dropdown input
        Given the student is authenticated in the system
        When the student clicks on "Recommended Jobs" in the sidebar menu
        Then the URL should contain "/jobs" 
        And the Job Board page elements should be displayed
        When the student opens the top search dropdown
        And chooses "Recommended Jobs" from the available options
        Then the URL should contain "/jobs"
        And the Job Board page elements should be displayed
    */

    // Step 1: Navigate to Recommended Jobs page
    await jobBoardPage.navigateToRecommendedJobs();

    // Step 2: Verify URL contains /jobs
    await expect(page).toHaveURL(/jobs/);

    // Step 3: Verify Job Board page elements are visible
    await jobBoardPage.verifyPageLoaded();

    // Step 4: Navigate back to Dashboard
    await jobBoardPage.navigateToDashboard();

    // Step 5: Click sidebar search to display dropdown
    //await jobBoardPage.clickSidebarSearch();

    // Step 6: Select Recommended Jobs from dropdown to navigate to Recommended Jobs page
    await jobBoardPage.selectRecommendedJobsFromDropdown();

    // Step 7: Verify URL contains /jobs
    await expect(page).toHaveURL(/jobs/);

    // Step 8: verify page again to confirm stability
    await jobBoardPage.verifyPageLoaded();
  });

});