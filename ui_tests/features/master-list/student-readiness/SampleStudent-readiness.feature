@wip
Feature: Student Feature: Readiness Tab under Usage Metrics
  As an Admin user
  Admin wants to access the Student Readiness tab under Usage Metrics
  So that Admin can view and analyze student readiness data

 Background:
   Given the Admin user has valid login credentials
   And the Admin user is logged into the Admin Panel

@smoke
Scenario: Student Readiness tab loads correctly under Usage Metrics
  When the Admin navigates to the "Usage Metrics" section from the sidebar
  And the Admin selects the "Student Readiness" tab
  Then the page should display the "Student Readiness Analysis" table
  And the table should contain the following columns:
  | Student | Readiness Score | Status | Jobs Applied | Interviews Completed | Mentor | Actions |
  And the total number of students should be visible
  And the "Refresh Data" button should be visible at the top right
  And the "Student Readiness" tab should appear active

Scenario: Quick Insights displays readiness score under Usage Metrics
  When the Admin opens the "Usage Metrics" page
  And the "Quick Insights" section is visible at the top of the page
  Then the Quick Insights section should display a "Readiness Score" metric
  And the Readiness Score should show a numerical value (e.g., 61/100)
  And the Readiness Score value should match the average readiness data shown in the Student Readiness Analysis table
  And the Readiness Score should update when data is refreshed