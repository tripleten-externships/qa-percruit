Feature: View all Resume Reviews
  As an admin
  View a list of all reviews and their corresponding status labels 
  In order to track progress of reviews and provide feedback

  Background:
    Given the admin user is logged into the system
    And the admin views the Resume Reviews section

  @smoke
  Scenario Outline: Reviews are visible for each status tab
    And the system presents four available status tabs: "Pending", "In Progress", "Completed", "Cancelled"
    When the admin clicks on the "<status>" tab
    Then only "<status>" reviews are displayed

    Examples:
      | status      |
      | Pending     |
      | In Progress |
      | Completed   |
      | Cancelled   |

  @smoke
  Scenario: Continue Review Page opens successfully
    And continues reviewing a previously claimed resume using the "Continue Review" button
    Then the system displays the Continue Review page for that resume
    And the intended resume details are correctly displayed
@wip
  @smoke
  Scenario: View Feedback Page opens successfully
    And a completed resume review is available
    And requests to view feedback using the "View Feedback" button
    Then the system displays a Feedback Page for that resume 
    And the displayed feedback corresponds to the selected resume
@wip
  @smoke
  Scenario: Claim and Review changes resume status
    And a resume with a "Pending" status is available
    And claims a resume for review using the "Claim & Review" button
    Then the system changes the status of a resume from "Pending" to "In Progress"

  @smoke
  Scenario: All reviews are listed under respective statuses
    Then the system displays all reviews grouped by their current status
    And each category accurately reflects the resumes belonging to that status
