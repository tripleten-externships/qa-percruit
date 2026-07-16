
#Tag for Before Hook. DO NOT REMOVE
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


   
  

    