Feature: Đếm số lượng đại biểu HĐND các cấp theo đơn vị hành chính

  Background:
    Given user is logged in as admin

  @daibieuhdnd @checkbox
  Scenario Outline: Đếm theo yêu cầu
    When user is on the "Danh sách chính quyền địa phương" page
    And user searches for local government "<localGovernmentName>"
    And user clicks view detail icon for local government "<localGovernmentName>"
    Then user should see the local government detail information
    When user clicks category "<categoryName>" in detail page
    Then user counts delegates with checkbox "<checkboxName>" on "<categoryName>" for local government "<localGovernmentName>"
# cmt trc chạy cho đỡ mất tgian

    Examples:
      | localGovernmentName | categoryName  | checkboxName     |
      | HĐND Tỉnh Bắc Ninh  | Đại biểu HDND | MTTQ và đoàn thể |
      # | HĐND Tỉnh Bắc Ninh  | Đại biểu HDND | Viện KSND           |
      # | HĐND Xã Việt Lâm    | Đại biểu HDND | Là Đảng viên        |
      # | HĐND Xã Việt Lâm    | Đại biểu HDND | Dân tộc thiểu số    |
      # | HĐND Xã Việt Lâm    | Đại biểu HDND | Tôn giáo            |
      # | HĐND Xã Việt Lâm    | Đại biểu HDND | Vị trí chuyên trách |
      # | HĐND Xã Việt Lâm    | Đại biểu HDND | Cơ quan Đảng        |
      # | HĐND Xã Việt Lâm    | Đại biểu HDND | Chính quyền         |
      # | HĐND Xã Việt Lâm    | Đại biểu HDND | MTTQ và đoàn thể    |
      # | HĐND Xã Việt Lâm    | Đại biểu HDND | TAND                |
      # | HĐND Xã Việt Lâm    | Đại biểu HDND | Viện KSND           |
      # | HĐND Xã Việt Lâm    | Đại biểu HDND | Quân đội, công an   |

  @daibieuhdnd @gender
  Scenario Outline: View details and count delegates by gender
    When user is on the "Danh sách chính quyền địa phương" page
    And user searches for local government "<localGovernmentName>"
    And user clicks view detail icon for local government "<localGovernmentName>"
    Then user should see the local government detail information
    When user clicks category "<categoryName>" in detail page
    Then user counts delegates with gender "<gender>" for local government "<localGovernmentName>"

    Examples:
      | localGovernmentName | categoryName  | gender |
      | HĐND Xã Việt Lâm    | Đại biểu HDND | Nữ     |

  @daibieuhdnd @trinhdocm
  Scenario Outline: Thống kê số lượng đại biểu theo Trình độ chuyên môn
    When user is on the "Danh sách chính quyền địa phương" page
    And user searches for local government "<localGovernmentName>"
    And user clicks view detail icon for local government "<localGovernmentName>"
    Then user should see the local government detail information
    When user clicks category "<categoryName>" in detail page
    Then user counts delegates by dropdown "<dropdownField>" without percentage for local government "<localGovernmentName>"

    Examples:
      | localGovernmentName | categoryName  | dropdownField              |
      | HĐND Tỉnh Lai Châu  | Đại biểu HDND | Trình độ lý luận chính trị |
      # | HĐND Tỉnh Điện Biên | Đại biểu HDND | Trình độ chuyên môn        |

  @daibieuhdnd @age
  Scenario Outline: Thống kê số lượng đại biểu theo nhóm độ tuổi
    When user is on the "Danh sách chính quyền địa phương" page
    And user searches for local government "<localGovernmentName>"
    And user clicks view detail icon for local government "<localGovernmentName>"
    Then user should see the local government detail information
    When user clicks category "<categoryName>" in detail page
    Then user counts delegates by age group for local government "<localGovernmentName>"

    Examples:
      | localGovernmentName      | categoryName  |
      | HĐND Thành phố Hải Phòng | Đại biểu HDND |
