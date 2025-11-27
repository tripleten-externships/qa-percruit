@wip
Feature: Search questions in Interview Questions Manager
  As an Admin
  I want to search interview questions by keywords
  So that relevant questions can be quickly located and reviewed

  Background:
    Given the Admin is authenticated in the system
    And the Admin views the Interview Questions page
    And no filters or keywords are currently applied


  Scenario: View all questions when no filters are applied
    When the Admin views the list of interview questions
    Then the Admin should see all available interview questions


  Scenario Outline: Search questions by keyword only
    When the Admin searches for "<keyword>"
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
    |   keyword     |    difficulty_level    |   job_title    |
    |  "<keyword>"  |  "<difficulty_level>"  |  "<job_title>" |

    Examples:
      | keyword      | difficulty_level | job_title                 |
      | PCA          | Easy             | Software Engineer         |
      | F1           | Medium           | Data Scientist            |
      | overfitting  | Hard             | Machine Learning Engineer |
      | ETL          | Medium           | Data Engineer             |
      | String       | Hard             | Systems Architect         |
      | Array        | Easy             | Product Manager           |
      | Linear       | Medium           | Behavioral                |


  
  Scenario Outline: No questions match the selected filters or keyword
    When the Admin selects "<job_title>" from the job title filter
    And the Admin searches for "<keyword>"
    And the Admin selects "<difficulty_level>" from the difficulty filter
    Then the Admin should see a message indicating no questions were found matching the selected filters

    Examples:
      | job_title         | keyword | difficulty_level |
      | Software Engineer | XYZ     | Hard             |
      | Data Scientist    | ABC     | Easy             |