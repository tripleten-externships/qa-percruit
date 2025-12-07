Feature: Verify Page Open

  Scenario: When the user navigates to the Career Path page, the page loads as expected
    Given the student is authenticated in the system
    When the user navigates to the Career Path page
    Then the Career Path page displays

  @wip
  Scenario: Current role displays not specified when the restart button is clicked
    Given the student is authenticated in the system
    And the student submits the assessment with valid required details
    When the student clicks the restart button
    Then Current Role displays "not specified"

  @wip
  Scenario: Target role displays not specified when the restart button is clicked
    Given the student is authenticated in the system
    And the student submits assessment with valid details
    When the student clicks the restart button
    Then Target Role displays not specified
