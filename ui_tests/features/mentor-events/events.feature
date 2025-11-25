Feature: Event creation by mentor
  In order to make new events available to users
  A mentor should be able to create and view new events in the system

  Background:
    Given the Mentor is authenticated in the system
    And the mentor navigates to the Events page
    
@wip
Scenario: Mentor successfully creates a new event
    And starts the process to create a new event
    Then the system displays the event creation form
    And the mentor provides valid event details
    And the system saves the event successfully
    And the newly created event appears on the Events page