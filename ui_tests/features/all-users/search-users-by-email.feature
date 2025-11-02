@wip @smoke
Feature: Search users by email
    As an Admin
    I want to search for users via their email address
    So I can locate specific user accounts

    Background: 
        Given Admin user is authenticated
        and the admin is viewing all users under the user management page

    @smoke
    
    Scenario: Admin sucessfully searches for a user by email
        When the Admin searches for a user with the email countaining "remya"
        Then matches that include "remya" are displayed successfully
        And each results shows the users full email address
