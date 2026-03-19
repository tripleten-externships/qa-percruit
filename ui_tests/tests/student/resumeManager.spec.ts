// Import Playwright testing utilities
import { test, expect } from '@playwright/test';

// Import environment configuration
import * as env from '../../src/config/world';

// Import Page Object Models (POM)
import { LoginPage } from '../../src/pages/common/LoginPage';
import { ResumeManagerPage } from '../../src/pages/student/ResumeManagerPage';

// Utility function to generate a unique student name for each test run
function generateStudentName() {
  const firstNames = ['John', 'Jane', 'Alex', 'Chris', 'Taylor', 'Jira', 'Lio'];
  const lastNames = ['Smith', 'Brown', 'Wilson', 'Lee', 'Davis', 'DiMezio', 'Yun'];

  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${first} ${last}`;
}

test.describe('Student Resume Manager', () => {
  test.describe.configure({ mode: 'serial' });

  // Declare page object instances
  let loginPage: LoginPage;
  let resumeManagerPage: ResumeManagerPage;

  // Track created resumes for cleanup
  let resumesToDelete: string[] = [];

  // Runs before each test to set up the test environment
  test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    resumeManagerPage = new ResumeManagerPage(page);

    await page.goto(env.getBaseUrl());

    const cookieButton = page.locator('button:has-text("Accept all cookies")');
    if (await cookieButton.isVisible()) {
      await cookieButton.click();
    }

    await loginPage.loginAsUserType('Student');
  });

  // Cleanup after each test
  // test.afterEach(async () => {

  //   if (resumesToDelete.length === 0) return;

  //   for (const name of resumesToDelete) {
  //     try {
  //       await resumeManagerPage.navigateToResumeManager();
  //       await resumeManagerPage.deleteResume(name);
  //     } catch {
  //       console.log(`Cleanup skipped for ${name}`);
  //     }
  //   }

  //   resumesToDelete = [];
  // });

  test.afterEach(async () => {

  if (resumesToDelete.length === 0) return;

  await resumeManagerPage.navigateToResumeManager();

  for (const name of resumesToDelete) {

    try {

      const resumeRow = resumeManagerPage.page.getByRole('checkbox', {
        name: new RegExp(name, 'i')
      });

      const count = await resumeRow.count();

      if (count === 0) {
        console.log(`Cleanup skipped. ${name} not found.`);
        continue;
      }

      //await resumeManagerPage.cleanUpResume();
      await resumeManagerPage.deleteResume(name);

    } catch (error) {
      console.log(`Cleanup failed for ${name}`);
    }
  }

  resumesToDelete = [];
});

  test('Student creates resume from scratch',{tag: '@smoke'}, async ({ page }) => {
  /**
   * Smoke Test
   *
   * Scenario: Student creates a resume from scratch
   *
   * Given the student is logged into the system
   * When the student navigates to the Resume Manager page
   * And creates a resume from scratch
   * Then the resume should be successfully created
   * And appear in the Resume Manager list
   */

    const studentName = generateStudentName();
    resumesToDelete.push(studentName);

    console.log('Generated student name:', studentName);

    await resumeManagerPage.navigateToResumeManager();

    await resumeManagerPage.startResumeFromScratch();

    await resumeManagerPage.fillContactInfo(
      studentName,
      'john@test.com',
      '(111) 999-8888',
      'Boston, MA'
    );

    await resumeManagerPage.addWorkExperience(
      'QA Engineer',
      'Tech Company',
      '2026-01-12',
      'Present'
    );

    await resumeManagerPage.addEducation(
      'State University',
      'Bachelor of Science in Computer Science',
      '2025-01-01',
      true
    );

    await resumeManagerPage.finishResumeCreation();

    await resumeManagerPage.verifyResumeCreated(studentName);

  });


  test('Student creates a resume with Get Started Help',{tag: '@smoke'}, async ({ page }) => {
  /**
   * Smoke Test
   *
   * Scenario: Student creates a resume from scratch using Get Started Help
   *
   * Given the student is logged into the system
   * When the student navigates to the Resume Manager page
   * When the student clicks "Build New"
   * And selects "Get Started"
   * And the student follows the guided prompts
   * Then a resume should be generated successfully
   * And it should appear in the Resume Manager list
   */

  const studentName = generateStudentName();
  resumesToDelete.push(studentName);

  console.log('Generated student name:', studentName);

  await resumeManagerPage.navigateToResumeManager();
  await resumeManagerPage.verifyPageLoaded();

  await resumeManagerPage.startResumeWithGuidedHelp();

  await resumeManagerPage.fillGuidedContactInfo(
    studentName,
    'johnD@testing.com',
    '1112223333',
    'Boston MA'
  );

  await resumeManagerPage.verifyGuidedresumeCreationComplete(studentName);

  await resumeManagerPage.finishResumeCreation();

  await resumeManagerPage.verifyResumeCreated(studentName);

});


test('Student creates a resume using upload PDF file option',{tag: '@smoke'}, async ({ page }) => {
/*
Scenario 3 — Upload PDF resume
Given the student is logged in
And the student navigates to the Resume Manager page

When the student uploads a PDF resume file

Then the resume should upload successfully
And appear in the Resume Manager list
*/
 
  const studentName = 'Alex Rivera';
  resumesToDelete.push(studentName);
  console.log('Student name on the upload resume :', studentName);

  await resumeManagerPage.navigateToResumeManager();
  await resumeManagerPage.verifyPageLoaded();

  await resumeManagerPage.creteResumeWithUpload(
    'src/test-data/QaExampleResume.pdf',
    studentName
  );
  await resumeManagerPage.verifyResumeUploaded(studentName);

  await resumeManagerPage.finishResumeCreation();

  await resumeManagerPage.verifyResumeCreated(studentName);

});


test('Student duplicates a resume',{tag: '@smoke'}, async ({ page }) => {
/* Scenario: Student duplicates an existing resume

    Given the student is logged into the system
    When the student navigates to the Resume Manager page
    And creates a resume from scratch
    And duplicates the created resume using Quick Actions
    Then a new resume copy should be created
    And the duplicated resume name should appear as "Resume Name (Copy)"

*/
  const studentName = generateStudentName();
  const duplicateName = `${studentName} (Copy)`;

  resumesToDelete.push(studentName);
  resumesToDelete.push(duplicateName);

  await resumeManagerPage.navigateToResumeManager();
  await resumeManagerPage.verifyPageLoaded();

  await resumeManagerPage.startResumeFromScratch();

  await resumeManagerPage.fillContactInfo(
    studentName,
    'john@test.com',
    '1112223333',
    'Boston MA'
  );

  await resumeManagerPage.addWorkExperience(
    'QA Engineer',
    'Tech Company',
    '2026-01-12',
    'Present'
  );

  await resumeManagerPage.addEducation(
    'State University',
    'Bachelor of Science in Computer Science',
    '2025-01-01',
    true
  );

  await resumeManagerPage.finishResumeCreation();

  await resumeManagerPage.verifyResumeCreated(studentName);

  await resumeManagerPage.duplicateResume(studentName);

  await resumeManagerPage.verifyResumeDuplicated(studentName);

});


test('Student downloads resume PDF',{tag: '@smoke'}, async ({ page }) => {
/*
// Scenario: Student downloads a resume as PDF
//
// Given the student is logged into the system
// When the student navigates to the Resume Manager page
// And creates a resume from scratch
// And selects Download PDF from Quick Actions
// Then the resume should download successfully
// And the file should be saved in the download-data folder
*/
  
  const studentName = generateStudentName();
  resumesToDelete.push(studentName);

  await resumeManagerPage.navigateToResumeManager();
  await resumeManagerPage.verifyPageLoaded();

  await resumeManagerPage.startResumeFromScratch();

  await resumeManagerPage.fillContactInfo(
    studentName,
    'john@test.com',
    '1112223333',
    'Boston MA'
  );

  await resumeManagerPage.addWorkExperience(
    'QA Engineer',
    'Tech Company',
    '2026-01-12',
    'Present'
  );

  await resumeManagerPage.addEducation(
    'State University',
    'Bachelor of Science in Computer Science',
    '2025-01-01',
    true
  );

  await resumeManagerPage.finishResumeCreation();

  await resumeManagerPage.verifyResumeCreated(studentName);

  await resumeManagerPage.downloadResume(studentName);

});


test('Student deletes a resume',{tag: '@smoke'}, async ({ page }) => {
/*
// Scenario: Student deletes an existing resume
//
// Given the student is logged into the system
// When the student navigates to the Resume Manager page
// And creates a resume from scratch
// And deletes the resume using Quick Actions
// Then the resume should be removed from the Resume Manager list
*/

  const studentName = generateStudentName();

  await resumeManagerPage.navigateToResumeManager();
  await resumeManagerPage.verifyPageLoaded();

  await resumeManagerPage.startResumeFromScratch();

  await resumeManagerPage.fillContactInfo(
    studentName,
    'john@test.com',
    '1112223333',
    'Boston MA'
  );

  await resumeManagerPage.addWorkExperience(
    'QA Engineer',
    'Tech Company',
    '2026-01-12',
    'Present'
  );

  await resumeManagerPage.addEducation(
    'State University',
    'Bachelor of Science in Computer Science',
    '2025-01-01',
    true
  );

  await resumeManagerPage.finishResumeCreation();

  await resumeManagerPage.verifyResumeCreated(studentName);

  await resumeManagerPage.deleteResume(studentName);

  await resumeManagerPage.verifyResumeDeleted(studentName);

});

});