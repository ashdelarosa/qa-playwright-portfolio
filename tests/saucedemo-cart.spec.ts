import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from '../utils/login';
import { InventoryPage } from '../pages/InventoryPage';

test('user can add item to cart', async ({ page }) => {
  await loginAsStandardUser(page);

  const inventoryPage = new InventoryPage(page);

  await inventoryPage.addFirstItemToCart();
  await inventoryPage.verifyCartBadgeCount('1');
  await inventoryPage.openCart();
  await inventoryPage.verifyItemVisible('Sauce Labs Backpack');
});