@wip
Feature: Open Continue Review Page
  As an admin
  View the Continue Review page
  To continue reviewing a resume where admin left off in reviewing
  

  @smoke
  Scenario: Continue Review Page opens successfully
    Given the admin user is logged into the system
    When the admin views the Resume Reviews section
    And conitnues reviewing a previously claimed resume using the "Continue Review" button
    Then the system displays the Continue Review page for that resume 