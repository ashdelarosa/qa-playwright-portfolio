import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from '../utils/login';
import { LoginPage } from '../pages/LoginPage';

test('user can log in with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText('Products')).toBeVisible();
  });
 
  test('user cannot log in with invalid password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();
  
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('user cannot log in when account is locked out', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
  
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Sorry, this user has been locked out.'
    );
  });
