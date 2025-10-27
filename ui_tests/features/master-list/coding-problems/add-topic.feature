@wip
Feature: Adding new topic
  As an "Admin"
  The "Admin" wants to add a new topic

Background:
  Given The "Admin" is logged in using valid credintials
  And The "Admin" is on the "Coding Problems" page

  @smoke
  Scenario: The "Admin" is successfully able to add a new topic
    When the "Admin" adds a new topic with valid information 
    Then the "Admin" will see a new topic added successfully
    