import { test } from '@playwright/test';
import { LogInPage } from '@/pages/logIn.page';
import environment from '../../environments';
import { DashboardPage } from '@/pages/dashboard.page';
import { MainMenuPage } from '@/pages/mainMenu.page';

test('Login using valid credentials', async ({page}) => {
    const testLogIn = new LogInPage(page);
    const testDashboard = new DashboardPage(page);
    const testMainMenu = new MainMenuPage(page);

    await testLogIn.openPage();
    await testLogIn.checkPageLoaded();
    await testLogIn.logIn(environment.username, environment.pass);
    
    await testDashboard.checkDashboardLoaded();
    await testDashboard.checkSuccessfulLoginMessage();

    await testMainMenu.logOut();
    await testLogIn.checkPageLoaded();
})

test('Login with invalid password',async ({page}) => {
    const testLogIn = new LogInPage(page);
    const testDashboard = new DashboardPage(page);

    await testLogIn.openPage();
    await testLogIn.logIn(environment.username, 'bad-pass');
    
    await testLogIn.checkCredentialsError();
})

test('Login with invalid email',async ({page}) => {
    const testLogIn = new LogInPage(page);
    const testDashboard = new DashboardPage(page);

    await testLogIn.openPage();
    await testLogIn.logIn('bademail@email.com', environment.pass);
    
    await testLogIn.checkCredentialsError();
})