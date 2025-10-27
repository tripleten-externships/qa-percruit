@wip
Feature: System Uptime Display
As an admin user
  I want to see the system uptime percentage on the dashboard
  So that I can monitor system reliability and make sure the uptime is 99% or above

    Background:
      Given the user is logged in as an admin
      And the Admin Dashboard is displayed
      And the System Health Monitor card is visible

  @smoke @positive
    Scenario: System uptime displays 99.9%
      Given the system uptime is 99.9%
      Then the System Uptime value shows "99.9%"
      And the System Uptime metric is displayed in the System Health Monitor card
        
  @positive
    Scenario: System uptime label is visible
      Given the system uptime is 99.9%
      Then the "System Uptime" label is displayed
      And the uptime value "99.9%" is displayed below the label

  @positive
    Scenario: System uptime is displayed with percentage symbol
      Given the system uptime is 99.8%
      Then the System Uptime value shows "99.8%"
      And the value includes the percentage symbol

  @positive
    Scenario: System uptime value is displayed in green color when value is >=90% or above
      Given the system uptime is 99.9%
      Then the System Uptime value shows "99.9%"
      And the uptime value is displayed in green color
