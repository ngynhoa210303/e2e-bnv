import { BasePageComponent } from '../../base.pageComponent';
import UnitFormComponent from './unitFormComponent';

export default class AddUnitPopup extends BasePageComponent {

    async selectUnitType(type: string) {
        await this.page.locator(`//div[@data-pc-name='dialog']//label[contains(.,'${type}')]//parent::div//input`).check();
    }
    async chooseItem(name: string) {
        await this.page.locator(`//li[@aria-label='${name}' and @role='option']`).click();
    }
    async chooseParentUnit(name: string) {
        await this.page.locator(`//li[@role='option']//div[text()='${name}']`).click();
    }
    get unitForm() {
        return new UnitFormComponent(this.page);
    }
    async fillUnitForm(unitData: any) {
        if (unitData.unitCode) {
            await this.unitForm.txt_unitInformation_unitCode.fill(unitData.unitCode);
            await this.unitForm.txt_unitInformation_unitCode.blur();
        }
        if (unitData.unitName) {
            await this.unitForm.txt_unitInformation_name.fill(unitData.unitName);
            await this.unitForm.txt_unitInformation_name.blur();
        }
        if (unitData.unitLevel) {
            await this.unitForm.txt_unitInformation_unitLevel.click();
            await this.unitForm.txt_searchItemInDropdown.fill(unitData.unitLevel);
            await this.page.waitForTimeout(100);
            await this.chooseItem(unitData.unitLevel);
        }
        if (unitData.unitType) {
            await this.unitForm.txt_unitInformation_unitType.blur();
            if (unitData.unitType.trim()) {
                await this.unitForm.txt_unitInformation_unitType.click();
                await this.chooseItem(unitData.unitType);
            }
        }
        if (unitData.parentUnit) {
            if (unitData.parentUnit.trim()) {
                await this.unitForm.txt_unitInformation_directUnit.click();
                await this.unitForm.txt_unitInformation_directUnit.pressSequentially(unitData.parentUnit);
                await this.chooseParentUnit(unitData.parentUnit);
            }
        }
        if (unitData.unitClassifyType) {
            await this.selectUnitType(unitData.unitClassifyType);
        }
        if (unitData.termOfOffice) {
            await this.unitForm.txt_unitInformation_termOfOffice.click();
            await this.unitForm.txt_searchItemInDropdown.fill(unitData.termOfOffice);
            await this.page.waitForTimeout(100);
            await this.chooseItem(unitData.termOfOffice);
        }
    }
}