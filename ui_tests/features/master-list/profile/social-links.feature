@wip 
Feature: Manage social and professional links
  As an admin
  The admin views and updates professional social links
  So that the admin's public profiles and portfolio remain accurate

  Background:
    Given the admin is authenticated in the system
    And the admin is on the Social Links tab in Profile Settings
  
  @smoke
  Scenario: Social links section and fields are visible
    Then the Social & Professional Links section is visible
    And the fields LinkedIn Profile, GitHub Profile, and Portfolio / Personal Website are displayed
    And each field contains either a valid URL or is empty if not yet provided
    And placeholder text is displayed for each field with an example format

  Scenario: Entering valid professional links
    When the admin enters valid URLs into the LinkedIn Profile, GitHub Profile, and Portfolio / Personal Website fields
    Then the system saves the changes automatically as the admin types
    And each field displays the updated URL immediately
    And the data remains consistent after switching to another tab and returning
    And the data remains consistent after a page refresh

  Scenario: Updating one social link does not affect others
    Given all three fields currently contain valid URLs
    When the admin updates only the GitHub Profile field
    Then the change is saved automatically
    And the LinkedIn Profile and Portfolio / Personal Website fields remain unchanged
    And all data remains consistent after a page refresh

  Scenario: Social link fields provide clear visual indicators
    Then each field displays its corresponding icon
    And each icon represents the platform accurately
    And the icon remains visible regardless of whether the field contains a URL
