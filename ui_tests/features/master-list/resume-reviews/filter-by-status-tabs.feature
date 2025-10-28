@wip
Feature: Filter Resume Reviews by status tabs
  As an admin
  View a list of reviews and their status
  In order to then view all the resumes under one particular status
  

  @smoke
  Scenario: Status tabs are visible
    Given the admin user is logged into the system
    When the admin views the Resume Reviews section
    Then the system presents four available status tabs: "Pending", "In Progress", "Completed", and "Cancelled"

    @smoke 
    Scenario: Pending reviews are visible
    Given the admin user is on the Resume Reviews All Reviews section
    When the admin filters reviews by the Pending status tab
    Then the system displays all reviews with a Pending status

    @smoke
    Scenario: In Progress reviews are visible
    Given the admin user is on the Resume Reviews All Reviews section
    When the admin filters reviews by the In Progress status tab
    Then the system displays all reviews with an In Progress status

    @smoke
    Scenario: Completed reviews are visible
    Given the admin user is on the Resume Reviews All Reviews section 
    When the admin filters reviews by the Completed status tab
    Then the system displays all reviews with a Completed status

    @smoke
    Scenario: Cancelled reviews are visible
    Given the admin user is on the Resume Reviews All Reviews section 
    When the admin filters reviews by the Cancelled status tab
    Then the system displays all reviews with a Completed status