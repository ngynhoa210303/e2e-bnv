import { BasePageComponent } from '../../base.pageComponent';

export default class UnitFormComponent extends BasePageComponent {
    readonly txt_unitInformation_unitCode = this.getFieldByLabel('Mã đơn vị');
    readonly error_msg_unitInformation_unitCode = this.getErrorMsgByLabel('Mã đơn vị');
    readonly txt_unitInformation_name = this.getFieldByLabel('Tên đơn vị');
    readonly error_msg_unitInformation_name = this.getErrorMsgByLabel('Tên đơn vị');
    readonly txt_unitInformation_unitLevel = this.getSelectByLabel('Cấp đơn vị');
    readonly txt_unitInformation_unitType = this.getSelectByLabel('Loại đơn vị');
    readonly error_msg_unitInformation_unitType = this.getErrorMsgByLabel('Loại đơn vị');
    readonly txt_unitInformation_termOfOffice = this.getSelectByLabel('Nhiệm kỳ');
    readonly error_msg_unitInformation_termOfOffice = this.getErrorMsgByLabel('Nhiệm kỳ');
    readonly txt_unitInformation_directUnit = this.getSelectByLabel('Đơn vị cha quản lý trực tiếp');
    readonly error_msg_unitInformation_directUnit = this.getErrorMsgByLabel('Đơn vị cha quản lý trực tiếp');
    readonly txt_unitInformation_status = this.getSelectByLabel('Trạng thái');
    readonly txt_administrativeBoundaryInfo_name = this.getFieldByLabel('Tên đơn vị địa giới hành chính');
    readonly txt_administrativeBoundaryInfo_code = this.getFieldByLabel('Mã đơn vị địa giới hành chính');
    readonly txt_administrativeBoundaryInfo_provinceCity = this.getSelectByLabel('Tỉnh/Thành phố');
    readonly txt_administrativeBoundaryInfo_communeWardSpecialZone = this.getSelectByLabel('Xã/Phường/Đặc khu');
}