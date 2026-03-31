Feature: Percruit Website Logout
    As a admin i want to be able to logout successfully
    
    Background:
    Given the admin is logged into the system to logout

    Scenario: Admin successfully logs out of the Percruit website
    Given the admin is on the home page
    When the admin initiates a logout
    Then the admin should be signed out successfully
    And the login page should be displayed