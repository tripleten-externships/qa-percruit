@dariel
Feature: Edit basic profile information
  As an Admin
  I want to edit basic user information
  So that I can ensure profile details update automatically and remain accurate

  Background:
    Given the Admin is authenticated in the system
    And the Admin is on the Profile Settings page
    And the Admin is viewing the Basic Information section

  Scenario: Editable fields are visible and correctly labeled
    Then the fields Full Name, Phone Number, Location, and Timezone should be editable
    And the Email field should be read-only
    And each field should display its current value or be empty if optional

  Scenario: Admin updates profile details successfully
    When the Admin updates the Full Name and Location with valid information
    Then the changes should automatically save as the Admin types
    And the updated values should immediately appear in the Basic Information section
    And the data should remain consistent after a page refresh

  Scenario: Admin clears a field and decides to leave it blank
    Given the Phone Number field already contains a valid value
    When the Admin clears the Phone Number field in the Basic Information section
    Then the change should automatically save as the Admin types
    And no validation or error message should appear
    And the section should continue displaying valid data for all other fields
    And the cleared Phone Number field should remain empty after a page refresh

  Scenario: Admin navigates away after making changes
    When the Admin updates one or more editable fields
    And navigates to another settings tab
    Then the updated values should already be saved
    And returning to the Basic Information section should display the latest data
