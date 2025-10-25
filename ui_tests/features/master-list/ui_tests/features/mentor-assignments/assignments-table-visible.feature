Feature: Assignment Table Loads Correctly

  As a Admin
  I want the assignment table to load correctly
  So that I can view all mentor-student assignments accurately

  Scenario: Assignment table loads successfully with data
    Given “Admin” is logged into the system
    And “Admin” navigates to the Assignments page
    When the page loads
    Then the system displays all existing mentor-student assignments
    And each row shows the mentor name, student name, status, and date assigned
