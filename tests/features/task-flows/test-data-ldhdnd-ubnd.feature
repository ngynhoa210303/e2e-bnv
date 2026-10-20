Feature: Đếm số lượng lãnh đạo cơ quan HĐND và UBND các cấp theo đơn vị hành chính

  Background:
    Given user is logged in as admin

  @ldcq @checkbox-ldcq
  Scenario Outline: Đếm <checkboxName> của <localGovernmentName>
    When user is on the "Danh sách chính quyền địa phương" page
    And user searches for local government "<localGovernmentName>"
    And user clicks view detail icon for local government "<localGovernmentName>"
    Then user should see the local government detail information
    When user clicks category "<categoryName>" in detail page
    Then user counts delegates with checkbox "<checkboxName>" on "<categoryName>" for local government "<localGovernmentName>"

    Examples:
      | localGovernmentName       | categoryName     | checkboxName        |
      | HĐND Xã Sín Thầu          | Lãnh đạo cơ quan | Vị trí kiêm nhiệm   |
      | HĐND Phường Điện Biên Phủ | Lãnh đạo cơ quan | Vị trí kiêm nhiệm   |
      | HĐND Phường Điện Biên Phủ | Lãnh đạo cơ quan | Dân tộc thiểu số    |
      | HĐND Xã Sín Thầu          | Lãnh đạo cơ quan | Dân tộc thiểu số    |
      | HĐND Phường Điện Biên Phủ | Lãnh đạo cơ quan | Là Đảng viên        |
      | HĐND Xã Sín Thầu          | Lãnh đạo cơ quan | Là Đảng viên        |
      | HĐND Phường Điện Biên Phủ | Lãnh đạo cơ quan | Tôn giáo            |
      | HĐND Xã Sín Thầu          | Lãnh đạo cơ quan | Tôn giáo            |
      | HĐND Phường Điện Biên Phủ | Lãnh đạo cơ quan | Vị trí chuyên trách |
      | HĐND Xã Sín Thầu          | Lãnh đạo cơ quan | Vị trí chuyên trách |

  @ldcq @gender-ldcq
  Scenario Outline: View details and count delegates by gender
    When user is on the "Danh sách chính quyền địa phương" page
    And user searches for local government "<localGovernmentName>"
    And user clicks view detail icon for local government "<localGovernmentName>"
    Then user should see the local government detail information
    When user clicks category "<categoryName>" in detail page
    Then user counts delegates with gender "<gender>" for local government "<localGovernmentName>"

    Examples:
      | localGovernmentName       | categoryName     | gender |
      | HĐND Phường Điện Biên Phủ | Lãnh đạo cơ quan | Nữ     |

  @ldcq @trinhdotrinhdo-ldcq
  Scenario Outline: Thống kê số lượng đại biểu theo Trình độ chuyên môn
    When user is on the "Danh sách chính quyền địa phương" page
    And user searches for local government "<localGovernmentName>"
    And user clicks view detail icon for local government "<localGovernmentName>"
    Then user should see the local government detail information
    When user clicks category "<categoryName>" in detail page
    Then user counts delegates by dropdown "<dropdownField>" without percentage for local government "<localGovernmentName>"

    Examples:
      | localGovernmentName       | categoryName     | dropdownField              |
      | UBND Tỉnh Điện Biên       | Lãnh đạo cơ quan | Trình độ lý luận chính trị |
      | UBND Tỉnh Điện Biên       | Lãnh đạo cơ quan | Trình độ chuyên môn        |
      | UBND Phường Điện Biên Phủ | Lãnh đạo cơ quan | Trình độ lý luận chính trị |
      | UBND Phường Điện Biên Phủ | Lãnh đạo cơ quan | Trình độ chuyên môn        |
      | UBND Xã Sín Thầu          | Lãnh đạo cơ quan | Trình độ lý luận chính trị |
      | UBND Xã Sín Thầu          | Lãnh đạo cơ quan | Trình độ chuyên môn        |

  @ldcq @age-ldcq
  Scenario Outline: Thống kê số lượng đại biểu theo nhóm độ tuổi
    When user is on the "Danh sách chính quyền địa phương" page
    And user searches for local government "<localGovernmentName>"
    And user clicks view detail icon for local government "<localGovernmentName>"
    Then user should see the local government detail information
    When user clicks category "<categoryName>" in detail page
    Then user counts delegates by age group for local government "<localGovernmentName>"

    Examples:
      | localGovernmentName | categoryName     |
      | UBND Xã Vinh Quý    | Lãnh đạo cơ quan |
      | HĐND Tỉnh Lai Châu  | Lãnh đạo cơ quan |

  @ldcq @chucdanh-ldcq
  Scenario Outline: Thống kê và đếm số lượng chức danh trực tiếp từ bảng
    When user is on the "Danh sách chính quyền địa phương" page
    And user searches for local government "<localGovernmentName>"
    And user clicks view detail icon for local government "<localGovernmentName>"
    Then user should see the local government detail information
    When user clicks category "<categoryName>" in detail page
    Then user counts roles from table in category "<categoryName>" for local government "<localGovernmentName>"

    Examples:
      | localGovernmentName       | categoryName     |
      | HĐND Phường Điện Biên Phủ | Lãnh đạo cơ quan |
