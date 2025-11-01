Feature: Admin Cross-Browser Login
  As an administrator
  I want to log in using any supported browser
  So that I can manage the system from different environments

    @smoke
  Scenario: Successful login across multiple browsers
    Given the admin is on the login page in <browser>
    When the admin enters valid credentials
    And clicks the "Login" button
    Then the admin should be redirected to the admin dashboard successfully

    Examples:
      | browser   |
      | Chrome    |
      | Firefox   |
      | Safari    |
      | Edge      |