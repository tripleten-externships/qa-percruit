Feature: Total Actions count
  As an Admin user
  I want to verify that the Total Actions count at the bottom updates correctly
  So that I can see accurate activity data for the selected time range

  @ui @usageMetrics
  Scenario Outline: Verify Total Actions count updates correctly for each Time Filter
    Given I am on the Admin Dashboard page
    When I click on the Usage Metrics option
    And I note the current Total Actions count
    And I apply the "<timeFilter>" time filter
    Then I should see the Total Actions count updated for "<timeFilter>"

    Examples:
    | timeFilter       |
    | Today            |
    | Yesterday        |
    | Last 7 days      |
    | This Month       |
    | Last 3 Months    |
    | Last 6 Months    |
    | This Year        |