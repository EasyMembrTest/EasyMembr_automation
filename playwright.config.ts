// @ts-check
import { defineConfig, devices } from '@playwright/test';
import path from 'path';





/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
function getTimestamp() {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
}

const timestamp = getTimestamp();
const reportDir = path.join('D:/Reports', timestamp);

export default defineConfig({
  testDir: './tests',
 //testDir: './',
//  testIgnore: [
//     'tests/TransactionsValidations.spec.ts', // ignore originals
    
//   ],
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: [['html', { outputFolder: 'D:/Reports/playwright-report', open: 'never' }]],
    reporter: [['html', { outputFolder: reportDir, open: 'never' }]],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    screenshot: 'on', // Take screenshots for all tests (pass and fail)
    trace: 'off',
    video: 'off',
    baseURL: '',
    actionTimeout: 0,
    launchOptions: {},
    
  },
  timeout: 60000,
globalTeardown: require.resolve('./globalTeardown.js'),
 
  

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'EasyMembr',
      use: { channel: 'chrome', headless: false }
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

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
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

