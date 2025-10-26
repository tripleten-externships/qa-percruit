@wip
Feature: Adding new topic
  As an "Admin"
  I want to add a new topic

Background:
  Given I am logged in as "Admin" using valid cedintials
  And I am on the "Coding Problems" page

  @smoke
  Scenario: The "Admin" is successfully able to add a new topic
    When I add a new topic with valid information 
    Then I should see a new topic added successfully