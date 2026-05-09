import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from '../utils/login';

test('user can complete checkout successfully', async ({ page }) => {
  await loginAsStandardUser(page);

  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await page.locator('.shopping_cart_link').click();

  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.getByPlaceholder('First Name').fill('Ash');
  await page.getByPlaceholder('Last Name').fill('dela Rosa');
  await page.getByPlaceholder('Zip/Postal Code').fill('1234');

  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByText('Checkout: Overview')).toBeVisible();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  await page.getByRole('button', { name: 'Finish' }).click();

  await expect(page.getByText('Thank you for your order!')).toBeVisible();
});

test('user cannot continue checkout with empty required fields', async ({ page }) => {
  await loginAsStandardUser(page);

  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.locator('.shopping_cart_link').click();

  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.locator('[data-test="error"]')).toContainText(
    'Error: First Name is required'
  );

  await expect(page).toHaveURL(/checkout-step-one/);
});