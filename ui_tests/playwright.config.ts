import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true, // Run in headless mode for CI/CD
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [['html', { open: 'never' }]],
});
