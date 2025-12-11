// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';
import {ForumPage } from '../../../../src/pages/student/ForumPage';

// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let forumPage: ForumPage;

// Before hook: Launch a new browser and page before each scenario and initialize page objects
Before(async function() {
  loginPage = new LoginPage(this.page);
  forumPage= new ForumPage(this.page);
});

Given('the student is on the "Forum" page', async function () {
  this.forumPage = new ForumPage(this.page);
  await this.forumPage.open();
});

When('the student clicks the "New Post" button', async function () {
  await this.forumPage.clickNewPost();
});

When('the student clicks the "Cancel" button', async function () {
  await this.forumPage.clickCancel();
});

Then('the user should be redirected back to the "Forums" page', async function () {
  await this.forumPage.isOnForumsPage();
});

