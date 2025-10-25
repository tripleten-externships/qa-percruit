Feature: Time Filters on Usage Metrics page
  As an Admin user
  I want to verify that the time filters update the counts correctly
  So that I can view accurate metrics based on the selected time range

  
Scenario Outline: Verify Time Filters update counts correctly
  Given I am on the Admin Dashboard page
  When I click on the Usage Metrics option
  And I apply the "<timeFilter>" time filter
  Then I should see the usage counts updated for "<timeFilter>"

    Examples:
    | timeFilter       |
    | Today            |
    | Yesterday        |
    | Last 7 days      |
    | This Month       |
    | Last 3 Months    |
    | Last 6 Months    |
    | This Year        |