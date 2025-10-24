Feature: Admin Dashboard Load 
As an admin user
I want to sign in using valid credentials
So that I can make sure the Admin Dashboard loads correctly

Background:
    Given I am on the login page

@smoke
Scenario: Sucessful login and dashboard loads without issue
    When I enter my email "admin@example.com" and password "ValidPassword123!"
    And I click the "Sign In" button
    Then I should be redirected to the Admin Dashboard
    And I should see the Dashboard loads correctly