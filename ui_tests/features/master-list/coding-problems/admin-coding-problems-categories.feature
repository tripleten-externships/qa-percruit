@wip
Feature: Categories in the Coding Problems page
  As an Admin
  The Admin wants to view and update categories in Coding Problems page
  so that categories can be tracked or managed accurately

Background:
  Given The Admin is logged in using valid credentials
  And coding problems exist in the system under different categories

  @smoke
  Scenario: View existing categories
    When the Admin opens the Coding Problems page
    Then The Admin should see all existing coding problems grouped by category
    
  Scenario: Deletion of existing coding problems
    When the Admin deletes a coding problem from a specific category
    Then the Admin should receive a message asking if they are sure they want to delete a specific category 
    And the coding problem should no longer exist on the Coding Problems categories dashboard

  Scenario: Making edits to existing coding problems
    When the Admin edits a coding problem in a category with valid information
    Then the details for the coding problems will be changed successfully
    And the system should confirm that these changes were made  

  Scenario: Adding new coding problems
   When the Admin adds a new category with valid information
   Then the new category should be visible along with the other Coding Problems categories
   And coding problems can be associated with the new category

  Scenario: No coding problems present
  When the Admin opens the Coding Problems dashboard 
  Then the Admin should see a message stating that no categories are available
  And the Admin will have the option to add a new category
