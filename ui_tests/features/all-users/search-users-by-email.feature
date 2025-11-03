@wip @smoke
Feature: Search users by email
    In order to locate specific user accounts
    The Admin user needs to be able to search for users by their email address

    Background: 
        Given Admin user is authenticated
        and the admin is viewing all users under the user management page

    @smoke
    
    Scenario: Admin sucessfully searches for a user by email
        When the user list is filtered by a valid email substring
        Then only users whose email includes the specified substring should be displayed
        And each result shows the user's full email address'

