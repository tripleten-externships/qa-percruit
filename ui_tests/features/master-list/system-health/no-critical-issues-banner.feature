@wip

Feature: Critical Issues Display
    As an admin user
    I want to see the number of critical issues on the dashboard
    So that I can monitor system health and address urgent problems

    Background:
        Given the user is logged in as an admin
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

    @negative
    Scenario: Critical issues displays critical color when 1 or multiple issues exist
        Given the system has 1 or multiple critical issues
        Then the Critical Issues metric is visible
        And the critical issues count is equal or greater than 1
        And the count value is displayed in critical color
        And the "All Systems Operational" status is not displayed

    @negative
    Scenario: Critical issues handles missing data gracefully
        Given the critical issues data is unavailable
        Then the Critical Issues metric is visible
        And an appropriate placeholder or error message is displayed
        And the "Critical Issues" label remains visible

    @negative
    Scenario: Critical issues does not display negative values
        Given the system has invalid negative critical issues count
        Then the Critical Issues metric is visible
        And the count shows zero or a valid non-negative value Or an error message is displayed

 

