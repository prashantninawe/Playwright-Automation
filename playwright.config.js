// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',

  /* Max time a test can run for */
  timeout: 30*1000,
  expect: {
    timeout: 5000
  },

  reporter: 'html',

  use: {
    browserName : 'chromium',
    headless : true,
    viewport: { width: 1920, height: 1080 },
    launchOptions: {
      args: ['--start-maximized']
    },
    screenshot : 'on',
    trace : 'retain-on-failure'

  },
});

module.exports = config