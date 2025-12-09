import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { StudentDashboard } from '../../../src/pages/student/IndustryNewsPage';

let loginPage: LoginPage;
let StudentDashboard
Before(async function() {
  loginPage = new LoginPage(this.page);
  StudentDashboard = new StudentDashboard(this.page);
});
