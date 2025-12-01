Feature: Percruit Connect Messages Feature
 
  Scenario: Student filters unread messages

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

    @wip
  Scenario: User deletes a conversation
    Given the user is logged in
    And viewing a conversation
    When clicking three dots and selecting delete
    Then the system asks for confirmation 
    When confirmed the conversation is permanently removed





