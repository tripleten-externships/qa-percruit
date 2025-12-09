@wip
Feature: Application Tracker Dashboard
As a Student, I want to login successfully to my account
So I can verify the Application Tracker loads correctly

Scenario: Successful login to dashboard without issue
    Given the student is authenticated in the system 
    When they log in with valid credentials
    And select 'Job Tracker' from features list
    Then see the dashboard loads correctly
    And the student should be able to access their application tracker without issues

