Feature: Messages screen tests

@wip
Scenario: When user goes to the page the page loads as expected
Given the student is authenticated in the system 
When the user navigates to the messages page
Then the messages page display

@wip
Scenario: Student opens messages page
Given the user is logged in
And the user is on the Connect Messages page
Then the Messages page should display
And the user should see Welcome to Messages
