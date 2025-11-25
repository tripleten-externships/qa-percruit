@admin @mentor @smoke @wip 
Feature: As an admin User
  I want to view the list of mentors
  So that I can find mentors available to help me

  Background:
    Given the admin user is logged into the Percruit website

  Scenario: mentors list loads successfully
    When the admin user views the mentors list
    Then the mentor list should be displayed
    And each mentor should have their name
    And mentor email visible
    And number of assigned students visible
    And their students email visible
    And mentor joined date visible
    And the total count of mentors should be displayed at the top of the list visible
