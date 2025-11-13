@wip
Feature: Units in the Coding Problem page
As an Admin
the Admin wants to view and update units in the coding problems page
so that units can be tracked or managed accurately

Background:
  Given the Admin is logged in using valid credentials
  And the Admin is on the Units tab in Coding Problems

Scenario: View existing units
  When the Admin views the Units tab in Coding Problems
  Then the Admin should see all existing units

Scenario: Selecting a Category on unit page
  When the Admin filters a category using the Category dropdown
  Then the Admin should be able to select a category from the existing Category dropdown list

Scenario: Selecting a Topic on unit page
  When the Admin wants to select a new topic from the existing Topic dropdown list
  And a Category is already selected 
  Then the Admin should be able to select a topic from the Topic dropdown list 

Scenario: Adding a Unit
  When the Admin wants to add a new unit
  And the Admin selects a category from the existing Category dropdown list
  And the Admin selects a topic from the existing corresponding Topic dropdown list
  Then the Admin should be able to add a unit with the valid information
  And the added unit should be visible to the Admin on the Units page

Scenario: Updating an existing unit
  When the Admin makes an edit to an existing unit with valid information
  Then the Admin should be able to save the changes in the existing unit
  And the updated unit should be correctly displayed on the Units page

Scenario: Deletion of an existing unit
  When the Admin wants to delete a specific unit
  Then the Admin should receive a message asking if they are sure they want to delete the specific unit 
  And the unit should no longer exist on the Units page

Scenario: No units present
  When the Admin views the Units tab
  And there are no existing units
  Then the Admin should not see any units displayed on the Units page
