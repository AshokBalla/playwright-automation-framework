import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { InventoryPage } from '../pageobjects/InventoryPage';
import { CartPage } from '../pageobjects/CartPage';
import { CheckoutPage } from '../pageobjects/CheckoutPage';

test('Complete purchase flow on Sauce Demo', async ({ page }) => {
    // Initialize page objects
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1: Navigate to the website
    await loginPage.navigateToLoginPage();

    // Step 2: Login
    await loginPage.login('standard_user', 'secret_sauce');

    // Step 3: Add Sauce Labs Backpack to cart
    await inventoryPage.addBackpackToCart();

    // Step 4: Open the cart
    await inventoryPage.openCart();

    // Step 5: Click on Checkout
    await cartPage.clickCheckout();

    // Step 6: Fill checkout information with random data
    const firstName = `Test${Math.floor(Math.random() * 1000)}`;
    const lastName = `User${Math.floor(Math.random() * 1000)}`;
    const zipCode = `${Math.floor(Math.random() * 90000) + 10000}`;
    await checkoutPage.fillCheckoutInfo(firstName, lastName, zipCode);

    // Step 7: Click Continue
    await checkoutPage.clickContinue();

    // Step 8: Click Finish
    await checkoutPage.clickFinish();

    // Step 9: Verify thank you message
    const thankYouMessage = await checkoutPage.getThankYouMessage();
    expect(thankYouMessage).toBe('Thank you for your order!');
}); 