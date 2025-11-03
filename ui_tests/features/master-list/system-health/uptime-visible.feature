@wip
Feature: System Uptime Display
As an admin user
  I want to see the system uptime percentage on the dashboard
  So that I can monitor system reliability and make sure the uptime is 99% or above

    Background:
      Given the user is logged in as an admin
      And the Admin Dashboard is displayed
      And the System Health Monitor card is visible

  @smoke @positive
  Scenario Outline: System uptime is displayed as a percentage value
    Given the system has an uptime value
    And the uptime value is 99% or above
    Then the System Uptime metric is visible
    And the uptime is displayed as a percentage
    And the uptime value includes the "%" symbol

  @positive
  Scenario: System uptime value is numeric and properly formatted
    Given the system has an uptime value
    And the uptime value is 99% or above
    Then the uptime is displayed as a numeric value
    And the numeric value is followed by the percentage symbol
    And the value is readable and properly formatted

  @positive
  Scenario: System uptime value is displayed in green color
    Given the system has an uptime value
    And the uptime value is 99% or above
    Then the System Uptime metric is visible
    And the uptime value is displayed in green color
    And the green color indicates healthy status
