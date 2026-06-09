Feature: Study screen tests

    
Scenario: When user goes to the page, the page loads as expected.
    Given the Student is authenticated in the system
    When the user navigates to the Study page
    Then the Study page is displayed

Scenario: When user clicks on the Search Questions box, the box is focused and ready for input.
    Given the Student is authenticated in the system
    When the user navigates to the Study page
    Then the Study page is displayed
    Then the Search Questions box is clicked

