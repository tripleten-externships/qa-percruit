Feature: Student Feature: Readiness Tab under Usage Metrics
  As an Admin user
  I want to access the Student Readiness tab under Usage Metrics
  So that I can view and analyze student readiness data

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