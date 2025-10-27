Feature: Admin Dashboard metrics visibility
Admin wants to verify dashboard has correct metrics including: total users, active mentors, and new this week stats

Background:
    Given the admin is logged into the system
    And the admin is on the dashboard

Scenario: Admin is able to view "Total Users" in dashboard
     When admin clicks on "View Details" button
     And redirected to "Admin Usage Metrics" page
     And scrolls down to "Quick Insights" status card
     Then system should display number of total users on platform
     And the status card will show the current total number of "Total Users" 

Scenario: Admin is able to view "Active Mentors" in dashboard
    When admin clicks on "View Details" button
    And redirected to "Admin Usage Metrics" page
    And scrolls down to "Platform Summary" status card
    Then system should display number of active mentors on platform
    And status card show should the correct number of "Active Mentors"

Scenario: Admin is able to view "New This Week" in dashboard
   When admin clicks on "View Details" button
   And redirected to "Admin Usage Metrics" page
   And scrolls down to "Activity Metrics"
   Then admin can filter based on activity over last 7 days
   And user will be able to view the total over last 7 days in "Total Actions"