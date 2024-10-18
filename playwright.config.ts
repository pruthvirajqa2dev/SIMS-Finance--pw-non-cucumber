import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
const dotenv = require("dotenv");
const defaultEnv = "uat";
if (process.env.test_env) {
    dotenv.config({
        path: `${__dirname}//src//config//.env.${process.env.test_env}`,
        override: true
    });
} else {
    dotenv.config({
        path: `${__dirname}//src//config//.env.${defaultEnv}`,
        override: true
    });
}
// if (!process.env.NODE_ENV) {
//     require("dotenv").config({ path: `${__dirname}//src//config//.env` });
// } else {
//     require("dotenv").config({
//         path: `${__dirname}//src//config//${process.env.NODE_ENV}.env`
//     });
// }
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    timeout: 20 * 1000,
    testDir: "./src/tests",
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 1 : 1,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: process.env.CI ? "blob" : "html",
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: `${process.env.URL}`,
        video: "on",
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
        screenshot: "on"
    },
    // globalSetup: `src//utils//globalSetup.ts`,
    /* Configure projects for major browsers */
    projects: [
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                viewport: { width: 1266, height: 586 }
            }
        },

        {
            name: "firefox",
            use: {
                ...devices["Desktop Firefox"],
                viewport: { width: 1280, height: 595 }
            }
        }

        // {
        //     name: "webkit",
        //     use: {
        //         ...devices["Desktop Safari"],
        //         viewport: { width: 1920, height: 1080 }
        //     }
        // }

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
    ]

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
