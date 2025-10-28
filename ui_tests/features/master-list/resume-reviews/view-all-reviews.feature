@wip
Feature: View all Resume Reviews
  As an admin
  View a list of all reviews and their status labels 
  In order to track progress of reviews 
  

  @smoke
  Scenario: Resume Reviews list loads successfully
    Given the admin user is logged into the system
    When the admin views the Resume Reviews section
    Then the system displays a list of all reviews with their status labels