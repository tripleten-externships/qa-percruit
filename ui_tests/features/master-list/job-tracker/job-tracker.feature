@wip
Feature: Application Tracker Dashboard
As a Student, I want to login successfully to my account
So I can verify the Application Tracker loads correctly


Scenario: Successful login to dashboard without issue
    Given the student navigates to the Job Tracker page
    Then the dashboard loads correctly
    And the student should be able to access their application tracker without issues

Scenario: Dashboard fails to load after login
    Given the student navigates to the Job Tracker page
    When the dashboard should not load successfully
    Then an error message should be displayed to the student
    And the application tracker should not be accessible

Scenario: Dashboard loads partially with missing components
    Given the student navigates to the Job Tracker page
    When the dashboard should load partially
    Then required UI components (such as status tiles or application list) should be missing
    And a warning or fallback message should be displayed
    And the student should not be able to fully access their application tracker

Scenario: Dashboard loads but application tracker data fails
    Given the student navigates to the Job Tracker page
    When the dashboard should load correctly
    But the application tracker data should fail to load
    Then an error message should be shown indicating data retrieval failed
    And the student should not be able to see their list of applications

Scenario: Job Tracker feature unavailable
    Given the student navigates to the Job Tracker page
    But the feature cannot be selected
    Then a message should appear indicating the Job Tracker service is currently unavailable
    And the dashboard should not load
    And no application tracker information should be displayed
