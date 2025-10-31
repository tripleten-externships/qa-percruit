Feature: Percruit Website Login

  Scenario: Student successfully logs in to the Percruit website
    Given the Student is authenticated in the system
    Then the Student should be able to see the Student Dashboard

  @wip
  Scenario: Mentor successfully logs in to the Percruit website
    Given the Mentor is authenticated in the system
    Then the Mentor should be able to see the Mentor Dashboard
