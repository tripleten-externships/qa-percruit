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

@wip
Scenario: Student search for conversation
Given the user is logged in and has at least one conversation
When the user selects a conversation
Then the conversation should open and display the full message thread

@wip
Scenario: Student search for conversation
Given the user is logged in and has at least one conversation
When the user selects a conversation
Then the conversation should open and display the full message thread

@wip
Scenario: Student send a message to Mentor
Given the user is logged in and has opened a conversation
When the user types a message and clicks send
Then the message should appear in the thread and be sent to the mentor

@wip
Scenario: Student create a new message
Given the user is logged in and on the messages page
When the user clicks New Message
Then the system should open a form to select a mentor and type a new message

 @wip
Scenario: Student search for a Mentor
Given the user is logged in and on the Messages page
When the user enters a mentors name in the Search mentor bar
Then only conversations with that mentor should appear

@wip
Scenario: Student searches for mentor when information is missing
Given the user is logged in
And the mentor information is missing
When viewing the conversation
Then the system should display Mentor information unavailable

@wip
Scenario: Student search Mentor information and it is not available 
Given the user is logged in and mentor info it is not available
When the user searches for the mentor and then exits the search box
Then the search box should close
And the user should return to the Welcome Messages screen

@wip
Scenario: Student filters unread messages
Given the user is logged in 
And has multiple conversations
When clicking the unread messages should display

@wip
Scenario: Student views archived messages
Given the user is logged in and has archived conversations 
When clicking the archived tab 
Then only archived conversations should display

@wip
Scenario: Student archives a conversation
Given the user is logged in and viewing a conversation
When clicking the three dots menu and selecting archive
Then the conversation should move to the archived tab
And no longer appear in the active messages list