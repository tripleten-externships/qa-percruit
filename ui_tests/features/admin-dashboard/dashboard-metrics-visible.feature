@wip
Feature: Admin Dashboard Metrics Visibility
As an admin I want to verify dashboard has correct metrics displayed

Background:
    Given admin is logged into the system

Scenario: Admin views total users in the dashboard metrics 
     Given the admin is on the Admin Usage Metrics page
     When they check the Quick insights status card
     Then the system should display the total number of users on the platform 

Scenario: Admin is able to view total active mentors in the dashboard metrics 
    Given the admin is on the Admin Usage Metrics page
    When they view the Platform Summary section
    Then the system should display the total number of active mentors in the status card
    And the displayed number should match the current count of active mentors

Scenario: Admin views weekly activity metrics in the dashboard metrics 
   Given the admin is on the Admin Usage Metrics page
   When they view the Activity Metrics section
   Then the system should allow filtering activity data for the last 7 days
   And display the total number of actions for that 7-day period in the Total Actions section