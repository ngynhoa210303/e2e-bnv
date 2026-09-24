import { Page } from '@playwright/test';
import HomePage from './pages/1_Home/home.page';
import LoginPage from './pages/login.page';
import UnitPage from './pages/6_Configuration/unit.page';
import UserPage from './pages/6_Configuration/user.page';

export class PageManager {
    constructor(private page: Page) { }

    get homePage() { return new HomePage(this.page); }
    get loginPage() { return new LoginPage(this.page); }
    get unitPage() { return new UnitPage(this.page); }
    get userPage() { return new UserPage(this.page); }
}
