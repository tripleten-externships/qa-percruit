Feature: Real-time Activity Tab
  As a user
  Verify that the Real-time Activity tab load correctly
  So that user can see live user activity data

Background:
    Given the Admin is authenticated in the system
    And the Admin navigates to the Usage Metrics page

Scenario: Verify Real-time Activity tab loads correctly
    When I add the title "Scenario: Verify Real-time Activity tab loads correctly" to the log
    And the user click on the "Real-time Activity" tab
    Then the user should see the Real-time Activity tab content loaded successfully