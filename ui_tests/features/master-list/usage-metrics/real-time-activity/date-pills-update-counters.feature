 @wip
Feature: Time Filters on Usage Metrics page
  As an Admin user
  I want to verify that the time filters update the counts correctly
  So that I can view accurate metrics based on the selected time range

@wip
Scenario Outline: Verify Time Filters update counts correctly
  Given the user is on Admin Dashboard page
  When the user click on the Usage Metrics tab
  And apply the "<timeFilter>" time filter
  Then user should see the usage counts updated for "<timeFilter>"

    Examples:
    | timeFilter       |
    | Today            |
    | Last 7 days      |
    | This Year        |