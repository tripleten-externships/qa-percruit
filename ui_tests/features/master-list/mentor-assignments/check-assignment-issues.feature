 @wip
Feature: Incomplete Mentor Info Tool
  As an admin user
  I want to identify students with missing profile information
  So that I can ensure all student profiles are complete

  Scenario: Display students with incomplete information
    Given student profiles exist with missing required fields
    When the admin accesses the Incomplete Info tool
    Then the system displays a list of students with incomplete information
    And each student entry includes the specific fields that are incomplete

  Scenario: Display message when all student profiles are complete
    Given all student profiles contain the required information
    When the admin accesses the Incomplete Info tool
    Then the system displays the message "Mentor Assignment created successfully"

