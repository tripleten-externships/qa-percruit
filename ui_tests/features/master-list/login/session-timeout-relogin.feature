Feature: Admin Session Timeout and Re-login
  As an administrator
  I want to be able to log back in after my session expires
  So that I can continue my work securely

  Background:
    Given the admin is logged into the system

    @smoke
  Scenario: Successful re-login after session timeout
    When the admin’s session expires after inactivity
    And the admin logs in again with valid credentials
    Then the admin should regain access to the dashboard successfully