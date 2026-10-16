Feature: Quản lý đơn vị - Thêm mới đơn vị

  Background:
    Given user is logged in as admin
    And user is on the "Quản lý đơn vị" page
    And Setup data for search test case
      | unitCode | unitName          | unitLevel | unitType          | parentUnit | unitClassifyType | termOfOffice         | administrativeBoundaryName | administrativeBoundaryCode | administrativeBoundaryProvinceCity | administrativeBoundaryCommuneWardSpecialZone |
      | AT001    | Tỉnh Autotest [1] | Tỉnh      | Đơn vị hành chính | Chính phủ  | Là đơn vị        | Nhiệm kỳ 2025 - 2030 | DGHC Autotest              | DGHC Autotest              | Thành phố Hà Nội                   | Phường Ngọc Hà                               |

  @unit @search @smoke
  Scenario: Tìm kiếm đơn vị theo tên
    And user enters "Tỉnh Autotest [1]" in the search box
    And user clicks the "Tìm kiếm" button
    Then the search results should contain the searched unit
#   @unit @search @smoke
#   Scenario: Tìm kiếm đơn vị theo mã
#     And user enters "AT001" in the search box
#     And user clicks the "Tìm kiếm" button
#     Then the search results should contain a unit with code "AT001" and name "Tỉnh Autotest [1]"
#   @unit @search
#   Scenario: Tìm kiếm đơn vị với từ khóa không tồn tại
#     And user enters "Tukhoakhongtontai123" in the search box
#     And user clicks the "Tìm kiếm" button
#     Then the search results should be empty
#   @unit @search
#   Scenario: Tìm kiếm đơn vị theo một phần tên
#     And user enters "Tỉnh Autotest" in the search box
#     And user clicks the "Tìm kiếm" button
#     Then the search results should contain a unit with code "AT001" and name "Tỉnh Autotest [1]"
#   @unit @search @smoke
#   Scenario: Xóa từ khóa tìm kiếm và hiển thị lại toàn bộ cây đơn vị
#     And user enters "AT001" in the search box
#     And user clicks the "Tìm kiếm" button
#     And user clears the search box
#     And user clicks the "Tìm kiếm" button
#     Then the search results should display the entire unit tree
