@wip
Feature: Search questions by keyword in Search bar
  As an Admin
  the user wants to search interview questions by keyword
  So that relevant questions can be quickly located and reviewed

  Background:
    Given the Admin is logged in
    And the Admin views the Interview Questions Manager page

  Scenario Outline: Search questions by keyword only
    When the Admin searches for "<keyword>"
    And no "<job_title>" is selected from the job title filter
    And no "<difficulty_level>" is selected from the difficulty filter
    Then the Admin should see all questions containing "<keyword>"

    Examples:
      | keyword      |
      | PCA          |
      | F1           |
      | overfitting  |
      | ETL          |
      | String       |
      | Array        |
      | Linear       |



  Scenario Outline: Search questions by keyword and difficulty
    When the Admin searches for "<keyword>"
    And selects "<difficulty_level>" from the difficulty filter
    And no "<job_title>" is selected from the job title filter
    Then the Admin should see all questions containing "<keyword>" 
    And with relevant "<difficulty_level>"

    Examples:
      | keyword      | difficulty_level |
      | PCA          | Easy             |
      | F1           | Medium           |
      | overfitting  | Hard             |
      | ETL          | Medium           |
      | String       | Hard             |
      | Array        | Easy             |
      | Linear       | Medium           |



  Scenario Outline: Search questions by keyword and job title
    When the Admin searches for "<keyword>"
    And selects "<job_title>" from the job title filter
    And no "<difficulty_level>" is selected from the difficulty filter
    Then the Admin should see all questions containing "<keyword>" 
    And filtered by "<job_title>"

    Examples:
      | keyword      | job_title                 |
      | PCA          | Software Engineer         |
      | F1           | Data Scientist            |
      | overfitting  | Machine Learning Engineer |
      | ETL          | Data Engineer             |
      | String       | Systems Architect         |
      | Array        | Product Manager           |
      | Linear       | Behavioral                |



  Scenario Outline: Search questions by keyword, difficulty, and job title
    When the Admin searches for "<keyword>"
    And selects "<difficulty_level>" from the difficulty filter
    And selects "<job_title>" from the job title filter
    Then the Admin should see all questions containing "<keyword>" 
    And with relevant "<difficulty_level>"
    And filtered by "<job_title>"

    Examples:
      | keyword      | difficulty_level | job_title                 |
      | PCA          | Easy             | Software Engineer         |
      | F1           | Medium           | Data Scientist            |
      | overfitting  | Hard             | Machine Learning Engineer |
      | ETL          | Medium           | Data Engineer             |
      | String       | Hard             | Systems Architect         |
      | Array        | Easy             | Product Manager           |
      | Linear       | Medium           | Behavioral                |