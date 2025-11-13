 import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { MentorDashboardPage } from '../../../src/pages/mentor/MentorDashboardPage';

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  const context = await this.browser.newContext();
  this.page = await context.newPage();
});

Given('the admin user is logged into the Percruit website', async function () {
  const loginPage = new LoginPage(this.page);

  const base = process.env.BASE_URL || 'http://localhost:3000';
  await this.page.goto(`${base}/login`);

  const email = process.env.ADMIN_EMAIL || 'yellowgemstudiollc+admin1@gmail.com';
  const pwd = process.env.ADMIN_PASSWORD || 'Lala1234!';

  await loginPage.login(email, pwd);

  this.mentorsPage = new MentorDashboardPage(this.page);
});

When('the admin user views the mentors list', async function () {
  await this.mentorsPage.openMentorsList();
});

Then('the mentor list should be displayed', async function () {
  if (!(await this.mentorsPage.isMentorListVisible())) {
    throw new Error('Mentor list not visible');
  }
});

Then('each mentor should have their name', async function () {
  const name = await this.mentorsPage.getFirstMentorName();
  if (!name) throw new Error('No mentor name found');
});

Then('the total count of mentors should be displayed at the top of the list visible', async function () {
  const heading = await this.mentorsPage.getMentorCountHeading();
  if (!heading.match(/Mentors\s*\(\d+\)/)) {
    throw new Error('Mentor count heading not visible');
  }
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});
