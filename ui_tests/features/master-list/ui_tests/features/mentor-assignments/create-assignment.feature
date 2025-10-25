Feature: Mentor-student asignment

    Feature Description
    As an admin user I want to create a mentor-student assignment
  
  Background:
    Given the admin is logged into the system
    And the admin is on the Mentor Assignment page

  Scenario: Successfully create a mentor-student assignment
    When the admin clicks on the "Create Assignment" button
    And selects a student from the available student list
    And selects a mentor from the available mentor list
    And clicks the "Create Assignment" button
    Then the system should display a success message "Assignment created successfully"
    And the new assignment should appear in the assignments list
    And the assignment should show the correct mentor and student names


    Scenario: Attempt to create an assignment without selecting a mentor
    When the admin clicks on the "Create Assignment" button
    And leaves the mentor field blank
    And selects a student
    And clicks the "Create Assignment" button
    Then the system should not allow assignment

