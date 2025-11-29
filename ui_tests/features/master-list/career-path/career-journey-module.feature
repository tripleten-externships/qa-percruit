@wip
Feature: Career Journey Module

@wip
Scenario: Restart button clears all fields

@wip
Given the student is authenticated in the system
And the student submits the assessment with valid details
When the student clicks the restart button
Then all fields of assessment return to default state

@wip
Scenario: Current role displays not specified when the restart button is clicked
Given the student is authenticated in the system
And the student populates and submits the assessment with valid details
When the student clicks the restart button
Then Current Role displays not specified

@wip
Scenario: Target role displays not specified when the restart button is clicked
Given the student is authenticated in the system
And the student submits assessment with valid details
When the student clicks the restart button
Then Target Role displays not specified

