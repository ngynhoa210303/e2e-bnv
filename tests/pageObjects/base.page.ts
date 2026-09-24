import { type Page } from '@playwright/test';
import NavBar from './components/navBar';
import AllowCookiesPopup from './components/allowCookiesPopup';
import Filter from './components/filter';
import ChangePassword from './components/changePasswordPopup';
import dotenv from 'dotenv';

dotenv.config();

export abstract class BasePage {
  public baseUrl = process.env.BASE_URL || 'https://bonoivu-test.elcomlab.com';

  constructor(public readonly page: Page) { }

  get toast_message() {
    return this.page.locator("//div[@role='alert']//span[contains(@class,'p-toast-summary')]");
  }

  get navBar() { return new NavBar(this.page); }
  get cookiePopup() { return new AllowCookiesPopup(this.page); }
  get filter() { return new Filter(this.page); }
  get changePassword() { return new ChangePassword(this.page); }

  async open(path: string) {
    await this.page.goto(this.baseUrl + path, { waitUntil: 'domcontentloaded' });
  }

  async close() {
    await this.page.close();
  }
  readonly getFieldByLabel = (label: string) =>
    this.page.locator(
      `(//div[contains(.,'${label}')]/following-sibling::div)[1]//input`
    );

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async pause_test() {
    await this.page.pause();
  }

  async reload_page() {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }
  async clickButton(buttonName: string) {
    await this.page.locator(`[aria-label="${buttonName}"]`).click();
  }
}
