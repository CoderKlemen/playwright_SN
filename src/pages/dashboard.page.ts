import { expect, Locator, Page } from '@playwright/test';
import environment from '../../environments';

export class DashboardPage {
  readonly page: Page;
  readonly newTaskButton: Locator;
  readonly successfullLoginMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTaskButton = page.getByText('New task', {exact: true});
    this.successfullLoginMessage = page.getByText('Logged in successfully.');
  }

  async checkDashboardLoaded() {
    expect (await this.newTaskButton.isVisible()).toBeTruthy();
  }

  async checkSuccessfulLoginMessage() {
    expect (await this.successfullLoginMessage.isVisible()).toBeTruthy();
  }
}
