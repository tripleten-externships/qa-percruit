Feature: System Status Title Feature
As an "Admin" user
I want to verify that Uptime and Response Time are displayed on the dashboard
So that I can confirm the system health is operating normally

Background:
    Given admin is logged in using valid credentials
    And is on the dashboard 

Scenario: Admin views system uptime in the System Health Monitor
     When the admin checks the System Health Monitor section
     Then the system should indicate that all systems are operational
     And the dashboard should displau the current uptime percentage in green text
     And the uptime value should accurately reflect the system's actual uptime.

Scenario: Admin views the average response time in the System Health Monitor
    When the admin checks the System Health Monitor system
    Then the system should indicate that all systems are operational
    And the dashboard should display the average response time in blue text with "ms" units 
    And the displayed response time should accurately reflect the system's actual average response time