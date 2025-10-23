Feature: Admin Sign In
  As an admin user
  I want to sign in using valid credentials
  So that I can access the Admin Dashboard

  Background:
    Given I am on the login page

  @smoke
  Scenario: Successful login with valid credentials
    When I enter my email "admin@example.com" and password "ValidPassword123!"
    And I click the "Sign In" button
    Then I should be redirected to the Admin Dashboard
    And I should see a welcome message with my admin name
