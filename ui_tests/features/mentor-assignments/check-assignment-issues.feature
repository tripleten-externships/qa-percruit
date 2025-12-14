
Feature: Incomplete Mentor Info Tool
  As an admin user
  I want to identify students with missing profile information
  So that I can ensure all student profiles are complete

  Scenario: Display message when all student profiles are complete
    Given all student profiles contain the required information
    When the admin accesses the Incomplete Info tool
    Then the system displays the message "Mentor Assignment created successfully"

