Feature: Percruit Website Login

  Scenario: Student successfully logs in to the Percruit website
    Given the Student is authenticated in the system
    Then the Student should be able to see the Student Dashboard
