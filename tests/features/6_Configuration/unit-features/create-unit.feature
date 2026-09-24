Feature: Quản lý đơn vị - Thêm mới đơn vị

  Background:
    Given user is logged in as admin
    And user is on the "Quản lý đơn vị" page

  @unit @smoke @parent1
  Scenario: Đảm bảo cây đơn vị tồn tại đầy đủ theo quan hệ cha con
    Given the following unit hierarchy exists:
      | unitName           | unitCode | unitLevel            | unitType          | parentUnit         | unitClassifyType | termOfOffice         |
      | Tỉnh Autotest A    | ATo001   | Bộ Nội Vụ            | Đơn vị hành chính | Chính phủ          | Là đơn vị        | Nhiệm kỳ 2031 - 2036 |
      | HĐND Autotest B    | ATo002   | HĐND Tỉnh            | Đơn vị hành chính | Tỉnh Autotest A    | Là đơn vị        | Nhiệm kỳ 2031 - 2036 |
      | HĐND Xã Autotest C | ATo003   | Đơn vị thuộc HĐND Xã | Đơn vị hành chính | HĐND Autotest B    | Là đơn vị        | Nhiệm kỳ 2031 - 2036 |
      | Ban Autotest D     | ATo004   | Đơn vị thuộc HĐND Xã | Đơn vị hành chính | HĐND Xã Autotest C | Là đơn vị        | Nhiệm kỳ 2031 - 2036 |
    Then all units should exist with the correct parent relationships
      | unitName           | unitCode | unitLevel            | unitType          | parentUnit         | unitClassifyType | termOfOffice         |
      | Tỉnh Autotest A    | ATo001   | Bộ Nội Vụ            | Đơn vị hành chính | Chính phủ          | Là đơn vị        | Nhiệm kỳ 2031 - 2036 |
      | HĐND Autotest B    | ATo002   | HĐND Tỉnh            | Đơn vị hành chính | Tỉnh Autotest A    | Là đơn vị        | Nhiệm kỳ 2031 - 2036 |
      | HĐND Xã Autotest C | ATo003   | Đơn vị thuộc HĐND Xã | Đơn vị hành chính | HĐND Autotest B    | Là đơn vị        | Nhiệm kỳ 2031 - 2036 |
      | Ban Autotest D     | ATo004   | Đơn vị thuộc HĐND Xã | Đơn vị hành chính | HĐND Xã Autotest C | Là đơn vị        | Nhiệm kỳ 2031 - 2036 |

  @unit @smoke @positive
  Scenario: Thêm mới đơn vị là cấp con trực tiếp của "<parentUnit>" thành công với đầy đủ thông tin hợp lệ
    Given unit with code "<unitCode>" does not already exist
    And user clicks the "Thêm đơn vị" button
    And user enters unit name "<unitName>"
    And user enters unit code "<unitCode>"
    And user selects unit level "<unitLevel>"
    And user selects unit type "<unitType>"
    And user selects parent unit "<parentUnit>"
    And user selects unit classify type "<unitClassifyType>"
    And user selects term of office "<termOfOffice>"
    And user enters administrative boundary name "<administrativeBoundaryName>"
    And user enters administrative boundary code "<administrativeBoundaryCode>"
    And user selects administrative boundary province, city "<administrativeBoundaryProvinceCity>"
    And user selects administrative boundary commune, ward, special zone "<administrativeBoundaryCommuneWardSpecialZone>"
    And user clicks the Save button
    Then user should see a toast success message "Thêm dữ liệu thành công"
    And the new unit "<unitName>" should appear in the unit list

    Examples:
      | unitName        | unitCode | unitLevel | unitType          | parentUnit | unitClassifyType | termOfOffice         | administrativeBoundaryName | administrativeBoundaryCode | administrativeBoundaryProvinceCity | administrativeBoundaryCommuneWardSpecialZone |
      | Tỉnh Autotest 2 | AT002    | Bộ Nội Vụ | Đơn vị hành chính | Chính phủ  | Là đơn vị        | Nhiệm kỳ 2031 - 2036 | DGHC Autotest              | DGHC Autotest              | Thành phố Hà Nội                   | Phường Ngọc Hà                               |
#   # ===== NEGATIVE CASES - Validation =====

  @unit @negative @validation
  Scenario Outline: Để trống từng trường bắt buộc
    Given user clicks the "Thêm đơn vị" button
    And user enters unit code "<unitCode>"
    And user enters unit name "<unitName>"
    And user selects unit type "<unitType>"
    And user selects parent unit "<parentUnit>"
    And user selects term of office "<termOfOffice>"
    And user clicks the Save button
    Then user should see an error message "Trường không được để trống!" below the text field "<fieldName>"

    Examples:
      | unitName        | unitCode | unitType          | parentUnit | termOfOffice         | fieldName   |
      |                 | AT002    | Đơn vị hành chính | Chính phủ  | Nhiệm kỳ 2031 - 2036 | Tên đơn vị  |
      | Tỉnh Autotest 2 |          | Đơn vị hành chính | Chính phủ  | Nhiệm kỳ 2031 - 2036 | Mã đơn vị   |
      | Tỉnh Autotest 2 | AT002    |                   | Chính phủ  | Nhiệm kỳ 2031 - 2036 | Loại đơn vị |
      | Tỉnh Autotest 2 | AT002    | Đơn vị hành chính |            | Nhiệm kỳ 2031 - 2036 | Đơn vị cha  |
      | Tỉnh Autotest 2 | AT002    | Đơn vị hành chính | Chính phủ  |                      | Nhiệm kỳ    |
#   # ===== NEGATIVE CASES - Duplicate =====

  @unit @negative @double
  Scenario: Trùng mã đơn vị đã tồn tại
    Given a unit with code "<unitCode>" already exists
    And user clicks the "Thêm đơn vị" button
    And user enters unit code "<unitCode>"
    And user enters unit name "<unitName>"
    And user selects unit level "<unitLevel>"
    And user selects unit type "<unitType>"
    And user selects parent unit "<parentUnit>"
    And user selects unit classify type "<unitClassifyType>"
    And user selects term of office "<termOfOffice>"
    And user enters administrative boundary name "<administrativeBoundaryName>"
    And user enters administrative boundary code "<administrativeBoundaryCode>"
    And user selects administrative boundary province, city "<administrativeBoundaryProvinceCity>"
    And user selects administrative boundary commune, ward, special zone "<administrativeBoundaryCommuneWardSpecialZone>"
    And user clicks the Save button
    Then user should see an toast message "Mã đơn vị đã tồn tại"
    And the unit "<unitName>" with code "<unitCode>" should not be created

    Examples:
      | unitName        | unitCode | unitLevel | unitType          | parentUnit | unitClassifyType | termOfOffice         | administrativeBoundaryName | administrativeBoundaryCode | administrativeBoundaryProvinceCity | administrativeBoundaryCommuneWardSpecialZone |
      | Tỉnh Autotest 5 | AT005    | Bộ Nội Vụ | Đơn vị hành chính | Chính phủ  | Là đơn vị        | Nhiệm kỳ 2031 - 2036 | DGHC Autotest              | DGHC Autotest              | Thành phố Hà Nội                   | Phường Ngọc Hà                               |
#   # ===== EDGE CASES =====

  @unit @edge-case @test
  Scenario Outline: Tên/mã đơn vị chứa ký tự vượt giới hạn
    Given user clicks the "Thêm đơn vị" button
    When user enters random unit data
    And user clicks the Save button
    Then user should see an error message "Không quá 100 ký tự" below the text field "Mã đơn vị"
    And user should see an error message "Không quá 255 ký tự" below the text field "Tên đơn vị"
#   # ===== CANCEL / NAVIGATION =====

  @unit @negative
  Scenario: Hủy Thêm đơn vị
    Given user clicks the "Thêm đơn vị" button
    When user enters unit name "<unitName>"
    And user enters unit code "<unitCode>"
    And user clicks the Cancel button
    Then user should return to the unit list page
    And the unit "<unitName>" with code "<unitCode>" should not be created

    Examples:
      | unitName        | unitCode |
      | Tỉnh Autotest 2 | AT002    |
