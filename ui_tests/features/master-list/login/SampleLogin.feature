Feature: Admin Sign In
    As an Admin user
    User signs in using valid credentials
    So that user can access the Admin Dashboard

    Background:
        Given user is on the login page

    @smoke
    Scenario: Successful login with valid credentials
        When user enters "qa+100119@qaexternship.testinator.com" and password "1Passw0rd!"
        And user clicks the "Sign In" button
        Then user should be redirected to the Admin Dashboard
        And user should see a welcome message with Admin name