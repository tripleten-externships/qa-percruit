Feature: Admin Forgot Password Link
  As an administrator
  I want to use the Forgot Password link
  So that I can reset my password when needed

  Background:
    Given the admin is on the login page

  Scenario: Forgot Password link redirects to reset page
    When the admin clicks the "Forgot Password" link
    Then the system should navigate to the password reset page
    And the page should display a form to enter the registered email address

  Scenario: 
    Given the admin is on the reset page
    When the admin enters a valid email and clicks the "Send Reset Link" button
    Then the admin should see a "password reset link sent" success message