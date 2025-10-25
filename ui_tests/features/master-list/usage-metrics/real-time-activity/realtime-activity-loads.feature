Feature: Real-time Activity Tab
  As a user
  I want to view the Real-time Activity tab
  So that I can see live user activity data

  @ui @realtime
  Scenario: Verify Real-time Activity tab loads correctly
    Given I am on the Admin Dashboard page
    When I click on the "Usage Metrics" option
    And I click on the "Real-time Activity" tab
    Then I should see the Real-time Activity tab content loaded successfully