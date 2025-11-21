Feature: Admin Dashboard Metrics Visibility
    As an admin, I want to verify that the dashboard displays the correct metrics
    So that I can ensure the platform data is accurate

Background:
    Given the admin is authenticated in the system

  Scenario: Admin views total users in the dashboard metrics
    Given the admin clicks on View Details button
    Then they will be redirected to the Admin Usage Metrics page
    When they view the Quick Insights status card
    Then the system should display the total number of users on the platform

  @wip
  Scenario: Admin views total active mentors in the dashboard metrics
    Given the admin is on the Admin Usage Metrics page
    When they view the Platform Summary section
    Then the system should display the total number of active mentors in the status card
    And the displayed number should match the current count of active mentors

  @wip
  Scenario: Admin views weekly activity metrics in the dashboard metrics
    Given the admin is on the Admin Usage Metrics page
    When they view the Activity Metrics section
    Then the system should allow filtering of activity data for the last 7 days
    And it should display the total number of actions for that 7-day period in the Total Actions section