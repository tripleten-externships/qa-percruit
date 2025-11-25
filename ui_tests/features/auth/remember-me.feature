@wip
Feature: Admin Remember Me Functionality
  As an administrator
  I want to stay logged in after closing the browser
  So that I don't have to log in repeatedly

  Background:
    Given the admin is on the login page

    @smoke
  Scenario: Successful login with “Remember Me” enabled
    When the admin enters valid credentials
    And checks the "Remember Me" checkbox
    And clicks the "Login" button
    Then the admin should remain logged in after reopening the browser