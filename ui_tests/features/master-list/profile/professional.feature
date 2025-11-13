 @wip
Feature: Manage professional profile information
  As an admin
  The admin views and updates professional details
  So that the admin's career information is accurate on the profile

  Background:
    Given the admin is authenticated in the system
    And the admin is on the Professional tab in Profile Settings

  @smoke
  Scenario: Professional section and fields are visible
    Then the Professional Information section is visible
    And the fields Field of Interest, Skills, Experience, and Education are displayed
    And Field of Interest shows placeholder examples for acceptable entries
    And each field contains existing text or is empty if not yet provided

  Scenario: Admin provides professional details (auto-saves and persists)
  Scenario: Providing professional details (auto-saves and persists)
    When the admin enters valid text into Field of Interest, Skills, Experience, and Education
    Then the changes are saved automatically as the admin types
    And each field displays the updated text immediately
    And the updated values remain after switching to another tab and returning
    And the updated values remain after a page refresh

  Scenario: Updating one field does not alter others
    Given all four fields currently contain valid text
    When the admin updates only the Skills field
    Then the change is saved automatically
    And the Field of Interest, Experience, and Education fields remain unchanged
    And all values remain consistent after a page refresh

  Scenario: Multi-line content is preserved for long-form fields
    When the admin enters multi-line text into Experience and Education
    Then line breaks and spacing are preserved in the displayed content
    And the content remains formatted after a page refresh

  Scenario: Field hints are visible and do not interfere with typing
    Then example text and helper messages are shown where provided
    And the admin can type and auto-save valid information without issues
