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
  When the Admin views the "Student Readiness" metrics
  Then the Admin should see the "Student Readiness Analysis" table
  And the table should include the following columns:
    | Student | Readiness Score | Status | Jobs Applied | Interviews Completed | Mentor | Actions |
  And the Admin should see the total number of students displayed
  And the Admin should see a "Refresh Data" button
  And the "Student Readiness" tab should be active