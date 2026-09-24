import { BasePageComponent } from '../base.pageComponent';

export default class NavBar extends BasePageComponent {
  readonly menu = {
    home: this.page.locator("//div[@id='0-Trang_chủ']"),
    administrative_boundary: {
      administrative_boundary_menu: this.page.locator("//div[@id='8-Địa_giới_hành_chính']"),
      administrative_boundary_list: this.page.locator("//span[text()='Danh sách địa giới hành chính']"),
      administrative_boundary_data_entry: this.page.locator("//span[text()='Nhập liệu hồ sơ địa giới hành chính']"),
    },

    local_government: {
      local_government_menu: this.page.locator("//div[@id='9-Chính_quyền_địa_phương']"),
      local_government_list: this.page.locator("//span[text()='Danh sách chính quyền địa phương']"),
      local_government_data_entry: this.page.locator("//span[text()='Nhập liệu hồ sơ chính quyền địa phương']"),
    },

    reports: this.page.locator("//div[@id='10-Báo_cáo']"),

    configuration: {
      configuration_menu: this.page.locator("//div[@id='21-Cấu_hình']"),
      functionCategory_menu: this.page.locator("//span[text()='Danh mục chức năng']"),
      function_category: {
        functionCategory_unit: this.page.locator("//div[@class='nav-panel-list']//span[text()='Đơn vị']"),
        functionCategory_user: this.page.locator("//div[@class='nav-panel-list']//span[text()='Người dùng']"),
        functionCategory_jobTitlePosition: this.page.locator("//div[@class='nav-panel-list']//span[text()='Chức danh, chức vụ']"),
        functionCategory_ethnicity: this.page.locator("//div[@class='nav-panel-list']//span[text()='Dân tộc']"),
        functionCategory_religion: this.page.locator("//div[@class='nav-panel-list']//span[text()='Tôn giáo']"),
        functionCategory_professionalQualification: this.page.locator("//div[@class='nav-panel-list']//span[text()='Trình độ chuyên môn"),
        functionCategory_generalEducationLevel: this.page.locator("//div[@class='nav-panel-list']//span[text()='Trình độ phổ thông']"),
        functionCategory_politicalTheoryLevel: this.page.locator("//div[@class='nav-panel-list']//span[text()='Trình độ lý luận chính trị']"),
        functionCategory_languageProficiency: this.page.locator("//div[@class='nav-panel-list']//span[text()='Trình độ ngoại ngữ']"),
        functionCategory_computerSkillLevel: this.page.locator("//div[@class='nav-panel-list']//span[text()='Trình độ tin học']"),
        functionCategory_specificFactor: this.page.locator("//div[@class='nav-panel-list']//span[text()='Yếu tố đặc thù']"),
        functionCategory_administrativeUnitType: this.page.locator("//div[@class='nav-panel-list']//span[text()='Loại hình ĐVHC']"),
        functionCategory_administrativeUnitNature: this.page.locator("//div[@class='nav-panel-list']//span[text()='Tính chất ĐVHC']"),
        functionCategory_termOfOffice: this.page.locator("//div[@class='nav-panel-list']//span[text()='Nhiệm kỳ']"),
        functionCategory_urbanType: this.page.locator("//div[@class='nav-panel-list']//span[text()='Nhiệm kỳ']"),
        functionCategory_localityType: this.page.locator("//div[@class='nav-panel-list']//span[text()='Nhiệm kỳ']"),
        functionCategory_region: this.page.locator("//div[@class='nav-panel-list']//span[text()='Nhiệm kỳ']"),
        functionCategory_area: this.page.locator("//div[@class='nav-panel-list']//span[text()='Nhiệm kỳ']"),
      },
      permissionManagement_menu: this.page.locator("//span[text()='Quản lý phân quyền']"),
      permission_management: {
        permissionManagement_permissionGroup: this.page.locator("//div[@class='nav-panel-list']//span[text()='Nhóm quyền']"),
        permissionManagement_permission: this.page.locator("//div[@class='nav-panel-list']//span[text()='Quyền']"),
        permissionManagement_role: this.page.locator("//div[@class='nav-panel-list']//span[text()='Vai trò']"),
      }
    }
  };

  readonly userAvatar = this.page.locator("//div[contains(@class,'d-flex flex-column')]/following-sibling::div[1]");
  readonly notifications = this.page.locator("//div[contains(@class,'p-toast p-component')]/following-sibling::button[1]");

  readonly userAvatar_dropdown = {
    instructions: this.page.locator("(//li[@role='menuitem']//div)[1]"),
    information: this.page.locator("(//li[@role='menuitem']//div)[2]"),
    change_password: this.page.locator("(//li[@role='menuitem']//div)[3]"),
    logout: this.page.locator("(//li[@role='menuitem']//div)[4]"),
  };

}
