
@wip 
Feature: View platform analytics

Background:
Given the user is logged into the platform

@wip
Scenario: Platform Analytics tab loads successfully
When the career insights tab is accessed
Then a page of job analytics is displayed

@wip
Scenario: Platform Analytics tab does not load successfully
When the career insights tab is accessed
Then the error message "Please try again later" is displayed
And the analytics page fails to load
