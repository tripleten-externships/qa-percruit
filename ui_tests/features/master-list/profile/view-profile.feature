Feature: View profile settings
  As an Admins
  I want to view profile settings
  So that I can confirm the profile UI and core data render correctly

  Background:
    Given the Admin is authenticated in the system
    And the Admin is on the Profile Settings page

 
  Scenario: Profile tab is the default view with key sections
    Then the Profile tab is active
    And the tabs Professional, Social Links, Notifications, and Privacy & AI are available
    And the sections "Profile Photo", "Basic Information", and "About Me" are visible


  Scenario: Profile photo area provides identity and guidance
    When the Admin views the Profile Photo section
    Then the admins display name and email are shown
    And guidance is displayed for uploading a professional headshot with a recommended minimum size


  Scenario: Basic Information shows required and optional fields
    When the Admin views the Basic Information section
    Then the fields Full Name, Email, Phone Number, Location, and Timezone are visible
    And Email is read-only with helper text that it cannot be changed
    And Phone Number is marked optional
    And Timezone is selectable from a list
    And helper text indicates the browser-detected timezone


  Scenario: Optional fields may be empty without error
    Given the Admin is viewing the Basic Information section
    Then the Phone Number field may be empty
    And no validation error is displayed for leaving optional fields blank


  Scenario: Data on screen reflects the stored account values
    When the Admin views the profile
    Then the displayed name, email, and timezone match the accounts stored data
