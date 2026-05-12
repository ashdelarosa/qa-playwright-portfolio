import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

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
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.fillCheckoutInfo('Ash', 'dela Rosa', '1234');
  await checkoutPage.continueCheckout();
  await checkoutPage.verifyCheckoutOverviewVisible();
  await checkoutPage.finishCheckout();
  await checkoutPage.verifyOrderComplete();
});

test('user cannot continue checkout with empty required fields', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.fillCheckoutInfo('', 'dela Rosa', '1234');
  await checkoutPage.continueCheckout();
  await expect(checkoutPage.getErrorMessage()).toContainText('Error: First Name is required');

  await expect(page).toHaveURL(/checkout-step-one/);
});

test('user cannot continue checkout without last name', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.fillCheckoutInfo('Ash', '', '1234');
  await checkoutPage.continueCheckout();

  await expect(checkoutPage.getErrorMessage()).toContainText('Error: Last Name is required');

  await expect(page).toHaveURL(/checkout-step-one/);
});

test('user cannot continue checkout without postal code', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.fillCheckoutInfo('Ash', 'dela Rosa', '');
  await checkoutPage.continueCheckout();

  await expect(checkoutPage.getErrorMessage()).toContainText('Error: Postal Code is required');

  await expect(page).toHaveURL(/checkout-step-one/);
});