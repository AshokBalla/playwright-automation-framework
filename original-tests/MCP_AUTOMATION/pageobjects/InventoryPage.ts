import { Page } from '@playwright/test';

export class InventoryPage {
    private page: Page;

    // Locators
    private readonly backpackAddToCartButton = '#add-to-cart-sauce-labs-backpack';
    private readonly cartLink = '.shopping_cart_link';

    constructor(page: Page) {
        this.page = page;
    }

    async addBackpackToCart() {
        await this.page.click(this.backpackAddToCartButton);
    }

    async openCart() {
        await this.page.click(this.cartLink);
    }
} 