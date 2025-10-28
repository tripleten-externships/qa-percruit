Feature: Search users by email
    As an Admin user
    Admin User signed in 
    So Admin user can access the All Users 
    Admin user search users by email


    Background: 
        Given Admin user is on the All Users page
        Given Admin user is on Search by email or name field

    @smoke
    Scenario: the email that Admin user try to find is search
        When user signed in as Admin
        And Admin user clicks the "All Users" button
        Then Admin user clicks on "Search by email or name" field
        And Admin user adds "remya" and the options are going to appear