@wip
Feature: View questions count and percentages by job title
  As an Admin
  the user wants to see question counts and percentages grouped by job title
  So that question distribution can be tracked and monitored

  Background:
    Given the Admin is logged in
    And the Admin views the Interview Questions Manager page

  Scenario Outline: Display total count and percentage for each job title
    Then the Admin should see the stat card for "<job_title>" displaying the total count of questions
    And the stat card should show the corresponding "<percentage>"

    Examples:
      | job_title                 | percentage   |
      | Software Engineer         | <calculated> |
      | Data Scientist            | <calculated> |
      | Machine Learning Engineer | <calculated> |
      | Data Engineer             | <calculated> |
      | Systems Architect         | <calculated> |
      | Product Manager           | <calculated> |
      | Behavioral                | <calculated> |

  Scenario Outline: Job title count and percentage updates when a question is added
    When the Admin adds a question in "<job_title>" category
    Then the stat card for "<job_title>" should show the updated total count
    And the stat card should show the updated percentage
   

    Examples:
      | job_title                 |
      | Software Engineer         |
      | Data Scientist            |
      | Machine Learning Engineer |
      | Data Engineer             |
      | Systems Architect         |
      | Product Manager           |
      | Behavioral                |

  Scenario Outline: Job title count and percentage updates when a question is removed
    When the Admin removes a question from "<job_title>" category
    Then the stat card for "<job_title>" should show the updated total count
    And the stat card should show the updated percentage
    