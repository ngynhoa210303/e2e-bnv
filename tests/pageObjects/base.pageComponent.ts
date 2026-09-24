import { type Page, type Locator } from '@playwright/test';

export abstract class BasePageComponent {
  /**
   * @param page Playwright Page instance
   * @param root (Optional) Locator gốc bao bọc toàn bộ component này.
   */
  constructor(public readonly page: Page, public readonly root?: Locator) { }

  get btn_cancel() {
    return this.page.locator("//button[@class='close-btn p-button p-component']");
  }
  get btn_yes() {
    return this.page.locator("//button[@type='submit']");
  }
  get btn_close() {
    return this.page.locator("//button[@data-pc-section='closebutton']");
  }
  get txt_searchItemInDropdown() {
    return this.page.locator("//input[@data-pc-section='filterinput']");
  }
  readonly getFieldByLabel = (label: string) =>
    this.page.locator(
      `(//div[@data-pc-name='dialog']//label[contains(normalize-space(.),'${label}')]/..//input)[1]`
    );
  readonly getErrorMsgByLabel = (label: string) =>
    this.page.locator(
      `(//div[@data-pc-name='dialog']//label[contains(.,'${label}')]/..//small)[1]`
    );
  readonly getSelectByLabel = (label: string) =>
    this.page.locator(
      `(//div[@data-pc-name='dialog']//label[contains(normalize-space(.),'${label}')]/..//div)[1]`
    );
  protected locator(selector: string): Locator {
    return this.root ? this.root.locator(selector) : this.page.locator(selector);
  }

  // Chờ component hiển thị
  async waitForVisible() {
    if (this.root) await this.root.waitFor({ state: 'visible' });
  }

  // Chờ component biến mất
  async waitForHidden() {
    if (this.root) await this.root.waitFor({ state: 'hidden' });
  }
}
