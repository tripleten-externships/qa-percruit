Feature: Total Actions count
  As an Admin user
  Verify that the peak activity count at the bottom updates correctly
  So that Admin can see accurate activity data for the selected time range

Background:
    Given the Admin is authenticated in the system
    And the Admin navigates to the Usage Metrics page

  Scenario Outline: Verify Total Actions count updates correctly for each Time Filter
    When the user is on Real Time Activity tab
    And apply the "<timeFilter>" time filter
    Then the user should see the peak activity count updated for "<timeFilter>"

    Examples:
    | timeFilter       |
    | Today            |
    | Yesterday        |
    | Last 7 days      |
    | This Year        |