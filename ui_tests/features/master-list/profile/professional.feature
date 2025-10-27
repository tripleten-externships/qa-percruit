@settings @admin @smoke @wip
Feature: Manage professional profile information
  As an Admin
  I want to view and update my professional details
  So that my career information is accurate on my profile

  Background:
    Given the Admin is authenticated in the system
    And the Admin is on the "Professional" tab in Profile Settings

  Scenario: Professional section and fields are visible
    Then the "Professional Information" section is visible
    And the fields "Field of Interest", "Skills", "Experience", and "Education" are displayed
    And "Field of Interest" shows placeholder examples for acceptable entries
    And each field contains existing text or is empty if not yet provided

  Scenario: Admin provides professional details (auto-saves and persists)
    When the Admin enters valid text into "Field of Interest", "Skills", "Experience", and "Education"
    Then the changes should automatically save as the Admin types
    And each field should display the updated text immediately
    And the updated values remain after switching to another tab and returning
    And the updated values remain after a page refresh

  Scenario: Updating one field does not alter others
    Given all four fields currently contain valid text
    When the Admin updates only the "Skills" field
    Then the change should automatically save
    And the "Field of Interest", "Experience", and "Education" fields remain unchanged
    And all values remain consistent after a page refresh

  Scenario: Multi-line content is preserved for long-form fields
    When the Admin enters multi-line text into "Experience" and "Education"
    Then the line breaks and spacing should be preserved in the displayed content
    And the content remains formatted after a page refresh

  Scenario: Field hints are visible and do not interfere with typing
    Then example text and helper messages are shown where provided
    And the Admin can still type and auto-save valid information without any issues
