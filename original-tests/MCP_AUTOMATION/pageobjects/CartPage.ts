import { Page } from '@playwright/test';

export class CartPage {
    private page: Page;

    // Locators
    private readonly checkoutButton = '#checkout';

    constructor(page: Page) {
        this.page = page;
    }

    async clickCheckout() {
        await this.page.click(this.checkoutButton);
    }
} 