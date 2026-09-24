import { BasePageComponent } from '../../base.pageComponent';

export default class PositionFormComponent extends BasePageComponent {
    readonly txt_positionName = this.getFieldByLabel('Tên chức danh, chức vụ');
    readonly txt_positionCode = this.getFieldByLabel('Mã chức danh, chức vụ');
    readonly select_unitType = this.getSelectByLabel('Phân loại');
    readonly select_status = this.getSelectByLabel('Trạng thái');
    readonly select_applyTo = this.getSelectByLabel('Áp dụng cho');
}