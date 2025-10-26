Feature: Filter by status tabs
  As an admin
  View a list of reviews and their status
  In order to then view all the resumes under one particular status
  

  @smoke
  Scenario: Status tabs are visible
    Given an admin user is logged into the system
    When an admin navigates to the Resume Reviews section
    Then the system loads a list of all reviews along with four status tabs: "Pending", "In Progress", "Completed", and "Cancelled"

    @smoke 
    Scenario: Pending reviews are visible
    Given an admin user is on the Resume Reviews All Reviews section
    When an admin clicks on the Pending status tab
    Then the system displays only reviews with a Pending status

    @smoke
    Scenario: In Progress reviews are visible
    Given an admin user is on the Resume Reviews All Reviews section
    When an admin clicks on the In Progress status tab
    Then the system displays only reviews with an In Progress status

    @smoke
    Scenario: Completed reviews are visible
    Given an admin user is on the Resume Reviews All Reviews section 
    When an admin clicks on the Completed status tab
    Then the system displays only reviews with a Completed status

    @smoke
    Scenario: Cancelled reviews are visible
    Given an admin user is on the Resume Reviews All Reviews section 
    When an admin clicks on the Cancelled status tab
    Then the system displays only reviews with a Completed status