import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('user can add item to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const inventoryPage = new InventoryPage(page);

  await inventoryPage.addFirstItemToCart();
  await inventoryPage.verifyCartBadgeCount('1');
  await inventoryPage.openCart();
  await inventoryPage.verifyItemVisible('Sauce Labs Backpack');
});