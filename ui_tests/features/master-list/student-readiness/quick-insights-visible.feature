@wip
Feature: Display of Readiness Score in Quick Insights under Usage Metrics
  As an Admin user
  Admin wants to view the Readiness Score summary in the Quick Insights section
  So that the Admin can quickly assess overall student readiness performance

Background:
  Given the Admin user is logged into the Admin Panel
  And the Admin is on the "Usage Metrics" section under "Analytics & Reporting"

@smoke
Scenario: View Readiness Score in Student Readiness metrics
  When the Admin views the Student Readiness metrics
  Then the Admin should see the Student Readiness Analysis table
  And the Admin should see a Readiness Score metric in the Quick Insights section
  And the Readiness Score should display a numerical value (e.g., 61/100)
  And the Readiness Score value should match the average readiness data shown in the Student Readiness Analysis table
  And the Readiness Score should update when the data is refreshed