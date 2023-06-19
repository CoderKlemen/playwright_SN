import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /** Reporter to use. See https://playwright.dev/docs/test-reporters 
    * Possible values for reporters are
    * - list
    * - json
    * - html
    * - ...
    * 
    * Possible values for open are:
    * - always
    * - on-failure
    * - never
    */
  reporter: [['html', { open: 'on-failure' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: process.env.CI_ENVIRONMENT_URL || environment.baseUrl,
    // baseURL: process.env.CI ? 'http://localhost:3000' : environment.baseUrl,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  expect: {
    timeout: 15000,
    // Are these setting even observed??? So far does not look like it..
    toMatchSnapshot: {
      threshold: 0.2,
      maxDiffPixels: 100,
      maxDiffPixelRatio: 0.2,
    },
  },

  /** Default test timeout. */
  timeout: 120000,

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          slowMo: 1000, // a 1000ms pause before each operation
        },
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'chromium-headed',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          // list of Chrome arguments: https://peter.sh/experiments/chromium-command-line-switches/
          args: ['--start-maximized'],
          headless: false,
          slowMo: 1000, // a 1000ms pause before each operation
        },
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        launchOptions: {
          slowMo: 1000, // a 1000ms pause before each operation
        },
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'chrome-headed',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        launchOptions: {
          // list of Chrome arguments: https://peter.sh/experiments/chromium-command-line-switches/
          args: ['--start-maximized'],
          headless: false,
          slowMo: 1000, // a 1000ms pause before each operation
        },
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: {
          slowMo: 1000, // a 1000ms pause before each operation
        },
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'firefox-headed',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: {
          headless: false,
          slowMo: 1000, // a 1000ms pause before each operation
        },
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        launchOptions: {
          slowMo: 1000, // a 1000ms pause before each operation
        },
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'webkit-headed',
      use: {
        ...devices['Desktop Safari'],
        launchOptions: {
          headless: false,
          slowMo: 1000, // a 1000ms pause before each operation
        },
        viewport: { width: 1920, height: 1080 },
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
