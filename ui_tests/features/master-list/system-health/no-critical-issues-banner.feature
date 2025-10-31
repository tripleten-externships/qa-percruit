@wip

Feature: Critical Issues Display
    As an admin user
    I want to see the number of critical issues on the dashboard
    So that I can monitor system health and address urgent problems

    Background:
        Given the user is logged in as an administrator
        And the Admin Dashboard is displayed
        And the System Health Monitor card is visible

    @smoke @positive
    Scenario: Critical issues displays as a numeric count
        Given the system has no critical issues
        Then the Critical Issues metric is visible
        And the critical issues count is displayed as a number "0"
        And the number represents zero issues

    @positive
    Scenario: Critical issues count is displayed in green when zero
        Given the system has no critical issues
        Then the Critical Issues metric is visible
        And the count value is displayed in green color
        And the green color indicates healthy status

 

