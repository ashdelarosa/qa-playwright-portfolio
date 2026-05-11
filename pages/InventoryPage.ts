import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addFirstItemToCart() {
    await this.page.getByRole('button', { name: 'Add to cart' }).first().click();
  }

  async openCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async verifyCartBadgeCount(count: string) {
    await expect(this.page.locator('.shopping_cart_badge')).toHaveText(count);
  }

  async verifyItemVisible(itemName: string) {
    await expect(this.page.getByText(itemName)).toBeVisible();
  }
}