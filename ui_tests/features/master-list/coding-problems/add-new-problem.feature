@wip
Feature: Adding new problem
  As an "Admin"
  I want to add a new problem

Background:
  Given I am logged in as "Admin" using valid cedintials
  And I am on the "Coding Problems" page

  @smoke
  Scenario: The "Admin" is successfully able to add a new problem
    When I add a new problem with valid information in all of the tabs
    Then I should see a new problem added successfully