Feature: Total Actions count
  As an Admin user
  Verify that the Total Actions count at the bottom updates correctly
  So that Admin can see accurate activity data for the selected time range

  @ui @usageMetrics
  Scenario Outline: Verify Total Actions count updates correctly for each Time Filter
    Given the user is on Admin Dashboard page
    When the user click on the Usage Metrics option
    And note the current Total Actions count
    And apply the "<timeFilter>" time filter
    Then the user should see the Total Actions count updated for "<timeFilter>"

    Examples:
    | timeFilter       |
    | Today            |
    | Yesterday        |
    | Last 7 days      |
    | This Month       |
    | Last 3 Months    |
    | Last 6 Months    |
    | This Year        |