Feature: Percruit Dashboard page

    @wip
    Scenario:Admin Dashboard page opens up
    Given user successfully logs in as Admin
    When Admin clicks Dashboard on left side panel
    Then Admin Dashboard page is displayed
    And Admin should see Usage Analytics
    And Admin should see System Health Monitor
    And Admin should see Security Center
    
    @wip
    Scenario:Usage analytics opens up
    Given user is logged in as Admin
    When Admin clicks Usage Analytics box
    Then Usage Analytics page is displayed

    @wip
    Scenario:Student Dashboard page opens up
    Given the Student is authenticated in the system
    When successfully logged in as Student
    Then Student Dashboard page is displayed
    And Student should see Recommended actions for today
    And Student should see Weekly Applications
    And Student should see Resume Reviews
    And Student should see AI practice
    And Student should see Career Diary
    And Student should see Industry News & Trends
    And Student should see Upcoming Events
    And Student should see Assigned Tasks
    And Student should see Career Wins & Achievements
    And Student should see Challenges & Growth Areas
    And Student should see Daily Reflection
    And Student should see Career Journey today
    And Student should see Energy level
    And Student should see Confidence Level

    @wip
    Scenario:Mentor Dashboard opens up
    Given user is logged in as Mentor
    When successfully logged in as Mentor
    Then Mentor Dashboard is displayed
    And the Mentor should see Total Students
    And the Mentor should see Active Tasks
    And the Mentor should see Upcoming Meetings
    And the Mentor should see Student Progress
    And the Mentor should see Meeting Availability Settings
    And the Mentor should see Upcoming Meetings & Expert Interviewa
    And the Mentor should see Tasks
    And the Mentor should see Recent Students
    