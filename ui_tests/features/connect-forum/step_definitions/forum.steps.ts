import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { ForumPage } from '../../../src/pages/student/ForumPage';

let loginPage: LoginPage;
let forumPage: ForumPage;

Before(async function(this: { page: Page }) {
  loginPage = new LoginPage(this.page);
  forumPage = new ForumPage(this.page);
});