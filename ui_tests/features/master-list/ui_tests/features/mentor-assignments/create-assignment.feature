Feature: Mentor-Student Assignment

  As an admin user
  I want to create a mentor-student assignment
  So that each student is properly linked to a mentor
  Scenario: Successful creation of a mentor-student assignment
    Given “Admin” is logged into the system
    And “Admin” is on the Mentor Assignment page
    And “Admin” selects “Student” from the student list
    And “Admin” selects “Mentor” from the mentor list
    When “Admin” clicks the “Create Assignment” button
    Then the system displays a “Assignment created successfully” message
    And the new assignment appears in the list showing “Mentor” and “Student”

  Scenario: Failed creation due to missing mentor selection
    Given “Admin” is logged into the system
    And “Admin” is on the Mentor Assignment page
    And “Admin” selects “Student Alex” from the student list
    And leaves the mentor field blank
    When “Admin” clicks the “Create Assignment” button
    Then the system prevents the creation of the assignment
  

