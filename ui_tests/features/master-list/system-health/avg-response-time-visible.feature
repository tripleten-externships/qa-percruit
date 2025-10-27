@wip
Feature: Average Response Time Display
  As an admin user
  I want to see the average response time on the dashboard
  So that I can monitor system performance

    Background:
        Given the user is logged in as an admin
        And the Admin Dashboard is displayed
        And the System Health Monitor card is visible

  @smoke
  Scenario: Average response time displays 250ms
    Given the average response time is 250ms
    Then the Avg Response Time value shows "250ms"
    And the Avg Response Time metric is displayed in the System Health Monitor card

  @positive
  Scenario: Average response time label is visible
    Given the average response time is 250ms
    Then the "Avg Response Time" label is displayed
    And the response time value "250ms" is displayed below the label

  @positive
  Scenario: Average response time is displayed with milliseconds unit
    Given the average response time is 250ms
    Then the Avg Response Time value shows "250ms"
    And the value includes the "ms" unit

  @positive
  Scenario: Average response time value is displayed in blue color
    Given the average response time is 250ms
    Then the Avg Response Time value shows "250ms"
    And the response time value is displayed in blue color