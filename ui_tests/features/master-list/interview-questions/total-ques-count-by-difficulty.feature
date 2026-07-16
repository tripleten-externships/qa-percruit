@wip
Feature: View total questions count by difficulty (Easy, Medium, Hard)
  As an Admin
  the user wants to see the total count of interview questions and count by difficulty level
  So that the question counts by difficulty can be tracked

  Background:
    Given the Admin is authenticated in the system
    And the Admin views the Interview Questions page

  Scenario Outline: Total questions count displays correctly
    When the Admin views the total questions count stat cards by difficulty
    Then the Admin should see the following question counts:
    |     Total     |     Easy     |     Medium     |    Hard      |
    | <total_count> | <easy_count> | <medium_count> | <hard_count> |

    Examples:
      | Total       |   Easy       |    Medium     |     Hard.     |
      | 30          |   10         |      12       |      8        |

      

  Scenario Outline: Total questions count updates when a new question is added
    When the Admin adds a new question with difficulty "<difficulty_level>"
    Then the stat card for "<difficulty_level>" should show count "<count_after>"
    And the Total Questions stat card should show count "<total_after>"

    Examples:
      | difficulty_level | count_before | count_after | Total        | total_after |
      | Easy             | 10           | 11          | 30           | 31          |
      | Medium           | 12           | 13          | 30           | 31          |
      | Hard             | 8            | 9           | 30           | 31          |

      

  Scenario Outline: Total questions count updates when a question is removed
    When the Admin removes a question with difficulty "<difficulty_level>"
    Then the stat card for "<difficulty_level>" should show count "<count_after>"
    And the Total Questions stat card should show count "<total_after>"

    Examples:
      | difficulty_level | count_before | count_after | Total        | total_after |
      | Easy             | 11           | 10          | 31           | 30          |
      | Medium           | 13           | 12          | 31           | 30          |
      | Hard             | 9            | 8           | 31           | 30          |
