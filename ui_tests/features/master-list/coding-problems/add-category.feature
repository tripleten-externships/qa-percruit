@wip
Feature: Adding new coding category
  As an "Admin"
  The "Admin" wants to create a new code category

Background:
  Given The "Admin" is logged in using valid credintials
  And The "Admin" is on the "Coding Problems" page

  @smoke
  Scenario: The "Admin" is successfully able to create a new category
    When the "Admin" add a new category with valid information
    Then The "Admin" should see a new category added successfully
    