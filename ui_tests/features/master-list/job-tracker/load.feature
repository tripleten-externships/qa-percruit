@smoke
Feature: Application Tracker Dashboard
As a Student, I want to login successfully to my account
So I can verify the Application Tracker loads correctly

Scenario: Successful login to dashboard without issue
    Given the student is authenticated in the system 
    When they log in with valid credentials
    And select 'Job Tracker' from features list
    Then see the dashboard loads correctly
    And the student should be able to access their application tracker without issues

Scenario: Dashboard fails to load after login
    Given the student is authenticated in the system
    When they log in with valid credentials
    And select 'Job Tracker' from features list
    Then the dashboard should not load successfully
    And an error message should be displayed to the student
    And the application tracker should not be accessible

Scenario: Dashboard loads partially with missing components
    Given the student is authenticated in the system
    When they log in with valid credentials
    And select 'Job Tracker' from features list
    Then the dashboard should load partially
    And required UI components (such as status tiles or application list) should be missing
    And a warning or fallback message should be displayed
    And the student should not be able to fully access their application tracker

Scenario: Dashboard loads but application tracker data fails
    Given the student is authenticated in the system
    When they log in with valid credentials
    And select 'Job Tracker' from features list
    Then the dashboard should load correctly
    But the application tracker data should fail to load
    And an error message should be shown indicating data retrieval failed
    And the student should not be able to see their list of applications

Scenario: Job Tracker feature unavailable
    Given the student is authenticated in the system
    When they attempt to select 'Job Tracker' from the features list
    Then a message should appear indicating the Job Tracker service is currently unavailable
    And the dashboard should not load
    And no application tracker information should be displayed
