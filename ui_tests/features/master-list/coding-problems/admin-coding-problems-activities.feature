@wip
Feature: Activities in the Coding Problems page
As an Admin 
The Admin wants to view and update activities in the coding problems page
so that activities can be tracked or managed accurately

Background:
  Given The Admin is logged in using valid credentials
  And the Admin is on the Activities tab in Coding Problems

@smoke
Scenario: View existing activities
  When the Admin views the Activities tab in Coding Problems
  Then the Admin should see all existing activities

Scenario: Selecting a Category on activities page
  When the Admin filters a category using the Category dropdown
  Then the Admin should be able to select a category from the existing Category dropdown list

Scenario: Selecting a Topic on activities page
  When the Admin wants to select a new topic from the existing Topic dropdown list
  And a Category is already selected 
  Then the Admin should be able to select a topic from the Topic dropdown list 

Scenario: Selecting a Unit on activities page
  When the Admin wants to select a new unit from the existing Unit dropdown list
  And a Topic is already selected
  Then the Admin should be able to select a unit from the Unit dropdown list

Scenario: Adding an Activity
  When the Admin wants to add a new activity
  And the Admin selects a category from the existing Category dropdown list
  And the Admin selects a topic from the existing corresponding Topic dropdown list
  Then the Admin selects a unit from the existing Unit dropdown list 
  Then the Admin should be able to add an activity with the valid information
  And the added activity should be visible to the Admin on the Activities page

Scenario: Updating an existing Activity
  When the Admin makes an edit to an existing activity with valid information
  Then the Admin should be able to save the changes in the existing activity
  And the updated activity should be correctly displayed on the Activities page

Scenario: Deletion of an existing Activity
  When the Admin wants to delete a specific activity
  And the Admin selects a category from the existing Category dropdown list
  And the Admin selects a topic from the existing corresponding Topic dropdown list
  Then the Admin selects a unit from the existing Unit dropdown list
  Then the Admin should be able to delete an existing activity after the deletion confirmation message
  And the topic should no longer exist on the Units page

Scenario: No units present
  When the Admin views the Activities tab
  And there are no existing activities
  Then the Admin should not see any activities displayed on the Activities page

