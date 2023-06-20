import { expect, Locator, Page } from '@playwright/test';

export class ProjectsPage {
  readonly page: Page;
  readonly newProjectButton: Locator;
  readonly newProjectDialogHeading: Locator;
  readonly newProjectDialogInput: Locator;
  readonly newProjectDialogCreateButton: Locator;
  readonly newProjectDialogCancelButton: Locator;
  readonly projectsContainer: Locator;
  readonly projectsContainerCards: Locator;
  readonly projectsSideNavBarLink: Locator;
  readonly newExperimentButton: Locator;
  readonly newExperimentDialogInput: Locator;
  readonly newExperimentDialogCreateButton: Locator;
  readonly experimentContainerCard: Locator;
  readonly projectTitleTooShortError: Locator;
  readonly projectTitleDuplicateError: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.newProjectButton = page.getByText('New Project', {exact: true});
    this.newProjectDialogHeading = page.getByRole('heading', { name: 'Create new project' });
    this.newProjectDialogInput = page.getByPlaceholder('My project');
    this.newProjectDialogCreateButton = page.getByRole('button', { name: 'Create' });
    this.newProjectDialogCancelButton = page.getByRole('button', { name: 'Cancel' });
    this.projectsContainer = page.locator('#cardsWrapper');
    this.projectsContainerCards = page.locator('#cardsWrapper div').getByTitle('Playwright project #');
    this.projectsSideNavBarLink = page.getByRole('link', { name: 'Projects' });
    this.newExperimentButton = page.getByRole('button', { name: 'New experiment' });
    this.newExperimentDialogInput = page.getByPlaceholder('My experiment');
    this.newExperimentDialogCreateButton = page.getByRole('button', { name: 'Create' });
    this.experimentContainerCard = page.locator('#cardsWrapper div').getByTitle('Playwright experiment #');
    this.projectTitleTooShortError = page.getByText('is too short (minimum is 2 characters).')
    this.projectTitleDuplicateError = page.getByText('This project name has to be unique inside a team (this includes the archive).')
  }

  async navigateToProjects() {
    await this.projectsSideNavBarLink.click();
  }

  async checkProjectsLoaded() {
    expect (await this.newProjectButton.isVisible()).toBeTruthy();
  }

  async findNumberOfExistingProjects() {
    return (await this.projectsContainerCards.all()).length;
  }

  async projectCreation() {
    const projectNumber = await this.findNumberOfExistingProjects() + 1;
    await this.createNewProject(projectNumber);
    expect (await this.checkProjectCreated(projectNumber)).toBeTruthy();
  }

  async createNewProject(projectNumber: number) {
    await this.newProjectButton.click();
    await this.newProjectDialogInput.fill(`Playwright project #${projectNumber}`);
    await this.newProjectDialogCreateButton.click();
  }

  async checkProjectCreated(projectNumber: number) {
    for (let i=0; i < projectNumber; i++) {
      if (await this.projectsContainerCards.nth(i).innerText() === `Playwright project #${projectNumber}`) {
        return true
      }
    }
    return false;
  }

  async createNewProjectInvalidTitle(projectTitle: string) {
    await this.newProjectButton.click();
    await this.newProjectDialogInput.fill(projectTitle);
    await this.newProjectDialogCreateButton.click();
  }

  async checkProjectTitleTooShortErrorDisplayed() {
    expect(await this.projectTitleTooShortError.isVisible()).toBeTruthy();
  }

  async checkProjectTitleDuplicateErrorDisplayed() {
    expect(await this.projectTitleDuplicateError.isVisible()).toBeTruthy();
  }

  async closeNewProjectDialog() {
    await this.newProjectDialogCancelButton.click();
  }

  async experimentCreation() {
    const projectNumber = await this.findNumberOfExistingProjects();

    await this.openLatestproject(projectNumber);
    await this.checkProjectOpened();

    const experimentNumber = await this.findNumberOfExistingExperiments();

    await this.createNewExperiment(experimentNumber);
    await this.checkExperimentCreated(experimentNumber);
  }

  async openLatestproject(projectNumber: number) {
    for (let i=0; i < projectNumber; i++) {
      if (await this.projectsContainerCards.nth(i).innerText() === `Playwright project #${projectNumber}`) {
        await this.projectsContainerCards.nth(i).click();
        break;
      }
    }
  }

  async checkProjectOpened() {
    expect (await this.newExperimentButton.isVisible()).toBeTruthy();
  }

  async findNumberOfExistingExperiments() {
    return (await this.experimentContainerCard.all()).length;
  }

  async createNewExperiment(experimentNumber: number) {
    if (experimentNumber === 0) {
      experimentNumber += 1;
    }

    await this.newExperimentButton.click();
    await this.newExperimentDialogInput.fill(`Playwright experiment #${experimentNumber}`);
    await this.newExperimentDialogCreateButton.click();
  }

  async checkExperimentCreated(experimentNumber: number) {
    for (let i=0; i < experimentNumber; i++) {
      if (await this.experimentContainerCard.nth(i).innerText() === `Playwright experiment #${experimentNumber}`) {
        return true
      }
    }
    return false;
  }
}
