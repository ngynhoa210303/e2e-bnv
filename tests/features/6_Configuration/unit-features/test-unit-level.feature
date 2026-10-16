Feature: Kiểm tra danh sách cấp đơn vị

  @testUnitLevel
  Scenario: Đảm bảo form Thêm đơn vị hiển thị đầy đủ các cấp đơn vị trong dropdown
    # Bước 1: Login và điều hướng đến trang Quản lý đơn vị
    Given user is logged in as admin tcbmhb
    And user is on the "Quản lý đơn vị" page in tcbmhb
    # Bước 2: Nhấn nút mở popup thêm mới
    When Choose level is "Bộ ngành"
    And user clicks the "Thêm đơn vị" button
    # Bước 3: Kiểm tra list cấp đơn vị trong dropdown
    # Bạn có thể tuỳ chỉnh lại danh sách level bên dưới cho đúng với dữ liệu thực tế dự án của bạn
    Then the user verifies the unit level dropdown contains the following options:
      | level                                                        |
      | Bộ                                                           |
      | Cơ quan ngang Bộ                                             |
      | Vụ và tương đương thuộc Bộ, CQNB                             |
      | Phòng và tương đương thuộc Vụ                                |
      | Cục loại 1 và tương đương thuộc Bộ, CQNB                     |
      | Phòng và tương đương thuộc Cục loại 1                        |
      | Ban thuộc Cục loại 1                                         |
      | Phòng và tương đương thuộc Ban thuộc Cục loại 1              |
      | Văn phòng thuộc Cục loại 1                                   |
      | Phòng và tương đương thuộc Văn phòng thuộc Cục loại 1        |
      | Thanh tra thuộc Cục loại 1                                   |
      | Phòng và tương đương thuộc Thanh tra thuộc Cục loại 1        |
      | Chi cục và tương đương thuộc Cục loại 1                      |
      | Đội và tương đương thuộc Chi cục thuộc Cục loại 1            |
      | Đơn vị sự nghiệp công lập thuộc Cục loại 1                   |
      | Phòng và tương đương thuộc Đơn vị sự nghiệp thuộc Cục loại 1 |
      | Cục loại 2 và tương đương thuộc Bộ, CQNB                     |
      | Phòng và tương đương thuộc Cục loại 2                        |
      | Văn phòng thuộc Cục loại 2                                   |
      | Phòng và tương đương thuộc Văn phòng thuộc Cục loại 2        |
      | Thanh tra thuộc Cục loại 2                                   |
      | Phòng và tương đương thuộc Thanh tra thuộc Cục loại 2        |
      | Chi cục và tương đương thuộc Cục loại 2                      |
      | Đội và tương đương thuộc Chi cục thuộc Cục loại 2            |
      | Đơn vị sự nghiệp công lập thuộc Cục loại 2                   |
      | Phòng và tương đương thuộc Đơn vị sự nghiệp thuộc Cục loại 2 |
      | Văn phòng thuộc Bộ, CQNB                                     |
      | Phòng và tương đương thuộc Văn phòng                         |
      | Đơn vị sự nghiệp công lập thuộc Văn phòng                    |
      | Thanh tra thuộc Bộ, CQNB                                     |
      | Phòng và tương đương thuộc Thanh tra                         |
      | Đơn vị sự nghiệp công lập thuộc Bộ, CQNB                     |
      | Phòng và tương đương thuộc Đơn vị sự nghiệp thuộc Bộ         |
    When Choose level is "Địa phương"
    And user clicks the "Thêm đơn vị" button
    Then the user verifies the unit level dropdown contains the following options:
      | level                                                                     |
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
      | Phòng và tương đương thuộc Chi cục thuộc Cục loại 2                       |
      | Phòng và tương đương thuộc Chi cục thuộc Cục loại 1                       |
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
    # Bước 4: Báo cáo tổng hợp kết quả (chỉ fail ở đây nếu có lỗi)
    Then the unit level verification report should pass
