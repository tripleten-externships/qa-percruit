@eric
Feature:   As an admin User
  I want to expand my mentor entry to see their assigned students
  So that I can easily view which students belong to each mentor

  Background:
    Given the admin User is logged into the Percruit website
    And the mentors list with assigned students is available

  Scenario: Expanding a mentor shows their assigned students
    When the admin user expands a mentor in the mentors list
    Then the mentor assigned students should be displayed under that mentor
    And each student should show their name and profile details

  Scenario: Collapsing a mentor hides their assigned students
    Given a mentor assigned students are currently visible
    When the admin user collapses that mentor
    Then the list of assigned students should be hidden

  Scenario: mentor with no assigned students
    When the admin user expands a mentor who has no assigned students
    Then a message should be displayed saying "No students assigned"

  Scenario: Multiple mentors expanded at once
    When the admin user expands more than one mentor
    Then each expanded mentor should display their own assigned students
    And the student lists should remain visible independently
