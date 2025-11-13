@wip
Feature: Topics in the Coding Problems page
As an Admin
the Admin wants to view and update topics in the Coding Problems page
so that topics can be tracked or managed accurately

Background:
  Given the Admin is logged in using valid credentials
  And the Admin is on the Topics tab in Coding Problems

Scenario: View existing topics
  When the Admin views the Topics page in Coding Problems
  Then all existing topics should be viewable to the Admin

Scenario: Selecting a category
  When the Admin filters a topic using the Select Category dropdown
  Then the Admin should be able to select a category from the existing Select Category dropdown list

Scenario: Adding a topic
  When the Admin selects a topic
  Then the Admin will enable the new topic by selecting the + Add Topic button
  And  the newly added topic will be visible to the Admin

Scenario: Updating an existing topic
  When the Admin makes an edit to an existing topic with valid information
  Then the Admin should be able to save the changes in the existing topic
  And  the updated topic should be displayed on the Topics page

Scenario: Deletion of an existing topic
  When the Admin deletes a specific topic
  Then the Admin should receive a message asking if they are sure they want to delete the specific topic 
  And  the topic should no longer exist on the Topics page after deletion confirmation

Scenario: No topics present
  When the Admin opens the Topics tab
  Then the Admin should see a blank page with none existing topics
  And the Admin will have the option of adding a new topic
  