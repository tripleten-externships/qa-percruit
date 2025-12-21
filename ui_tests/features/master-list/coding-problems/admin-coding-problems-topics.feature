@indev
Feature: Topics in the Coding Problems page
As an Admin
the Admin wants to view and update topics in the Coding Problems page
so that topics can be tracked or managed accurately

Background:
  Given the Admin is authenticated in the system
  And the Admin is on the Topics tab in Coding Problems

Scenario:  View Topics page elements
    When the Admin views the Topics tab
    Then the Topics heading should be visible
    And the Select Category dropdown should be visible
    And the Add Topic button should be visible

  Scenario: Select a category from Select Category dropdown
    When the Admin opens the Select Category dropdown
    Then the Admin should see available categories
    When the Admin selects a category
    Then the Admin should be able to click the Add Topic button

  Scenario: Add Topic popup opens after selecting a category
    Given the Admin has selected a category
    When the Admin clicks the Add Topic button
    Then the Create Topic popup should be displayed

  # Scenario: Update an existing topic
  # Requires existing topic data and editable fields

  # Scenario: Delete an existing topic
  # Requires delete functionality and confirmation handling

  # Scenario: No topics present
  # Requires controlled test data or empty environment
