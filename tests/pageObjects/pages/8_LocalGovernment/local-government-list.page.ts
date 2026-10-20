import { expect } from '@playwright/test';
import { BasePage } from '../../base.page';

export default class LocalGovernmentListPage extends BasePage {
    readonly txt_search = this.page.locator("//input[@placeholder='Tìm kiếm']");

    async open() {
        await super.open('/chinh-quyen-dia-phuong/danh-sach/');
    }

    async navigateFromMenu() {
        await this.navBar.menu.local_government.local_government_menu.click();
        await this.navBar.menu.local_government.local_government_list.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async searchLocalGovernment(keyword: string) {
        await this.txt_search.fill(keyword);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
    }

    async clickDetailIcon(localName: string) {
        const detailIcon = this.page.locator(`//tr[td[normalize-space()='${localName}']][1]//i[@title='Xem chi tiết']`);
        await detailIcon.waitFor({ state: 'visible', timeout: 10000 });
        await detailIcon.click();
    }
}

