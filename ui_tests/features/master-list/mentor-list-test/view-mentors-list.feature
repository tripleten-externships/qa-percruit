@admin @mentor @smoke @wip 
Feature: As an Admin User
  I want to view the list of mentors
  So that I can find mentors available to help me

  Background:
    Given the user is logged into the Percruit website

  Scenario: Mentors list loads successfully
    When the admin user views the mentors list
    Then the mentors list should be displayed
    And each mentor should have their name and details visible
    And the total count of mentors should be displayed at the top of the list

  Scenario: Mentors list is empty
    Given there are no mentors available
    When the admin user views the mentors list
    Then the user should see a message saying "No mentors available"
    And the total count should be 0
