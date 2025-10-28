@admin @mentor @smoke @wip
Feature:   As an admin User
  I want to filter mentors by name or email
  So that I can easily find the mentor I am looking for

  Background:
    Given the admin user is logged into the Percruit website
    And the mentors list is available

  Scenario: Filter mentors by full name
    When the admin user searches for a mentor by full name
    Then the mentors list should display only mentors whose names matches the search criteria
    And the total count should update to reflect the number of matching mentors

  Scenario: Filter mentors by partial name
    When the admin user searches using part of a mentor name
    Then the mentors list should show all mentors whose names contain the part of what was typed in
    And the total count should reflect the number of matches

  Scenario: Filter mentors by email address
    When the admin user searches using a mentor email address
    Then only the mentor with that email address should appear in the list
    And the total count should be 1

  Scenario: Search returns no matches
    When the admin user searches for a name or email that does not exist
    Then the mentors list should display a message saying "No mentors found"
    And the total count should be 0
