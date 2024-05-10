import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Directory where tests are located
  testDir: './tests',
  // Use test timeout of 30 seconds
  timeout: 30000,

  // Reporter configuration
  reporter: [
    ['html'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false
    }],
    ['line']
  ],

  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
        ignoreHttpsErrors: true,
        permissions: ['geolocation'],
        trace: 'on'
      },
    },
    {
      name: 'Desktop Firefox',
      use: {
        browserName: 'firefox',
        headless: true,
      },
    },
    {
      name: 'Desktop Safari',
      use: {
        browserName: 'webkit',
        headless: true,
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
      },
    },
  ],

  // Specify the test files to be executed (include basics folder)
  testMatch: ['**/basics/*.spec.js', '**/tests/*.spec.js'],
  screenshot: 'on',
  video: 'on',
  trace: 'on',
  // Use the default browser context
});