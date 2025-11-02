@wip @smoke
Feature: View all users
    As an Admin
    I want to view all users
    So I access the registered users 

    Background: 
        Given the Admin is authenticated
        and the user is viewing all users under the user management page

    @smoke
    Scenario: Admin successfully view all users
        When Admin view all users list
        Then the list of users is displayed at the screen
        
