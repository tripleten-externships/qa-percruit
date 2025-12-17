@admin-auth
Feature: Mentor-Student Assignments
  The system should allow administrators to link
  students with mentors to ensure proper mentorship assignments.

    Scenario: Successful creation of a mentor-student assignment
      Given an admin is authorized to manage mentor-student assignments
      When the admin creates a new assignment with a valid mentor and student selected
      Then the system confirms successful creation
      And the new mentor-student pairing is displayed in the assignments list
      And an admin is authorized to manage mentor-student assignments
      And the admin creates a new assignment with a valid mentor and student selected
      Then the system confirms successful creation
      And the new mentor-student pairing is displayed in the assignments list


    Scenario: Failed creation due to missing mentor selection
      Given an admin is authorized to manage mentor-student assignments
      When the admin attempts to create a new assignment without selecting a mentor
      Then the system rejects the request
      And displays an error indicating that a mentor selection is required
  

    