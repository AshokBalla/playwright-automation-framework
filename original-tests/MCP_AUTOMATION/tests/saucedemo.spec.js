const { test } = require('@playwright/test');
const { SauceDemoPage } = require('../pageobjects/SauceDemoPage');

function randomString(length) {
  return Math.random().toString(36).substring(2, 2 + length);
}

test('SauceDemo E2E Order Flow', async ({ page }) => {
  const saucedemo = new SauceDemoPage(page);
  await saucedemo.goto();
  await saucedemo.login('standard_user', 'secret_sauce');
  await saucedemo.addBackpackToCart();
  await saucedemo.openCart();
  await saucedemo.checkout();
  await saucedemo.fillCheckoutInfo(randomString(6), randomString(8), randomString(5));
  await saucedemo.continueCheckout();
  await saucedemo.finishOrder();
  await saucedemo.verifyOrderComplete();
});
