Feature: Admin Dashboard Load 
As an admin user
Admin is able to verify dashboard loads correctly

Background:
    Given The admin is on the login page

Scenario: Sucessful login and dashboard loads without issue
    Given admin navigates to "https://stage.tripleten.percruit.com/"
    And enters email "admin@example.com" in the email field
    And enters password "ValidPassword123!" in the password field
    And clicks the "Sign In" button
    Then admin will be redirected to the dashboard
    And see the dashboard loads correctly