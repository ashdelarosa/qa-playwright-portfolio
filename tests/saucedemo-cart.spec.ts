import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from '../utils/login';

test('user can add item to cart', async ({ page }) => {
  await loginAsStandardUser(page);

  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await page.locator('.shopping_cart_link').click();

  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
});