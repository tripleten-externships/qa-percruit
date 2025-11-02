@wip @smoke
Feature: Open user details
    As an Admin
    I want to open a user 
    So I can see the users
    Admin user open user's details

    Background: 
        Given the Admin is authenticated 
        and the Admin is viewing all users under the user management page

    @smoke
    Scenario: the Admin user is able to open user details
        When user signed in as Admin
        And the Admin opens a user's details
        Then user's details are displayed successfully
