@wip
Feature: Switching date range in Usage Metrics Overview
  As an "Admin"
  The "Admin" wants to change the date range filter to view updated metrics

Background:
  Given The "Admin" is logged in using valid credentials
  And The "Admin" is on the "Usage Metrics Overview" page

  @smoke
  Scenario: The "Admin" successfully switches the date range
    When The "Admin" selects a new date range
    Then The "Admin" should see all metrics update to reflect the selected period
    And The Overview data should match the selected date range
