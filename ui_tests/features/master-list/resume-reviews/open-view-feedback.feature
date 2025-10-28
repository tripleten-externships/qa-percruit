@wip
Feature: Open Feedback Page
  As an admin
  View the Feedback page
  To review the submitted feedback for the selected resume
  

  @smoke
  Scenario: Feedback Page opens successfully
    Given the admin user is logged into the system
    When the admin views the Resume Reviews section
    And requests to view feedback using the "View Feedback" button
    Then the system displays a Feedback Page for that resume 
