import { chromium } from 'playwright';
import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { logins } from '../../pageobjects/Loginpage.js';

// Set a global timeout for all steps
setDefaultTimeout(120000);

Given("I am on the login page", async function () {
    try {
        console.log("Starting login process...");
        await logins('Admin', 'Qedge123!@#');
        console.log("Login step completed successfully");
    } catch (error) {
        console.error("Error in login step:", error);
        // No need to throw the error again as it will be automatically propagated
    }
});

Given("login invalid credentials", async function () {
    try {
        console.log("Starting invalid login process...");

        // Launch browser
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();

        // Navigate to login page
        console.log("Navigating to login page...");
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Wait for the login form to be visible
        console.log("Waiting for login form to be visible...");
        await page.waitForSelector('input[name="username"]', { timeout: 10000 });

        // Fill in invalid credentials
        console.log("Filling in invalid credentials...");
        await page.fill('input[name="username"]', 'Admin');
        await page.fill('input[name="password"]', 'WrongPassword123!');

        // Click login button
        console.log("Clicking login button...");
        await page.click('button[type="submit"]');

        // Verify error message appears
        console.log("Checking for error message...");
        const errorMessage = await page.waitForSelector('.oxd-alert-content-text', { timeout: 5000 });
        const errorText = await errorMessage.textContent();
        console.log(`Error message displayed: ${errorText}`);

        // Take screenshot of error
        await page.screenshot({ path: 'login-error.png' });
        console.log("Login error screenshot captured as login-error.png");

        // Close browser
        await browser.close();
        console.log("Browser closed successfully");

    } catch (error) {
        console.error("Error in invalid login step:", error);
        throw error; // Propagate the error to fail the test
    }
});