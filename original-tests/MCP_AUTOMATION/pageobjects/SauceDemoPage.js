import { expect } from '@playwright/test';

export class SauceDemoPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.addToCartButton = page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.checkoutButton = page.locator('button[data-test="checkout"]');
    this.firstNameInput = page.locator('input[data-test="firstName"]');
    this.lastNameInput = page.locator('input[data-test="lastName"]');
    this.zipInput = page.locator('input[data-test="postalCode"]');
    this.continueButton = page.locator('input[data-test="continue"]');
    this.finishButton = page.locator('button[data-test="finish"]');
    this.orderCompleteText = page.locator('.complete-header');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async addBackpackToCart() {
    await this.addToCartButton.click();
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async fillCheckoutInfo(firstName, lastName, zip) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipInput.fill(zip);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async verifyOrderComplete() {
    await expect(this.orderCompleteText).toHaveText('Thank you for your order!');
  }
}
