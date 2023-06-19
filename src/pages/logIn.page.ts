import { expect, Locator, Page } from '@playwright/test';
import environment from '../../environments';

export class LogInPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly logInButton: Locator;
  readonly credentialsError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('john.doe@email.com');
    this.passwordInput = page.getByPlaceholder('Enter password');
    this.logInButton = page.getByRole('button', { name: 'Log in' });
    this.credentialsError = page.getByText('Invalid Email or password.');
  }

  async openPage() {
    await this.page.goto(environment.baseUrl);
  }

  async logIn(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.logInButton.click();
  }

  async checkPageLoaded() {
    expect (await this.emailInput.isVisible()).toBeTruthy();
    expect (await this.passwordInput.isEditable()).toBeTruthy();
  }

  async checkCredentialsError() {
    expect (await this.credentialsError.isVisible()).toBeTruthy();
  }
}
