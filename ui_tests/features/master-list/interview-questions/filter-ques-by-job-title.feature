@wip
Feature: View questions filtered by job title
  As an Admin
  the user wants to view interview questions filtered by job title
  So that questions can be tracked and reviewed based on their job categories

  Background:
    Given the Admin is logged in
    And the Admin views the Interview Questions Manager page

  Scenario Outline: View questions filtered by job title only
    When the Admin selects "<job_title>" from the job title filter
    And no "<keyword>" is searched
    And no "<difficulty_level>" is selected
    Then the Admin should see a list of all questions filtered by "<job_title>"

    Examples:
      | job_title                 |
      | Software Engineer         |
      | Data Scientist            |
      | Machine Learning Engineer |
      | Data Engineer             |
      | Systems Architect         |
      | Product Manager           |
      | Behavioral                |
        

  Scenario Outline: View questions filtered by job title and search bar
    When the Admin selects "<job_title>" from the job title filter
    And the Admin searches for "<keyword>"
    And no "<difficulty_level>" is selected
    Then the Admin should see a list of all relevant questions filtered by "<job_title>"
    And by the searched "<keyword>"

    Examples:
      | job_title                 | keyword         |
      | Software Engineer         | PCA             |
      | Data Scientist            | F1              |
      | Machine Learning Engineer | overfitting     |
      | Data Engineer             | ETL             |
      | Systems Architect         | String          |
      | Product Manager           | Array           |
      | Behavioral                | Linear          |


   Scenario Outline: View questions filtered by job title and difficulty level
    When the Admin selects "<job_title>" from the job title filter
    And no "<keyword>" is searched
    And the Admin selects "<difficulty_level>"
    Then the Admin should see a list of all relevant questions filtered by "<job_title>"
    And by the selected "<difficulty_level>"

    Examples:
      | job_title                 | difficulty_level|
      | Software Engineer         | Easy            |
      | Data Scientist            | Hard            |
      | Machine Learning Engineer | Medium          |
      | Data Engineer             | Medium          |
      | Systems Architect         | Easy            |
      | Product Manager           | Easy            |
      | Behavioral                | Hard            |


  Scenario Outline: View questions filtered by job title, search bar, and difficulty level
    When the Admin selects "<job_title>" from the job title filter
    And the Admin searches for "<keyword>"
    And the Admin selects "<difficulty_level>"
    Then the Admin should see a list of all relevant questions filtered by "<job_title>"
    And by the searched "<keyword>"
    And by the selected "<difficulty_level>"

    Examples:
      | job_title                 | keyword         | difficulty_level |
      | Software Engineer         | PCA             | Easy             |
      | Data Scientist            | F1              | Medium           |
      | Machine Learning Engineer | overfitting     | Hard             |
      | Data Engineer             | ETL             | Medium           |
      | Systems Architect         | String          | Hard             |
      | Product Manager           | Array           | Easy             |
      | Behavioral                | Linear          | Medium           |