Feature: View all users
    As an Admin user
    Admin User signed in 
    So Admin user can access the All Users


    Background: 
        Given user is on the All Users page

    @smoke
    Scenario: all users list is showed
        When user signed in as Admin
        And Admin user clicks the "All Users" button
        Then Admin user can see the list of All Users registered at the platform
        