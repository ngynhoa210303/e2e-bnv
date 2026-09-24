import { BasePageComponent } from '../../base.pageComponent';

export default class UnitFormComponent extends BasePageComponent {
    readonly txt_fullName = this.getFieldByLabel('Họ và tên');
    readonly txt_username = this.getFieldByLabel('Tài khoản');
    readonly txt_search_unit = this.getFieldByLabel('Đơn vị');
    readonly select_role = this.getSelectByLabel('Vai trò');
    readonly txt_userCode = this.getFieldByLabel('Mã người dùng');
    readonly txt_dateOfBirth = this.getFieldByLabel('Ngày sinh');
    readonly txt_phoneNumber = this.getFieldByLabel('Số điện thoại');
    readonly select_gender = this.getSelectByLabel('Giới tính');
    readonly txt_ID = this.getFieldByLabel('CMT/CCCD');
    readonly txt_issueDate = this.getFieldByLabel('Ngày cấp');
    readonly txt_email = this.getFieldByLabel('Email');
    readonly txt_address = this.getFieldByLabel('Địa chỉ');
    readonly select_province = this.getSelectByLabel('Tỉnh/Thành phố');
    readonly select_ward = this.getSelectByLabel('Xã/Phường/Đặc khu');
    readonly select_status = this.getSelectByLabel('Trạng thái');
    readonly btn_avatar = this.page.locator("//input[@type='file']/following-sibling::button[1]");
    readonly cb_isAdmin = this.page.locator("//span[text()='Là quản trị hệ thống']//preceding::div[2]//input");
}