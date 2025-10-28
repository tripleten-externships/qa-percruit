@wip
Feature: Claim a resume for pending review
  As an admin
  Change the status of a resume from "Pending" to "In Progress"
  To begin resume review process 

  @smoke
  Scenario: Successfully claiming a resume for review
    Given the admin user is logged into the system
    When the admin views the Resume Reviews section
    And claims a resume for review using the "Claim & Review" button
    Then the system changes the status of a resume from "Pending" to "In Progress"
