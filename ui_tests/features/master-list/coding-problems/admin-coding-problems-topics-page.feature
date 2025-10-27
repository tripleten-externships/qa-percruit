@wip
Feature: Editing a topic 
  As an "Admin"
  The "Admin" wants to edit a topic

Background:
  Given The "Admin" is logged in using valid credentials
  And The "Admin" is on the "Coding Problems" page

  @smoke
  Scenario: The "Admin" is successfully able to edit a topic on the "Topics Overview" page
    When the "Admin" edits a topic with valid information 
    Then the "Admin" will see the edit change added successfully

Feature: Deleting a topic 
  As an "Admin"
  The "Admin" wants to delete a topic

Background:
  Given The "Admin" is logged in using valid credentials
  And The "Admin" is on the "Coding Problems" page

  @smoke
  Scenario: The "Admin" is successfully able to delete a topic on the "Topics Overview" page
    When the "Admin" edits a topic with valid information 
    Then the "Admin" will see the topic deleted successfully 