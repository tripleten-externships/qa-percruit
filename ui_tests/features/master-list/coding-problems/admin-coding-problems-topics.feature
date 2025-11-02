@wip
Feature: Topics in the Coding Problems page
As an Admin
The Admin wants to view and update topics in the Coding Problems page
so that topics can be tracked or managed accurately

Background:
  Given The Admin is logged in using valid credentials
  And the Admin is on the Topics tab in Coding Problems

@smoke
Scenario: View existing topics
  When the Admin views the Topics page in Coding Problems
  Then the all existing topics should be viewable to the Admin

Scenario: No topics present
  When the Admin opens the Topics tab
  Then the Admin should see a blank page with none existing topics
  And the Admin will have the option of adding a new topic

Scenario: Selecting a category
  When the Admin filters a topic using the Select Category dropdown
  Then the Admin should be able to select a category from the existing Select Category dropdown list
  
  Examples:
      | java scripting |
      | Python Basics |
      | Database Basics |

Scenario: Adding a topic
  When the Admin selects a topic
  Then the Admin will enable the new topic by selecting the + Add Topic button
  And the existing topic will be visible to the Admin

Scenario: Updating an existing topic
  When the Admin makes an edit to an existing topic with valid information
  Then the Admin should be able to save the changes in the existing topic
  And the updated topic should be correctly displayed on the Topics page

Scenario: Deletion of an existing topic
  When the Admin deletes a specific topic
  Then the Admin should receive a message asking if they are sure they want to delete a specific topic 
  And the topic should no longer exist on the Topics page

