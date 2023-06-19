import { expect, Locator, Page } from '@playwright/test';
import environment from '../../environments';

export class ProjectsPage {
  readonly page: Page;
  readonly newProjectButton: Locator;
  readonly newProjectDialogHeading: Locator;
  readonly newProjectDialogInput: Locator;
  readonly newProjectDialogCreateButton: Locator;
  readonly projectsCreatedProject: Locator;
  readonly projectsContainer: Locator;
  readonly projectsContainerCard: Locator;
  readonly projectsSideNavBarLink: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.newProjectButton = page.getByText('New Project', {exact: true});
    this.newProjectDialogHeading = page.getByRole('heading', { name: 'Create new project' });
    this.newProjectDialogInput = page.getByPlaceholder('My project');
    this.newProjectDialogCreateButton = page.getByRole('button', { name: 'Create' });
    this.projectsCreatedProject = page.locator('#sidebar-wrapper').getByRole('link', { name: 'Playwright project #1' });
    this.projectsContainer = page.locator('#cardsWrapper');
    // this.projectsContainerCard = this.projectsContainer.locator('project-card');
    // this.projectsContainerCard = page.locator('div.card.project-card');
    // this.projectsContainerCard = page.locator('#cardsWrapper div').filter({ hasText: 'Playwright project #' });
    this.projectsContainerCard = page.locator('#cardsWrapper div').getByTitle('Playwright project #');
    this.projectsSideNavBarLink = page.getByRole('link', { name: 'Projects' });
  }

  async navigateToProjects() {
    await this.projectsSideNavBarLink.click();
  }

  async checkProjectsLoaded() {
    expect (await this.newProjectButton.isVisible()).toBeTruthy();
  }

  async findNumberOfExistingProjects() {
    const numberOfProjects = (await this.projectsContainerCard.all()).length;
    console.log(numberOfProjects);
    for(let i=0; i < numberOfProjects; i++) {
      console.log(await this.projectsContainerCard.nth(i).innerText());
    }
    // console.log(await this.projectsContainerCard.all());
    return numberOfProjects;
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
      console.log(await this.projectsContainerCard.nth(i).innerText());
      if (await this.projectsContainerCard.nth(i).innerText() === `Playwright project #${projectNumber}`) {
        return true
      }
    }
    return false;
  }

}
