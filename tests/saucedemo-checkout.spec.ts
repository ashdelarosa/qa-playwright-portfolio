import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loginAsStandardUser } from '../utils/login';
import { InventoryPage } from '../pages/InventoryPage';

let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  inventoryPage = new InventoryPage(page);

  await inventoryPage.addFirstItemToCart();
  await inventoryPage.openCart();

  await page.getByRole('button', { name: 'Checkout' }).click();
});

test('user can complete checkout successfully', async ({ page }) => {
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
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.locator('[data-test="error"]')).toContainText(
    'Error: First Name is required'
  );

  await expect(page).toHaveURL(/checkout-step-one/);
});

test('user cannot continue checkout without last name', async ({ page }) => {
  await page.getByPlaceholder('First Name').fill('Ash');
  await page.getByPlaceholder('Zip/Postal Code').fill('1234');

  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.locator('[data-test="error"]')).toContainText(
    'Error: Last Name is required'
  );

  await expect(page).toHaveURL(/checkout-step-one/);
});

test('user cannot continue checkout without postal code', async ({ page }) => {
  await page.getByPlaceholder('First Name').fill('Ash');
  await page.getByPlaceholder('Last Name').fill('dela Rosa');

  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.locator('[data-test="error"]')).toContainText(
    'Error: Postal Code is required'
  );

  await expect(page).toHaveURL(/checkout-step-one/);
});