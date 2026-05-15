import { Page } from '@playwright/test';

export class TheInternetLoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  async login(username: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

getFlashMessage() {
    return this.page.locator('#flash');
  }
}