Feature: System Status Title Feature
As an "Admin" user
Admin wants to verify that "Uptime" and "Response Time" are displayed in dashboard 

Background:
    Given admin is logged in using email and password
    And the admin is on the dashboard 

Scenario: Admin is able to see "Uptime" displayed in the "System Health Monitor"
     When admin scrolls down to "System Health Monitor" status card
     Then the "All Systems Operational" will be displayed in green checkmark button
     And the system should display a green text with percentage above "System Uptime" 
     And the "System Uptime" should show the correct percentage for "System Uptime"

Scenario: Admin is able to see "Response Time" displayed in the "System Health Monitor" 
    When admin scrolls down to "System Health Monitor" status card
    Then the "All Systems Operational" will be displayed in green checkmark button
    And the system should display a blue text with "ms" units above "Avg Response Time"
    And the "Avg Response Time" should show the correct value for "Avg Response Time"