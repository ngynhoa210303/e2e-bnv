Feature: Quản lý vai trò

  Background:
    Given user is logged in as admin tcbmhb

  @role @addRole
  Scenario: Kiểm tra mã cấp đơn vị hiển thị khi chọn phân hệ
    Given user is on the "Quản lý vai trò" page
    When user clicks the "Thêm vai trò" button
    And user selects module "Phân hệ"
    Then the user verifies the role unit level dropdown contains the following options:
      | unitLevel                                                                 |
      | Bộ                                                                        |
      | Cơ quan ngang Bộ                                                          |
      | Vụ và tương đương thuộc Bộ, CQNB                                          |
      | Phòng và tương đương thuộc Vụ                                             |
      | Cục loại 1 và tương đương thuộc Bộ, CQNB                                  |
      | Phòng và tương đương thuộc Cục loại 1                                     |
      | Ban thuộc Cục loại 1                                                      |
      | Phòng và tương đương thuộc Ban thuộc Cục loại 1                           |
      | Văn phòng thuộc Cục loại 1                                                |
      | Phòng và tương đương thuộc Văn phòng thuộc Cục loại 1                     |
      | Thanh tra thuộc Cục loại 1                                                |
      | Phòng và tương đương thuộc Thanh tra thuộc Cục loại 1                     |
      | Chi cục và tương đương thuộc Cục loại 1                                   |
      | Phòng và tương đương thuộc Chi cục thuộc Cục loại 1                       |
      | Đội và tương đương thuộc Chi cục thuộc Cục loại 1                         |
      | Đơn vị sự nghiệp công lập thuộc Cục loại 1                                |
      | Phòng và tương đương thuộc Đơn vị sự nghiệp thuộc Cục loại 1              |
      | Cục loại 2 và tương đương thuộc Bộ, CQNB                                  |
      | Phòng và tương đương thuộc Cục loại 2                                     |
      | Văn phòng thuộc Cục loại 2                                                |
      | Phòng và tương đương thuộc Văn phòng thuộc Cục loại 2                     |
      | Thanh tra thuộc Cục loại 2                                                |
      | Phòng và tương đương thuộc Thanh tra thuộc Cục loại 2                     |
      | Chi cục và tương đương thuộc Cục loại 2                                   |
      | Phòng và tương đương thuộc Chi cục thuộc Cục loại 2                       |
      | Đội và tương đương thuộc Chi cục thuộc Cục loại 2                         |
      | Đơn vị sự nghiệp công lập thuộc Cục loại 2                                |
      | Phòng và tương đương thuộc Đơn vị sự nghiệp thuộc Cục loại 2              |
      | Văn phòng thuộc Bộ, CQNB                                                  |
      | Phòng và tương đương thuộc Văn phòng                                      |
      | Đơn vị sự nghiệp công lập thuộc Văn phòng                                 |
      | Thanh tra thuộc Bộ, CQNB                                                  |
      | Phòng và tương đương thuộc Thanh tra                                      |
      | Đơn vị sự nghiệp công lập thuộc Bộ, CQNB                                  |
      | Phòng và tương đương thuộc Đơn vị sự nghiệp thuộc Bộ                      |
      | UBND cấp tỉnh                                                             |
      | Sở và cơ quan tương đương Sở                                              |
      | Phòng và tương đương thuộc Sở                                             |
      | Văn phòng thuộc Sở                                                        |
      | Phòng và tương đương thuộc Văn phòng thuộc Sở                             |
      | Chi cục và tương đương thuộc Sở                                           |
      | Phòng và tương đương thuộc Chi cục thuộc Sở                               |
      | Đơn vị sự nghiệp công lập thuộc Chi cục thuộc Sở                          |
      | Trạm thuộc Chi cục và tương đương thuộc Sở                                |
      | Hạt thuộc Chi cục và tương đương thuộc Sở                                 |
      | Đội thuộc Chi cục và tương đương thuộc Sở                                 |
      | Đơn vị sự nghiệp công lập thuộc Sở                                        |
      | Phòng và tương đương thuộc Đơn vị sự nghiệp công lập thuộc Sở             |
      | Đơn vị sự nghiệp thuộc Đơn vị sự nghiệp công lập thuộc Sở                 |
      | Đơn vị sự nghiệp trực thuộc UBND cấp tỉnh                                 |
      | Phòng và tương đương trực thuộc Đơn vị sự nghiệp trực thuộc UBND cấp tỉnh |
      | Tổ chức hành chính khác trực thuộc UBND tỉnh                              |
      | Phòng và tương đương thuộc TCHC khác                                      |
      | Văn phòng thuộc TCHC khác                                                 |
      | Phòng và tương đương thuộc Văn phòng thuộc TCHC khác                      |
      | Chi cục và tương đương thuộc TCHC khác                                    |
      | Phòng và tương đương thuộc Chi cục thuộc TCHC khác                        |
      | Đơn vị sự nghiệp công lập thuộc Chi cục thuộc TCHC khác                   |
      | Địa thuộc Chi cục và tương đương thuộc TCHC khác                          |
      | Hạt thuộc Chi cục và tương đương thuộc TCHC khác                          |
      | Đội thuộc Chi cục và tương đương thuộc TCHC khác                          |
      | Đơn vị sự nghiệp công lập thuộc TCHC khác                                 |
      | Phòng và tương đương thuộc Đơn vị sự nghiệp công lập thuộc TCHC khác      |
      | Đơn vị sự nghiệp thuộc Đơn vị sự nghiệp công lập thuộc TCHC khác          |
      | UBND cấp xã                                                               |
      | Cơ quan chuyên môn thuộc UBND Xã                                          |
      | Phòng và tương đương trực thuộc Cơ quan chuyên môn thuộc UBND xã          |
      | Tổ chức hành chính khác thuộc UBND xã                                     |
      | Phòng và tương đương trực thuộc Tổ chức hành chính khác thuộc UBND xã     |
      | Đơn vị sự nghiệp thuộc UBND Xã                                            |
      | Phòng và tương đương trực thuộc Đơn vị sự nghiệp thuộc UBND xã            |
      | Đơn vị sự nghiệp thuộc Đơn vị sự nghiệp công lập thuộc UBND xã            |
