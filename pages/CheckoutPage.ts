import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  }

  async continueCheckout() {
    await this.page.locator('[data-test="continue"]').click();
  }

  async finishCheckout() {
    await this.page.locator('[data-test="finish"]').click();
  }

  async verifyCheckoutOverviewVisible() {
    await expect(this.page.getByText('Checkout: Overview')).toBeVisible();
  }

  async verifyOrderComplete() {
    await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
  }

  getErrorMessage() {
    return this.page.locator('[data-test="error"]');
  }
}