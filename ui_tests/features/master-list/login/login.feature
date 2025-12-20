@wip
Feature: Percruit Website Login
    As a Admin i want to be able to login successfully

     Background:
    Given the admin is on the login page
    
    @smoke
    Scenario: Admin successfully logs in to the Percruit website
    Given the admin is logged into the system
    When the admin initiates a logout
    Then the admin should be signed out successfully
    And the login page should be displayed