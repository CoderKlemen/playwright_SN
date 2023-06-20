import { test } from '@playwright/test';
import { LogInPage } from '@/pages/logIn.page';
import environment from '../../environments';
import { DashboardPage } from '@/pages/dashboard.page';
import { MainMenuPage } from '@/pages/mainMenu.page';
import { ProjectsPage } from '@/pages/projects.page';

test('Create a project, @project', async ({page}) => {
    const testLogIn = new LogInPage(page);
    const testDashboard = new DashboardPage(page);
    const testProjects = new ProjectsPage(page);
    const testMainMenu = new MainMenuPage(page);

    await testLogIn.openPage();
    await testLogIn.logIn(environment.username, environment.pass);
    
    await testDashboard.checkDashboardLoaded();

    await testProjects.navigateToProjects();
    await testProjects.checkProjectsLoaded();

    await testProjects.projectCreation();

    await testMainMenu.logOut();
    await testLogIn.checkPageLoaded();
})

test('Create an experiment, @experiment', async ({page}) => {
    const testLogIn = new LogInPage(page);
    const testDashboard = new DashboardPage(page);
    const testProjects = new ProjectsPage(page);
    const testMainMenu = new MainMenuPage(page);

    await testLogIn.openPage();
    await testLogIn.logIn(environment.username, environment.pass);
    
    await testDashboard.checkDashboardLoaded();

    await testProjects.navigateToProjects();
    await testProjects.checkProjectsLoaded();

    await testProjects.experimentCreation();

    await testMainMenu.logOut();
    await testLogIn.checkPageLoaded();
})

test('Try to create a project with invalid title, @invalid', async ({page}) => {
    const testLogIn = new LogInPage(page);
    const testDashboard = new DashboardPage(page);
    const testProjects = new ProjectsPage(page);
    const testMainMenu = new MainMenuPage(page);

    await testLogIn.openPage();
    await testLogIn.logIn(environment.username, environment.pass);

    await testDashboard.checkDashboardLoaded();
    
    await testProjects.navigateToProjects();
    await testProjects.checkProjectsLoaded();

    await testProjects.createNewProjectInvalidTitle('Templates');
    await testProjects.checkProjectTitleDuplicateErrorDisplayed();
    await testProjects.closeNewProjectDialog();

    await testProjects.createNewProjectInvalidTitle('a');
    await testProjects.checkProjectTitleTooShortErrorDisplayed();
    await testProjects.closeNewProjectDialog();

    await testMainMenu.logOut();
    await testLogIn.checkPageLoaded();
})