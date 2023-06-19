import { expect, Locator, Page } from '@playwright/test';
import environment from '../../environments';

export class MainMenuPage {
  readonly page: Page;
  readonly userAvatar: Locator;
  readonly logOutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userAvatar = page.getByRole('img').nth(1);
    this.logOutLink = page.getByRole('link', { name: 'Log out' });
  }

  async logOut() {
    await this.userAvatar.click();
    await this.logOutLink.click();
  }
}
