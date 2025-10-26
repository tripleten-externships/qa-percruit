Feature: Open Continue Review Page
  As an admin
  View the Continue Review page
  To continue reviewing a resume where admin left off in reviewing
  

  @smoke
  Scenario: Continue Review Page opens successfully
    Given an admin user is logged into the system
    When an admin navigates to the Resume Reviews section
    And clicks on the "Continue Review" button
    Then the system opens the Continue Review page for that resume 