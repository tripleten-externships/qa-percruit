 Feature: Incomplete Mentor Info Tool

  As an admin user
  I want to identify students with missing profile information
  So that I can ensure all student profiles are complete

  Scenario: Display students with incomplete information
    Given “Admin” is logged into the system
    And “Admin” opens the Incomplete Info tool
    When the system scans student profiles
    Then “Admin” sees a list of students with missing required fields
    And each student's entry displays which fields are incomplete

  Scenario: Display message when all student profiles are complete
    Given “Admin” is logged into the system
    And “Admin” opens the Incomplete Info tool
    When the system finds no missing student information
    Then “Admin” sees a message “Mentor Assignment created successfully”
