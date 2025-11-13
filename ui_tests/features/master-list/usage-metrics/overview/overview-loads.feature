@wip
Feature: Viewing Usage Metrics Overview
  As an "Admin"
  The "Admin" wants to view the Usage Metrics Overview page

Background:
  Given The "Admin" is logged in using valid credentials
  And The "Admin" is on the "Usage Metrics Overview" page

  @smoke
  Scenario: The "Admin" successfully views the Overview metrics
    When The "Admin" accesses the "Usage Metrics Overview" page
    Then The "Admin" should see summary metrics for user activity, session count, and retention
    And The "Admin" should see the data displayed for the most recent reporting period
