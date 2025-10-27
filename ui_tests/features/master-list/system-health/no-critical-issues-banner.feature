@wip

Feature: Critical Issues Display
    As a system administrator
    I want to see the number of critical issues on the dashboard
    So that I can monitor system health and address urgent problems

    Background:
        Given the user is logged in as an administrator
        And the Admin Dashboard is displayed
        And the System Health Monitor card is visible

    @smoke @positive
    Scenario: Critical issues displays 0 when there are no issues
        Given there are 0 critical issues in the system
        Then the Critical Issues value shows "0"
        And the Critical Issues metric is displayed in the System Health Monitor card

    @positive
    Scenario: Critical issues label is visible
        Given there are 0 critical issues in the system
        Then the "Critical Issues" Label is displayed
        And the Critical issues value "0" is displayed below the label

    @positive
    Scenario: Critical issues value is displayed in green when zero
        Given there are 0 critical issues in the system
        Then the Critical Issues value shows "0"
        And the critical issues value is displayed in green color   

