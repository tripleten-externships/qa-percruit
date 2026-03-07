import { test, expect,Page } from '@playwright/test';
import * as env from '../../src/config/world';
import { LoginPage } from '../../src/pages/common/LoginPage';
import { TrackerDashboardPage } from '../../src/pages/student/TrackerDashboardPage';

function generateJobTitle(prefix: string) {
  return `${prefix} ${Date.now()}`;
}

test.describe('Student - Job Tracker Dashboard', () => {
  test.describe.configure({ mode: 'serial' });
  let loginPage: LoginPage;
  let studentTrackerDashboardPage: TrackerDashboardPage;
  // Define or import baseURL from the environment configuration
  const baseURL = env.getBaseUrl();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    studentTrackerDashboardPage = new TrackerDashboardPage(page);
    // Navigate to application
    await page.goto(baseURL);
    // Handle cookie consent if it appears
    const cookieButton = page.locator('button:has-text("Accept all cookies")');
    if (await cookieButton.isVisible()) {
      await cookieButton.click();
    }
    // Login as Student
    await loginPage.loginAsUserType('Student');

  });

  test('Student can acces Job Tracker dashboard', async ({ page }) => {
    /*
    Scenario: Student can access the Job Tracker dashboard
    Given the student navigates to the Job Tracker page
    Then the Job Tracker dashboard loads successfully
    And the student should see the job tracking interface
    */
    // Navigate to dashboard
    await studentTrackerDashboardPage.navigateToJobTracker();
    // Verify dashboard components are visible
    await studentTrackerDashboardPage.verifyPageLoaded();
  });

  test('Student adds a job using AI Magic Fill', async ({ page }) => {
    /*
      Scenario: Student adds a job using AI Magic Fill
      Given the student is on the Job Tracker dashboard
      When the student clicks the "Add Job" button
      And the student selects the AI Magic Fill option
      And the student enters the job posting URL
      Then the job details should be automatically populated
      And the student should be able to save the job entry
    */
      await studentTrackerDashboardPage.navigateToJobTracker();
      await studentTrackerDashboardPage.verifyPageLoaded();
      await studentTrackerDashboardPage.addJobWithAIMagicFill("Multi Media, LLC is seeking a QA Engineer to perform manual testing for its large-scale live streaming platform. The role involves writing and executing test cases, reviewing code changes, troubleshooting issues, and ensuring quality across features such as video streaming, live chat, and payment systems across web, mobile, and other devices. Experience with white-box testing is required, and knowledge of Python or JavaScript is a plus. More details about the company and the role can be found at https://www.linkedin.com/jobs/collections/recommended/?currentJobId=4369842099");
      
  });

  test('Student adds a job manually', async ({ page }) => {
  /*
  Scenario: Student adds a job manually
    Given the student is on the Job Tracker dashboard
    When the student clicks the "Add Job" button
    And the student manually enters the job details
    And the student submits the job form
    Then the new job should be added to the job tracker list
    */
    const jobTitle = generateJobTitle("QA Engineer I");

    await studentTrackerDashboardPage.navigateToJobTracker();
    await studentTrackerDashboardPage.verifyPageLoaded();
    await studentTrackerDashboardPage.addJobManually(jobTitle, "Test Company", "Remote", "https://www.example.com", "Test description for the job.");
    await studentTrackerDashboardPage.acceptJobAddedSuccessfully();
    await studentTrackerDashboardPage.verifyJobAdded(jobTitle);
  });

  test('Student can view jobs in the Job Tracker', async ({ page }) => {  
  /*
  Scenario: Student can view jobs in the Job Tracker
    Given the student has previously added job entries
    When the student navigates to the Job Tracker dashboard
    Then the student should see the list of saved job applications
    And each job entry should display relevant job information
    */
      const jobTitle = generateJobTitle("QA Engineer Search");

      await studentTrackerDashboardPage.navigateToJobTracker();
      await studentTrackerDashboardPage.verifyPageLoaded();
      await studentTrackerDashboardPage.addJobManually(
        jobTitle,
        "Test Company",
        "Remote",
        "https://example.com",
        "Search test job description"
      );
      await studentTrackerDashboardPage.acceptJobAddedSuccessfully();
      
      await studentTrackerDashboardPage.verifyJobAdded(jobTitle);
  });

  test('Student searches for a job in the tracker', async ({ page }) => {
    /*
  Scenario: Student searches for a job in the tracker
    Given the student is on the Job Tracker dashboard
    And the student has multiple job entries saved
    When the student enters a keyword in the search field
    Then the job tracker should filter and display matching job entries
    */
    const jobTitle = generateJobTitle("QA Engineer Search");

    await studentTrackerDashboardPage.navigateToJobTracker();

    await studentTrackerDashboardPage.addJobManually(
      jobTitle,
      "Test Company",
      "Remote",
      "https://example.com",
      "Search test job description"
    );

    await studentTrackerDashboardPage.acceptJobAddedSuccessfully();

    await studentTrackerDashboardPage.searchJob(jobTitle);

    await studentTrackerDashboardPage.verifyJobAdded(jobTitle);

    });

  test('Student deletes a job from the tracker', async ({ page }) => {
    /*
    Scenario: Student deletes a job from the tracker
    Given the student is on the Job Tracker dashboard
    And the student has an existing job entry
    When the student clicks the delete option for that job
    Then the job should be removed from the job tracker list
    */
    const jobTitle = generateJobTitle("QA Engineer Delete");

    await studentTrackerDashboardPage.navigateToJobTracker();

    await studentTrackerDashboardPage.addJobManually(
      jobTitle,
      "Test Company",
      "Remote",
      "https://example.com",
      "Delete test job description"
    );

    await studentTrackerDashboardPage.acceptJobAddedSuccessfully();

    await studentTrackerDashboardPage.deleteJob(jobTitle);

    await studentTrackerDashboardPage.verifyJobDeleted(jobTitle);

    });

});
  
