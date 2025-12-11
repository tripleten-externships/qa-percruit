Feature: Student Profile Screen Tests

@wip
Scenario: When the student goes to the profile page, the page loads as expected.
    Given the Student is authenticated in the system
    When the student navigates to the Profile page
    Then the Student Profile page displays