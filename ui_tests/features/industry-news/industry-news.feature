@wip
Feature: Industry news screen tests


Scenario: When user goes to the page, the page loads as expected.
    Given the Student is authenticated in the system
    When the user navigates to the Industry News page
    Then the Industry News page displays