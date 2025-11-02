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
    
Scenario: Adding a new Category
  When the Admin adds a new category with valid information
  Then the new category should be visible along with the other Coding Problems categories
  And coding problems can be associated with the new category

Scenario: Updating an existing Category
  When the Admin edits a coding problem in a category with valid information
  Then the details for the coding problems will be changed successfully
  And the updated category should be correctly displayed on the Categories page
 
Scenario: Deletion of an existing Category
   When the Admin deletes a specific category
   Then the category will no longer exist and will not be viewable to the Admin 

Scenario: No Categories present
   When the Admin views the Categories tab
   And there are no existing categories
   Then the Admin should not see any categories displayed on the Categories page