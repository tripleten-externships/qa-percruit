@wip
Feature: Adding an edit to a category topic
  As an "Admin"
  The "Admin" wants to add a edit

Background:
  Given The "Admin" is logged in using valid cedintials
  And The "Admin" is on the "Coding Problems" page

  @smoke
  Scenario: The "Admin" is successfully able to edit a category topic 
    When When the "Admin" edits a topic with valid information 
    Then the "Admin" will see edit change added successfully
    