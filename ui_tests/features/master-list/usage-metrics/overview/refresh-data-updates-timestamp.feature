@wip
Feature: Refreshing data on Usage Metrics Overview
  As an "Admin"
  The "Admin" wants to refresh the metrics to ensure the latest data is displayed

Background:
  Given The "Admin" is logged in using valid credentials
  And The "Admin" is on the "Usage Metrics Overview" page

  @smoke
  Scenario: The "Admin" successfully refreshes the metrics
    When The "Admin" triggers a data refresh
    Then The "Admin" should see updated metrics displayed
    And The "Admin" should see the “Last Updated” timestamp reflect the current time
