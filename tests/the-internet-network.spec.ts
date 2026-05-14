import { test, expect } from '@playwright/test';

test('successful login returns expected network responses', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    

    const responseAuthenticate = page.waitForResponse(response =>
        response.url().includes('/authenticate') && response.status() === 303
            && response.request().method() === 'POST'
    );

    const responseSecure = page.waitForResponse(response =>
        response.url().includes('/secure') && response.status() === 200
    );

    await page.getByRole('button', { name: 'Login' }).click();

    const authResponse = await responseAuthenticate;
    expect(authResponse.status()).toBe(303);
    expect(authResponse.request().method()).toBe('POST');
    expect(authResponse.url()).toContain('/authenticate');

    const secureResponse = await responseSecure;
    expect(secureResponse.status()).toBe(200);
    expect(secureResponse.request().method()).toBe('GET');
    expect(secureResponse.url()).toContain('/secure');
});