import { Page } from '@playwright/test';

export class CheckoutPage {
    private page: Page;

    // Locators
    private readonly firstNameInput = '#first-name';
    private readonly lastNameInput = '#last-name';
    private readonly zipCodeInput = '#postal-code';
    private readonly continueButton = '#continue';
    private readonly finishButton = '#finish';
    private readonly thankYouMessage = '.complete-header';

    constructor(page: Page) {
        this.page = page;
    }

    async fillCheckoutInfo(firstName: string, lastName: string, zipCode: string) {
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.zipCodeInput, zipCode);
    }

    async clickContinue() {
        await this.page.click(this.continueButton);
    }

    async clickFinish() {
        await this.page.click(this.finishButton);
    }

    async getThankYouMessage() {
        return await this.page.textContent(this.thankYouMessage);
    }
} 