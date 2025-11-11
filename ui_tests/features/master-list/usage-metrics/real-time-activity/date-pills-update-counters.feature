Feature: Time Filters on Usage Metrics page
  As an Admin user
  Verify that the time filters update the counts correctly
  So that admin can view accurate metrics based on the selected time range

Background:
    Given the Admin is authenticated in the system
    And the Admin navigates to the Usage Metrics page

@ready
Scenario Outline: Verify Time Filters update counts correctly
  When the user is on Real Time Activity tab
  And apply the "<timeFilter>" time filter
  Then user should see the usage counts updated for "<timeFilter>"

    Examples:
    | timeFilter       |
    | Today            |
    | Last 7 days      |
    | This Year        |