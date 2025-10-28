@wip
Feature: Topics in the Coding Problems page
As an Admin
The Admin wants to view and update topics in the Coding Problems page
so that topics can be tracked or managed accurately

Background:
  Given The Admin is logged in using valid credentials
  And the Admin is on the "Topics" tab in Coding Problems

  @smoke
  Scenario: View existing topics
  When the Admin opens the Coding Problems page
  And accesses the "Topics" tab
  Then the Admin should see all existing topics

  Scenario: Deletion of all existing topics
  When the Admin deletes a specific topic
  Then the Admin should receive a message asking if they are sure they want to delete a specific topic 
  And the topic should no longer exist on the "Topics" dashboard

  Scenario: Making edits to existing topics
  When the Admin makes an edit to an existing topic with valid information
  Then the details for the specific topic will be changed successfully
  And the system should confirm that these changes were made

  Scenario: Selecting a topic category
  When the Admin filters a topic using the dropdown
  Then the Admin should only see topics which are available to add 

  Examples:
      | java scripting |
      | Python Basics |
      | Database Basics |

  Scenario: Adding a topic
  When the Admin selects a topic
  Then the Admin will enable the new topic by selecting the "+ Add Topic" button
  And the topic should be visible to the Admin

  Scenario: No topics present
  When the Admin opens the "Topics" tab
  Then the Admin should see a blank page with none existing topics
  And the Admin will have the option of adding a new topic
  