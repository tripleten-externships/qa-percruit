@wip
Feature: Filter questions by difficulty level
  As an Admin
  the user wants to filter interview questions by difficulty level
  So that questions can be tracked based on Easy, Medium, or Hard levels

  Background:
    Given the Admin is logged in
    And the Admin views the Interview Questions Manager page
    And no difficulty filter is selected
    And no job title filter is selected
    And no keywords are searched

  Scenario: View all questions when no filters are applied
    When the Admin views the list of interview questions
    Then the Admin should see all available interview questions

  Scenario Outline: Filter questions by difficulty only
    When the Admin selects "<difficulty_level>" from the difficulty filter
    Then the Admin should see all questions with relevant "<difficulty_level>"

    Examples:
      | difficulty_level |
      | Easy             |
      | Medium           |
      | Hard             |

  Scenario Outline: Filter questions by difficulty and keyword
    When the Admin selects "<difficulty_level>" from the difficulty filter
    And searches for "<keyword>"
    Then the Admin should see all questions with relevant "<difficulty_level>"
    And containing "<keyword>"

    Examples:
      | difficulty_level | keyword      |
      | Easy             | PCA          |
      | Medium           | F1           |
      | Hard             | overfitting  |
      | Medium           | ETL          |
      | Hard             | String       |
      | Easy             | Array        |
      | Medium           | Linear       |

  Scenario Outline: Filter questions by difficulty and job title
    When the Admin selects "<difficulty_level>" from the difficulty filter
    And selects "<job_title>" from the job title filter
    Then the Admin should see all questions with relevant "<difficulty_level>"
    And filtered by "<job_title>"

    Examples:
      | difficulty_level | job_title                 |
      | Easy             | Software Engineer         |
      | Medium           | Data Scientist            |
      | Hard             | Machine Learning Engineer |
      | Medium           | Data Engineer             |
      | Hard             | Systems Architect         |
      | Easy             | Product Manager           |
      | Medium           | Behavioral                |

  Scenario Outline: Filter questions by difficulty, keyword, and job title
    When the Admin selects "<difficulty_level>" from the difficulty filter
    And searches for "<keyword>"
    And selects "<job_title>" from the job title filter
    Then the Admin should see all questions with relevant "<difficulty_level>"
    And containing "<keyword>"
    And filtered by "<job_title>"

    Examples:
      | difficulty_level | keyword      | job_title                 |
      | Easy             | PCA          | Software Engineer         |
      | Medium           | F1           | Data Scientist            |
      | Hard             | overfitting  | Machine Learning Engineer |
      | Medium           | ETL          | Data Engineer             |
      | Hard             | String       | Systems Architect         |
      | Easy             | Array        | Product Manager           |
      | Medium           | Linear       | Behavioral                |

  Scenario Outline: No questions match the selected filters
    When the Admin selects "<difficulty_level>" from the difficulty filter
    And searches with "<keyword>"
    And selects "<job_title>" from the job title filter
    Then the Admin should see a message indicating no questions found matching your filter

    Examples:
      | difficulty_level | keyword     | job_title         |
      | Hard             | XYZ         | Software Engineer |
      | Easy             | ABC         | Data Scientist    |