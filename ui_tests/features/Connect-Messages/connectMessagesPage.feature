Feature: Messages screen tests

@wip
Scenario: When user goes to the page the page loads as expected
Given the student is authenticated in the system 
When the user navigates to the messages page
Then the messages page display
