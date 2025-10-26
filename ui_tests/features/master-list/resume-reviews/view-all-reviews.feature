Feature: View all reviews
  As an admin
  View a list of all reviews and their status labels 
  In order to track progress of reviews 
  

  @smoke
  Scenario: Resume Reviews list loads successfully
    Given an admin user is logged into the system
    When an admin navigates to the Resume Reviews section
    Then the system loads a list of all reviews with their status labels