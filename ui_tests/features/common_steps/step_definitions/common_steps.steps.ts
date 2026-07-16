// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';

// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../../src/config/world';
import { LoginPage } from '../../../src/pages/common/LoginPage';
import { StudentDashboardPage } from '../../../src/pages/student/StudentDashboardPage';

// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let studentDashboardPage: StudentDashboardPage;


When(/I write (.+) to the log/, function(stringToLog: string)
{
  console.log(stringToLog);
});

When(/I add the title (.+) to the log/, function(stringToLog: string)
{
  console.log(" ");
  console.log("*********************************")
  console.log(stringToLog);
});