import { test, expect } from '@playwright/test';
import { TheInternetLoginPage } from '../pages/TheInternetLoginPage';

test('user log in with valid credentials', async ({ page }) => {
    const loginPage = new TheInternetLoginPage(page);

    await loginPage.goto();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    await expect(page).toHaveURL(/secure/);
    await expect(page.getByText('You logged into a secure area!')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});

test('user cannot log in with invalid password', async ({ page }) => {
    const loginPage = new TheInternetLoginPage(page);

    await loginPage.goto();
    await loginPage.login('tomsmith', 'WrongPassword!');

    await expect(page).toHaveURL(/login/);
    await expect(loginPage.getFlashMessage()).toContainText('Your password is invalid!');
});

test('user cannot log in with invalid username', async ({ page }) => {
    const loginPage = new TheInternetLoginPage(page);

    await loginPage.goto();
    await loginPage.login('wrong_user', 'SuperSecretPassword!');

    await expect(page).toHaveURL(/login/);
    await expect(loginPage.getFlashMessage()).toContainText('Your username is invalid!');
});