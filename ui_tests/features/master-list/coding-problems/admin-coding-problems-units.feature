@wip
Feature: Units in the Coding Problem page
As an Admin
The Admin wants to view and update units in the coding problems page
so that units can be tracked or managed accurately

Background:
  Given The Admin is logged in using valid credentials
  And the Admin is on the Units tab in Coding Problems

  @smoke
  Scenario: View existing units
  When the Admin opens the Coding Problems page
  And accesses the Units tab
  Then the Admin should see all existing units

  Scenario: Deletion of all existing units
  When the Admin deletes a specific unit
  Then the Admin should receive a message asking if they are sure they want to delete a specific unit
  And the topic should no longer exist on the Units dashboard

  Scenario: Making edits to existing units
  When the Admin makes an edit to an existing unit with valid information
  Then the details for the specific unit will be changed successfully
  And the system should confirm that these changes were made

  Scenario: Selecting a unit category
  When the Admin filters a unit using the Category dropdown
  Then the Admin should only see topics which are available to add 

  Examples:
      |java scripting |
      | Python Basics |
      | Database Basics |

  Scenario: Selecting a unit topic
  When the Admin filters a topic using the Topic dropdown
  Then the Admin should only see topics which are available to add

  Example:
      | sql |

  Scenario: Adding a Unit
  When the Admin selects a unit
  Then the Admin will enable the new topic by selecting the + Add Unit button
  And the unit should be visible to the Admin

  Scenario: No units present
  When the Admin opens the Units tab
  Then the Admin should see a blank page with none existing units
  And the Admin will have the option of adding a new unit
  