Feature: Percruit Website Login
    As a Admin i want to be able to login successfully

     Background:
    Given the admin is on the login page
    
    @smoke
    Scenario: Admin successfully logs in to the Percruit website
        Given I am on the Percruit homepage
        When the user enters a valid username and valid password
        And clicks the "Login" button
        Then the user should be redirected to the dashboard
        And a welcome message should be displayed