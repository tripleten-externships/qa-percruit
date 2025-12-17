
Feature: Assignment Table Loads with the correct row of Mentor/Student/Status/Date
  As an admin user
  I want to verify that the assignment table loads correctly
  So that I can view all mentor-student assignments accurately

  Scenario: Assignment table loads successfully with data
    Given the admin is logged into the system
    And the admin navigates to the Assignments page
    When the assignment table loads
    Then the system displays all existing mentor-student assignments
    And each row includes the mentor name, student name, status, and date assigned
