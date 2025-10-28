@wip
Feature: Interview questions preview on the Interview Questions Manager page
  As an Admin
  the user wants to view each interview question with all its properties and available actions
  So that the Admin has complete information about each question and can take appropriate actions

  Background:
    Given the Admin is logged in
    And the Admin views the Interview Questions Manager page
    And no filters or keywords are currently applied


  Scenario Outline: Existing Questions are displayed correctly
    When the Admin views the existing interview questions
    Then the Admin should see the all the Questions with the following properties:
    |  Title     |  Preview  |  Job title(s) |  Difficulty level  |  Tags  | Created date   |            Actions             |
    | <title>    | <preview> | <job_titles>  | <difficulty_level> | <tags> |   <created>    | <edit_action>, <delete_action> |

    Examples:
      | title             | preview                                                               | job_titles                  | difficulty_level | tags      | created    | edit_action | delete_action |
      | Model Overfitting | What is overfitting in machine learning, and how can it be prevented? | Data Scientist, ML Engineer | Easy             | Tech      | 08/08/2025 | Edit icon   | Delete icon   |
      | Binary Search     | Explain binary search and provide an example                          | Software Engineer           | Medium           | Algorithm | 08/10/2025 | Edit icon   | Delete icon   |



  Scenario Outline: New questions are displayed correctly when added
    When a new question is added
    Then the Admin should see the newly added question with the following properties:
    |  Title     |  Preview  |  Job title(s) |  Difficulty level  |  Tags  | Created date   |            Actions             |
    | <title>    | <preview> | <job_titles>  | <difficulty_level> | <tags> |   <created>    | <edit_action>, <delete_action> |

    Examples:
      | title             | preview                                                       | job_titles                   | difficulty_level | tags            | created    | edit_action | delete_action |
      | Linked List Cycle | How do you detect a cycle in a linked list?                   | Software Engineer            | Medium           | Data Structures | 08/10/2025 | Edit icon   | Delete icon   |



  Scenario Outline: Existing questions are displayed correctly after editing
    When an existing question is edited
    Then the Admin should see the updated question with the following properties:
    |  Title     |  Preview  |  Job title(s) |  Difficulty level  |  Tags  | Created date   |            Actions             |
    | <title>    | <preview> | <job_titles>  | <difficulty_level> | <tags> |   <created>    | <edit_action>, <delete_action> |

    Examples:
      | title             | preview                                                               | job_titles                           | difficulty_level | tags      | created    | edit_action | delete_action |
      | Model Overfitting | What is overfitting in machine learning, and how can it be prevented? | Software Engineer, Data Scientist    | Hard             | Tech, IT  | 08/08/2025 | Edit icon   | Delete icon   |


  Scenario Outline: Questions are removed correctly
    When a question is removed
    Then the Admin should see the following properties for the removed question:
    |  Title     |  Preview  |  Job title(s) |  Difficulty level  |  Tags  | Created date   |            Actions             |
    | <title>    | <preview> | <job_titles>  | <difficulty_level> | <tags> |   <created>    | <edit_action>, <delete_action> |

    Examples:
      | title             | preview                         | job_titles                  | difficulty_level | tags  | created    | edit_action | delete_action |
      | Model Overfitting | What is overfitting in ML?      | Data Scientist, ML Engineer | Easy             | Tech  | 08/08/2025 | Edit icon   | Delete icon   |


  Scenario: When no questions exist, an empty state message is displayed
    When there are no interview questions available
    Then the Admin should see a message stating "No questions available"
    And no question titles, previews, or actions should be displayed