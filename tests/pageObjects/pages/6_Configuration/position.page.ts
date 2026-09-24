import { BasePage } from '../../base.page';

export default class PositionPage extends BasePage {
    readonly txt_searchAll = this.page.locator("//input[@placeholder='Tìm kiếm']");
    readonly select_filterStatus = this.page.locator("//div[@aria-label='Chọn trạng thái']");
    readonly btn_actions_edit = this.page.locator("//tbody//td[7]//span[1]"); // all nút edit
    readonly btn_actions_delete = this.page.locator("//tbody//td[7]//span[2]"); // all nút delete

    async open() {
        await super.open('/config/cqdp-category/chuc-danh-chuc-vu/');
    }

}
