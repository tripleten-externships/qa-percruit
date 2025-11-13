# @wip
Feature: Average Response Time Display
  As an admin user
  I want to see the average response time on the dashboard
  So that I can monitor system performance

    Background:
      Given the user is logged in as an admin
      And the Admin Dashboard is displayed
      And the System Health Monitor card is visible

    @smoke @positive
    Scenario: Average response time is displayed in milliseconds
      Given the system has a response time value
      Then the Avg Response Time metric is visible
      And the response time is displayed in milliseconds
      And the response time value includes the "ms" unit

    @positive
    Scenario: Average response time displays as a numeric value
      Given the system has a response time value
      Then the Avg Response Time metric is visible
      And the response time is displayed as a numeric value
      And the numeric value is followed by "ms" unit

    @negative
    Scenario: Average response time does not display negative values
      Given the system has an invalid negative response time
      Then the Avg Response Time metric is visible
      And the response time shows a valid non-negative value Or an error message is displayed

    @negative
    Scenario: Average response time handles missing data gracefully
      Given the system response time data is unavailable
      Then the Avg Response Time metric is visible
      And an appropriate placeholder or error message is displayed
      And the "Avg Response Time" label remains visible