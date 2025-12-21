Feature:Resume Manager screen tests


Scenario: When the user goes to the page,page loads as expected
    Given the Student is authenticated in the system
    When the user navigates to the Resume Manager page
    Then the Resume Manager page displays

