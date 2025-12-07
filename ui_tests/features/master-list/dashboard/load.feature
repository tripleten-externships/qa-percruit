@indev
Feature: Admin Dashboard Load 
As an admin, I want to login successfully to my account
So I can verify the dashboard loads correctly

Background:
    Given The admin is on the login page

Scenario: Successful login to dashboard without issue
    #Given a registered admin  
    When they log in with valid credentials
    Then they should be redirected to their dashboard 
    And see the dashboard loads correctly