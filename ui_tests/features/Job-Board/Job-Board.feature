Feature:Job Board screen tests


Scenario: When the user goes to the page,page loads as expected
    Given the Student is authenticated in the system
   When I add the title "user goes to job board page" to the log
    When the user navigates to the Job Board page
    Then the Job Board page displays