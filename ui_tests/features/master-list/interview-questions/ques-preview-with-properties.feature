@wip
Feature: Interview questions preview on the Interview Questions Manager page
  As an Admin
  the user wants to view each interview question with all its properties and available actions
  So that the Admin has complete information about each question and can take appropriate actions

  Background:
    Given the Admin is logged in
    And the Admin views the Interview Questions Manager page
    And no keyword is searched
    And no filters are selected


  Scenario Outline: Questions with all properties and actions are displayed correctly
    Then the Admin should see the question title "<title>"
    And the Admin should see the question preview for "<title>"
    And the Admin should see the corresponding job title(s) "<job_titles>"
    And the Admin should see the difficulty level "<difficulty_level>"
    And the Admin should see the tags "<tags>"
    And the Admin should see the creation date "<created>"
    And the Admin should see the actions "<edit_action>" and "<delete_action>"

    Examples:
      | title             | job_titles                   | difficulty_level | tags      | created    | edit_action | delete_action |
      | Model Overfitting | Data Scientist, ML Engineer  | Easy             | Tech      | 08/08/2025 | Edit icon   | Delete icon   |
      | Binary Search     | Software Engineer            | Medium           | Algorithm | 08/10/2025 | Edit icon   | Delete icon   |



  Scenario Outline: New questions are displayed correctly when added
    When a new question is added
    Then the Admin should see the new question title "<title>"
    And the Admin should see the preview of the new question "<title>"
    And the Admin should see the new question’s job title(s) "<job_titles>"
    And the Admin should see the difficulty level "<difficulty_level>"
    And the Admin should see the new question tags "<tags>"
    And the Admin should see the new question creation date "<created>"
    And the Admin should see the actions "<edit_action>" and "<delete_action>"

    Examples:
      | title             | job_titles                   | difficulty_level | tags      | created    | edit_action | delete_action |
      | Model Overfitting | Data Scientist, ML Engineer  | Easy             | Tech      | 08/08/2025 | Edit icon   | Delete icon   |



  Scenario Outline: Existing questions are displayed correctly after editing
    When an existing question is edited
    Then the Admin should see the updated question title "<title>"
    And the Admin should see the updated preview for "<title>"
    And the Admin should see the updated job title(s) "<job_titles>"
    And the Admin should see the updated difficulty level "<difficulty_level>"
    And the Admin should see the updated tags "<tags>"
    And the Admin should see creation date "<created>"
    And the Admin should see the actions "<edit_action>" and "<delete_action>"

    Examples:
      | title             | job_titles                           | difficulty_level | tags      | created    | edit_action | delete_action |
      | Model Overfitting | Software Engineer, Data Scientist    | Hard             | Tech, IT  | 08/08/2025 | Edit icon   | Delete icon   |



  Scenario Outline: Questions are removed correctly
    When a question is removed
    Then the Admin should not see the question title "<title>"
    And the Admin should not see the preview for "<title>"
    And the Admin should not see the job title(s) "<job_titles>"
    And the Admin should not see the difficulty level "<difficulty_level>"
    And the Admin should not see the tags "<tags>"
    And the Admin should not see the creation date "<created>"
    And the Admin should not see the actions "<edit_action>" or "<delete_action>"

    Examples:
      | title             | job_titles                  | difficulty_level | tags  | created   | edit_action | delete_action |
      | Model Overfitting | Data Scientist, ML Engineer | Easy            | Tech  | 08/08/2025 | Edit icon   | Delete icon   |



  Scenario: When no questions exist, an empty state message is displayed
    When there are no interview questions available
    Then the Admin should see a message stating "No questions available"
    And no question titles, previews, or actions should be displayed