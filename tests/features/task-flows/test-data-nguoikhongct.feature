Feature: Đếm số lượng người không chuyên trách thuộc UBND

  Background:
    Given user is logged in as admin

  @nkct @trinhdo-nkct
  Scenario Outline: Thống kê số lượng người không chuyên trách theo dropdown tại thôn
    When user is on the "Danh sách chính quyền địa phương" page
    And user searches for local government "<localGovernmentName>"
    And user clicks view detail icon for local government "<localGovernmentName>"
    Then user should see the local government detail information
    When user clicks category "<categoryName>" in detail page
    Then user counts delegates by dropdown "<dropdownField>" in village "<villageName>" without percentage on "<categoryName>" for local government "<localGovernmentName>"

    Examples:
      | localGovernmentName    | categoryName                                          | villageName              | dropdownField              |
      | UBND Phường Hà Giang 1 | Người hoạt động không chuyên trách ở thôn, tổ dân phố | Tổ dân phố 05            | Trình độ lý luận chính trị |
      | UBND Phường Hà Giang 1 | Người hoạt động không chuyên trách ở thôn, tổ dân phố | Tổ dân phố 07            | Trình độ chuyên môn        |
      | UBND Phường Hà Giang 1 | Người hoạt động không chuyên trách ở thôn, tổ dân phố | Tổ dân phố 12 - Khuổi My | Trình độ chuyên môn        |
      | UBND Phường Hà Giang 1 | Người hoạt động không chuyên trách ở thôn, tổ dân phố | Tổ dân phố 12 - Khuổi My | Trình độ lý luận chính trị |
      | UBND Xã Phú Linh       | Người hoạt động không chuyên trách ở thôn, tổ dân phố | Thôn Bản Noong           | Trình độ chuyên môn        |
      | UBND Xã Phú Linh       | Người hoạt động không chuyên trách ở thôn, tổ dân phố | Thôn Bản Noong           | Trình độ lý luận chính trị |

  @nkct @age-nkct
  Scenario Outline: Thống kê số lượng người không chuyên trách theo nhóm độ tuổi tại thôn
    When user is on the "Danh sách chính quyền địa phương" page
    And user searches for local government "<localGovernmentName>"
    And user clicks view detail icon for local government "<localGovernmentName>"
    Then user should see the local government detail information
    When user clicks category "<categoryName>" in detail page
    Then user counts delegates by age group in village "<villageName>" on "<categoryName>" for local government "<localGovernmentName>"

    Examples:
      | localGovernmentName | categoryName                                          | villageName |
      | UBND Xã Nghĩa Thuận | Người hoạt động không chuyên trách ở thôn, tổ dân phố | Na Cho Cai  |

  @nkct @condition-nkct
  Scenario Outline: Đếm số lượng người không chuyên trách theo điều kiện linh hoạt (giới tính hoặc checkbox) tại thôn
    When user is on the "Danh sách chính quyền địa phương" page
    And user searches for local government "<localGovernmentName>"
    And user clicks view detail icon for local government "<localGovernmentName>"
    Then user should see the local government detail information
    When user clicks category "<categoryName>" in detail page
    Then user counts delegates with condition "<condition>" in village "<villageName>" on "<categoryName>" for local government "<localGovernmentName>"

    Examples:
      | localGovernmentName | categoryName                                          | villageName | condition        |
      | UBND Xã Lũng Cú     | Người hoạt động không chuyên trách ở thôn, tổ dân phố | Lô Lô Chải  | Nữ               |
      | UBND Xã Lũng Cú     | Người hoạt động không chuyên trách ở thôn, tổ dân phố | Lô Lô Chải  | Là Đảng viên     |
      | UBND Xã Lũng Cú     | Người hoạt động không chuyên trách ở thôn, tổ dân phố | Lô Lô Chải  | Dân tộc thiểu số |
      | UBND Xã Lũng Cú     | Người hoạt động không chuyên trách ở thôn, tổ dân phố | Lô Lô Chải  | Tôn giáo         |
