import { expect } from 'playwright/test';
import { BasePage } from '../../base.page';
import AddUnitPopup from '../../components/unitComponents/addUnitPopup';
import EditUnitPopup from '../../components/unitComponents/editUnitPopup';
import UnitFormComponent from '../../components/unitComponents/unitFormComponent';

export default class UnitPage extends BasePage {
  readonly btn_addUnit = this.page.locator("//button[@aria-label='Thêm đơn vị']");
  readonly txt_unitInformation_unitName = this.getFieldByLabel('Tên đơn vị');
  readonly txt_unitInformation_unitCode = this.getFieldByLabel('Mã đơn vị');
  readonly txt_unitInformation_unitLevel = this.getFieldByLabel('Cấp đơn vị');
  readonly txt_unitInformation_unitType = this.getFieldByLabel('Loại đơn vị');
  readonly txt_unitInformation_termOfOffice = this.getFieldByLabel('Nhiệm kỳ');
  readonly txt_unitInformation_directUnit = this.getFieldByLabel('Đơn vị trực tiếp');
  readonly txt_unitInformation_status = this.getFieldByLabel("Trạng thái");

  readonly txt_administrativeBoundaryInfo_name = this.getFieldByLabel('Tên đơn vị địa giới hành chính');
  readonly txt_administrativeBoundaryInfo_code = this.getFieldByLabel('Mã đơn vị địa giới hành chính');
  readonly txt_administrativeBoundaryInfo_provinceCity = this.getFieldByLabel('Tỉnh/Thành phố');
  readonly txt_administrativeBoundaryInfo_communeWardSpecialZone = this.getFieldByLabel('Xã/Phường/Đặc khu');
  readonly txt_searchUnit = this.page.locator("//input[@placeholder='Tìm kiếm']");

  async open() {
    await super.open('/config/cqdp-category/don-vi');
  }
  async openUnitTCBM() {
    await super.open('/config/tc-bo-may-category/don-vi');
  }
  async openRoleTCBM() {
    await super.open('/config/role-manager/role');
  }

  get addUnitPopup() {
    return new AddUnitPopup(this.page);
  }

  get editUnitPopup() {
    return new EditUnitPopup(this.page);
  }

  get unitForm() {
    return new UnitFormComponent(this.page);
  }

  async isExpanded(unitName: string): Promise<boolean> {
    const icon = this.page.locator(`//li[@aria-label=${unitName}]//img[1]`);
    return await icon.getAttribute('alt') === 'down';
  }

  async expandNode(unitName: string): Promise<void> {
    if (!(await this.isExpanded(unitName))) {
      const icon = this.page.locator(
        `//li[@aria-label="${unitName}"]//img[1]`
      );

      await icon.click();
    }
  }

  async collapseNode(unitName: string): Promise<void> {
    if (await this.isExpanded(unitName)) {
      const icon = this.page.locator(
        `//li[@aria-label="${unitName}"]//img[1]`
      );

      await icon.click();
    }
  }

  async selectIconExpandNode(nodeName: string): Promise<void> {
    const node = this.page.locator(`//li[@aria-label="${nodeName}"]`);
    await node.click();
  }

  public getUnitNode(unitName: string) {
    return this.page.locator("div[data-pc-section='content']").filter({
      has: this.page.locator("div.font-14-400", { hasText: unitName })
    }).first();
  }

  async selectUnit(unitName: string) {
    const unit = this.getUnitNode(unitName);

    if (await unit.getAttribute('data-p-highlight') === 'false') {
      await unit.click();
    }
  }

  async unselectUnit(unitName: string) {
    const unit = this.getUnitNode(unitName);

    if (await unit.getAttribute('data-p-highlight') === 'true') {
      await unit.click();
    }
  }
}
