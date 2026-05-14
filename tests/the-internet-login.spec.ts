import { test, expect } from '@playwright/test';

test('user log in with valid credentials', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/secure/);
  await expect(page.getByText('You logged into a secure area!')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});

test('user cannot log in with invalid password', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Password' }).fill('WrongPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/login/);
  await expect(page.locator('#flash')).toContainText('Your password is invalid!');
});

test('user cannot log in with invalid username', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('wrong_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/login/);
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});