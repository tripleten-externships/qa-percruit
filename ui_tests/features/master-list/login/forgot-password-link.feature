Feature: Admin Forgot Password Link
  As an administrator
  I want to use the Forgot Password link
  So that I can reset my password when needed

  Background:
    Given the admin is on the login page

    @smoke
  Scenario: Forgot Password link redirects to reset page
    When the admin clicks the "Forgot Password" link
    Then the system should navigate to the password reset page
    And the page should display a form to enter the registered email address