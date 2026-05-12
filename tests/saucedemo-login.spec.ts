import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('user can log in with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText('Products')).toBeVisible();
  });
 
  test('user cannot log in with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
  
    await loginPage.goto();
    await loginPage.login('standard_user', 'wrong_password');
  
    await expect(loginPage.getErrorMessage()).toBeVisible();
  });

  test('user cannot log in when account is locked out', async ({ page }) => {
    const loginPage = new LoginPage(page);
  
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
  
    await expect(loginPage.getErrorMessage()).toContainText(
      'Sorry, this user has been locked out.'
    );
  });
