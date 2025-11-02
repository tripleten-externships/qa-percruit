
@wip
Feature: Admin Cross-Browser Login
  As an administrator
  I want to log in using any supported browser
  So that I can manage the system from different environments

    @smoke
  Scenario: Successful login across supported browsers
    Given the admin opens the system in a supported browser <browser>
    When valid credentials are provided
    Then the admin should be successfully logged in
    And the admin dashboard should be displayed correctly
    Then the admin should be redirected to the admin dashboard successfully