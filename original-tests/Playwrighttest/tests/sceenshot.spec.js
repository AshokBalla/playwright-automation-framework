const { test, expect } = require('@playwright/test');

test('@QW Security test request intercept', async ({ page }) => {
    const email = "anshika@gmail.com"; // Define the email variable

    // Login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');

    // Take a screenshot
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
});