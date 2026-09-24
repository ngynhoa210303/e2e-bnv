@serial
Feature: Login functionality

  @login @smoke @positive
  Scenario: Login thành công với user/pass đúng và chọn đúng CQDP
    Given user is on the login page
    When user enters correct username
    And user enters correct password
    And user searches and selects the CQDP database
    And user clicks the Login button
    Then user should be redirected to the dashboard

  @login @smoke @negative
  Scenario: Sai password, đúng username
    Given user is on the login page
    When user enters correct username
    And user enters incorrect password
    And user searches and selects the CQDP database
    And user clicks the Login button
    Then user should see an toast message "Thông tin đăng nhập chưa chính xác!"
    And user should remain on the login page

  @login @smoke @negative
  Scenario: Sai username, đúng password
    Given user is on the login page
    When user enters incorrect username
    And user enters correct password
    And user searches and selects the CQDP database
    And user clicks the Login button
    Then user should see an toast message "Thông tin đăng nhập chưa chính xác!"
    And user should remain on the login page

  @login @negative @validation
  Scenario: Username để trống
    Given user is on the login page
    When user leaves the username field empty
    And user enters correct password
    And user searches and selects the CQDP database
    And user clicks the Login button
    Then user should see a required field validation error
    And user should remain on the login page

  @login @negative @validation
  Scenario: Password để trống
    Given user is on the login page
    When user enters correct username
    And user leaves the password field empty
    And user searches and selects the CQDP database
    And user clicks the Login button
    Then user should see a required field validation error
    And user should remain on the login page

  @login @negative @validation
  Scenario: Cả username và password để trống
    Given user is on the login page
    When user leaves the username field empty
    And user leaves the password field empty
    And user clicks the Login button
    Then user should see a required field validation error
    And user should remain on the login page

  @login @smoke @negative
  Scenario: Không chọn database, bấm Login
    Given user is on the login page
    When user enters correct username
    And user enters correct password
    And user does not select any database
    And user clicks the Login button
    Then user should see an error message indicating a database must be selected
    And user should remain on the login page

  @login @negative
  Scenario: Search database không có kết quả
    Given user is on the login page
    When user searches database with keyword "xyz123notfound"
    Then user should see "Không có tùy chọn có sẵn" in database dropdown

  @login @edge-case
  Scenario Outline: Khoảng trắng đầu/cuối username hoặc password
    Given user is on the login page
    When user enters username from env "<username_key>" with surrounding spaces
    And user enters password from env "<password_key>" with surrounding spaces
    And user searches and selects the CQDP database
    And user clicks the Login button
    Then user should see "<result>"

    Examples:
      | username_key     | password_key     | result                       |
      | USERNAME_ADMIN   | PASSWORD_ADMIN   | user redirected to dashboard |
      | USERNAME_UBND_BN | PASSWORD_UBND_BN | user redirected to dashboard |
      | USERNAME_HDND_BN | PASSWORD_HDND_BN | user redirected to dashboard |

  @login @security
  Scenario Outline: SQL Injection cơ bản trong username
    Given user is on the login page
    When user enters username "<malicious_input>"
    And user enters correct password
    And user searches and selects the CQDP database
    And user clicks the Login button
    Then user should see an toast message "Thông tin đăng nhập chưa chính xác!"
    And user should not be redirected to the dashboard
    And no unexpected system error should occur

    Examples:
      | malicious_input |
      | ' OR '1'='1     |
      | admin'--        |
      | ' OR 1=1--      |
