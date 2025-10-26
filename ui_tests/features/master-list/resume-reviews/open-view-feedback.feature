Feature: Open Feedback Page
  As an admin
  View the Feedback page
  To review the submitted feedback for the selected resume
  

  @smoke
  Scenario: Feedback Page opens successfully
    Given an admin user is logged into the system
    When an admin navigates to the Resume Reviews section
    And clicks on the "View Feedback" button
    Then the system opens a Feedback Page for that resume 
