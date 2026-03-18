// import { defineConfig } from '@playwright/test';

// export default defineConfig({
//   use: {
//     headless: true, // Run in headless mode for CI/CD
//     screenshot: 'only-on-failure',
//     video: 'retain-on-failure',
//   },
//   reporter: [['html', { open: 'never' }]],
// });

import { chromium, defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: 2,
  workers: undefined,
  timeout: 100000,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // Use the HTML reporter to create a report file that outputs to the playwright-report directory by default
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "https://stage.tripleten.percruit.com",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-all-retries",

    headless: false,

    testIdAttribute: "data-tt-tour",

    video: "off",

    screenshot: "on",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"]
      }
    },

    {
      name: "firefox",
       use: {
        ...devices["Desktop Firefox"]
      }
    },

    {
      name: "webkit",
       use: {
        ...devices["Desktop Safari"]
      }
    },
  ],
});
