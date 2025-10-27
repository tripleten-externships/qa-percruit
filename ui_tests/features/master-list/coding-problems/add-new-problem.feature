@wip
Feature: Adding new problem
  As an "Admin"
  The "Admin" wants to add a new problem

Background:
  Given The "Admin" is logged in using valid cedintials
  And The "Admin" is on the "Coding Problems" page

  @smoke
  Scenario: The "Admin" is successfully able to add a new problem
    When the "Admin" adds a new problem with valid information 
    Then the "Admin" will see a new problem added successfully
    