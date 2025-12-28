Feature: Verify Page Open

  Scenario: When the user navigates to the Career Path page, the page loads as expected
    Given the student is authenticated in the system
    When I add the title When the user navigates to the Career Path page, the page loads as expected to the log
    When the user navigates to the Career Path page
    Then the Career Path page displays

 
  Scenario: Current role displays not specified when the restart button is clicked
    Given the student is authenticated in the system
    Given the student navigates to the Career Path page
    Given the student submits the assessment with valid required details
    When I add the title Current role displays not specified when the restart button is clicked to the log
    When the student clicks the restart button
    Then Current Role displays Not specified


  Scenario: Target role displays not specified when the restart button is clicked
    Given the student is authenticated in the system
    And the student navigates to the Career Path page
    And the student submits the assessment with valid required details
    When I add the title Target role displays not specified when the restart button is clicked to the log
    When the student clicks the restart button
    Then Target Role displays Not specified
