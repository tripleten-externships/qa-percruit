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

@wip
Feature: Adding new problem
  As an "Admin"
  The "Admin" wants to add a new problem

Background:
  Given The "Admin" is logged in using valid credintials
  And The "Admin" is on the "Coding Problems" page

  @smoke
  Scenario: The "Admin" is successfully able to add a new problem
    When the "Admin" adds a new problem with valid information 
    Then the "Admin" will see a new problem added successfully

@wip
Feature: Adding an edit to a category topic
  As an "Admin"
  The "Admin" wants to add a edit

Background:
  Given The "Admin" is logged in using valid credintials
  And The "Admin" is on the "Coding Problems" page

  @smoke
  Scenario: The "Admin" is successfully able to edit a category topic 
    When the "Admin" edits a topic with valid information 
    Then the "Admin" will see edit change added successfully

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