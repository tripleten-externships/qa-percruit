Feature: Open user details
    As an Admin user
    Admin User signed in 
    So Admin user can access Usage Metrics
    Admin user open users details


    Background: 
        Given Admin user is on Usage Metrics
        Given Admin user clicks in "View detailed analysis"

    @smoke
    Scenario: the Admin user is able to see the user details
        When user signed in as Admin
        And Admin user clicks the "Usage metrics" button
        Then Admin user clicks on "Student Readiness" button
        And Admin user clicks "View detailed analysis" icon