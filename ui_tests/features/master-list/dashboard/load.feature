@wip
Feature: Admin Dashboard Load
  As an admin, I want to log in successfully to my account
  So that I can verify the dashboard loads correctly

  Background:
    Given the admin is authenticated in the system

  Scenario: Admin successfully logs in and views personalized dashboard
    Then they should see a message saying "Admin Dashboard" at the top
    And they should see the Usage Analytics section
    And they should see the System Health Monitor section
    And they should see the Security Center section