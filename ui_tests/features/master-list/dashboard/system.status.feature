@wip
Feature: System Status Title Feature
    As an admin user
    I want to verify that the Uptime and Response Time are displayed on the dashboard
    So that I can confirm the system health is operating normally

Background:
    Given the admin is autheticated in the system
    
Scenario: Admin views system uptime in the System Health Monitor
    When the admin views the System Health Monitor section
    Then the system should indicate that all systems are operational
    And the dashboard should display the current uptime percentage in green text
    And the uptime value should accurately reflect the system's actual uptime

Scenario: Admin views average response time in the System Health Monitor
    When the admin views the System Health Monitor section
    Then the system should indicate that all systems are operational
    And the dashboard should display the average response time in blue text with "ms" units
    And the displayed response time should accurately reflect the system's actual average response time