@wip
Feature: Student Readiness Tab under Usage Metrics
  As an Admin user
  Admin wants to access the Student Readiness tab under Usage Metrics
  So that Admin can view and analyze student readiness data

  Background:
    Given the Admin is authenticated in the system
    And the Admin user navigates to usage-metrics page

  
  
  @wip
    Scenario: Student Readiness tab loads correctly under Usage Metrics
    When the Admin views the "Student Readiness" metrics
    Then the Admin should see the "Student Readiness Analysis" table
    And the table should include the following columns:
      | Student | Readiness Score | Status | Jobs Applied | Interviews Completed | Mentor | Actions |    
    And the Admin should see a "Refresh Data" button
      


  @wip
  Scenario: Filter students by Status
    Given the Student Readiness table is displayed
    When the Admin filters students by a specific status "Active"
    Then only students matching the selected status should be displayed

  @wip
  Scenario: Filter students by Readiness Level
    Given the Student Readiness Analysis table is displayed
    When the Admin filters students by a specific readiness level (e.g., "Job Ready", "Almost Ready", "In Progress", or "Getting Started")
    Then only students matching the selected readiness level should be displayed
    And the total number of displayed students should update accordingly

  @wip
  Scenario: Combined filter by Status and Readiness Level
    Given the Student Readiness Analysis table is displayed
    When the Admin applies both a Status and a Readiness Level filter
    Then only students matching both selected filters should be displayed
    And the total number of displayed students should reflect the filtered results

  @wip
  Scenario: Resetting filters restores the full student list
    Given filters for Status and Readiness Level have been applied
    When the Admin resets or clears all filters
    Then the full list of students should be displayed
    And the total count should return to the overall number of students