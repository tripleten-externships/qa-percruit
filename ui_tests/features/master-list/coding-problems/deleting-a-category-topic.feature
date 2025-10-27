@wip
Feature: Deleting a category topic
  As an "Admin"
  The "Admin" wants to delete a topic

Background:
  Given The "Admin" is logged in using valid credentials
  And The "Admin" is on the "Coding Problems" page

  @smoke
  Scenario: The "Admin" is successfully able to delete a category topic 
    When the "Admin" deletes an existing category topic 
    Then the "Admin" will see the category topic deleted successfully from the list of available topics
    