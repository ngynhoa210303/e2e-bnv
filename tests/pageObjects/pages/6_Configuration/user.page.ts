import { BasePage } from '../../base.page';

export default class UserPage extends BasePage {
  readonly txt_searchAll = this.page.locator("//input[@placeholder='Tìm kiếm']");
  readonly txt_searchUnit = this.page.locator("//input[@placeholder='Nhập đơn vị']");
  readonly select_filterStatus = this.page.locator("//div[@aria-label='Chọn trạng thái']");
  readonly btn_actions_edit = this.page.locator("//tbody//td[8]//span[1]"); // all nút edit
  readonly btn_actions_reset = this.page.locator("//tbody//td[8]//i[1]"); // all nút reset đăng nhập ban đầu
  readonly btn_actions_resetPassword = this.page.locator("//tbody//td[8]//span[2]"); // all nút edit
  readonly btn_actions_delete = this.page.locator("//tbody//td[8]//i[2]"); // all nút delete

  async open() {
    await super.open('/nguoi-dung/');
  }
}
