 @wip
Feature: Total Actions count
  As an Admin user
  Verify that the peak activity count at the bottom updates correctly
  So that Admin can see accurate activity data for the selected time range

  Scenario Outline: Verify Total Actions count updates correctly for each Time Filter
    Given the user is on Admin Dashboard page
    When the user click on the Usage Metrics tab
    And apply the "<timeFilter>" time filter
    Then the user should see the peak activity count updated for "<timeFilter>"

    Examples:
    | timeFilter       |
    | Today            |
    | Yesterday        |
    | Last 7 days      |
    | This Year        |