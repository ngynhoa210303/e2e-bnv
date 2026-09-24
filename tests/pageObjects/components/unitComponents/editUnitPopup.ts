import { BasePageComponent } from '../../base.pageComponent';

export default class EditUnitPopup extends BasePageComponent {
    async selectUnitType(type: string) {
        await this.page.locator(`//div[@data-pc-name='dialog']//label[contains(.,'${type}')]//parent::div//input`).check();
    }
    async chooseItem(name: string) {
        await this.page.locator(`//li[@aria-label='${name}' and @role='option']`).click();
    }
    async chooseParentUnit(name: string) {
        await this.page.locator(`//li[@role='option']//div[text()='${name}']`).click();
    }
}