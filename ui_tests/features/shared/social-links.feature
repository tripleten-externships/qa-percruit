@wip 
Feature: Manage social and professional links
  As an Admin
  I want to view and update my professional social links
  So that my public profiles and portfolio remain accurate

  Background:
    Given the Admin is authenticated in the system
    And the Admin is on the Social Links tab in Profile Settings
  
  @smoke
  Scenario: Social links section and fields are visible
    Then the Social & Professional Links section is visible
    And the fields LinkedIn Profile, GitHub Profile, and Portfolio / Personal Website are displayed
    And each field contains either a valid URL or is empty if not yet provided
    And placeholder text is displayed for each field with an example format

  Scenario: Admin enters valid professional links
    When the Admin enters valid URLs into the LinkedIn Profile, GitHub Profile, and Portfolio / Personal Website fields
    Then the system should automatically save the changes as the Admin types
    And each field should display the updated URL immediately
    And the data should remain consistent after switching to another tab and returning
    And the data should remain consistent after a page refresh

  Scenario: Admin updates one social link without affecting others
    Given all three fields currently contain valid URLs
    When the Admin updates only the GitHub Profile field
    Then the change should automatically save
    And the LinkedIn Profile and Portfolio / Personal Website fields should remain unchanged
    And all data should remain consistent after a page refresh

  Scenario: Social link fields provide clear visual indicators
    Then each field should display its corresponding icon
    And each icon should represent the platform accurately
    And the icon should remain visible regardless of whether the field contains a URL
