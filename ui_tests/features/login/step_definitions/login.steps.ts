import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';

import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { StudentDashboardPage } from '../../../src/pages/student/StudentDashboardPage';

let page: Page;
let browser: Browser;
let loginPage: LoginPage;
let studentDashboardPage: StudentDashboardPage

Before(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
});

After(async () => {
  await browser.close();
});

Given('I am on the Percruit homepage', async () => {
  await page.goto(env.getBaseUrl());
  loginPage = new LoginPage(page);
  studentDashboardPage =  new StudentDashboardPage(page);
});

When(
  'I enter correct Student email and password and click on sign in button',
  async () => {
    await loginPage.loginAsStudent();
  }
);

Then('I should be on the page that says Hello', async () => {
  await expect(page.getByRole('heading', { name: 'Hello,' })).toBeVisible();
  await expect(page).toHaveURL(/dashboard/);
});

Then('I should be able to see the Career Diary', async () => {
  const isVisible = await studentDashboardPage.isCareerDiaryWidgetVisible();
  expect(isVisible).toBeTruthy();
});
