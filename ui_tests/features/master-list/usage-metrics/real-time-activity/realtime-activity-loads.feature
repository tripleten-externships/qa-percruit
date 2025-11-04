Feature: Real-time Activity Tab
  As a user
  Verify that the Real-time Activity tab load correctly
  So that user can see live user activity data

@wip
  Scenario: Verify Real-time Activity tab loads correctly
    Given the user on the Admin Dashboard page
    When the user click on the "Usage Metrics" tab
    And the user click on the "Real-time Activity" tab
    Then the user should see the Real-time Activity tab content loaded successfully