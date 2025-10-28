@wip
Feature: View questions count and percentages by job title
  As an Admin
  the user wants to see question counts and percentages grouped by job title
  So that question distribution can be tracked and monitored

  Background:
    Given the Admin is logged in
    And the Admin views the Interview Questions Manager page

  Scenario Outline: Display total count and percentage for each job title
    When the Admin views the interview question count and percentage stat cards by job title
    Then the Admin should see the stat card for each job title with the following values:
    | Job title      |   Total Count   | Percentage   |
    | <job_title>    | <total_count>   | <percentage> |

      Examples:
        | job_title                 | total_count | percentage |
        | Software Engineer         | 12          | 24%        |
        | Data Scientist            | 8           | 16%        |
        | Machine Learning Engineer | 6           | 12%        |
        | QA Analyst                | 4           | 8%         |
        | SQL                       | 5           | 10%        |
        | Product Manager           | 7           | 14%        |
        | Cybersecurity             | 3           | 6%         |
        | LLM                       | 2           | 4%         |
        | Behavioral                | 3           | 6%         |

  Scenario Outline: Job title count and percentage updates when a question is added
    When the Admin adds a question in "<job_title>" category
    Then the Admin should see the updated stats for the job title:
    |  Job title     |  Total Count  |  Percentage  |
    | <job_title>    | <total_count> | <percentage> |

       Examples:
         | job_title                 | total_count | percentage |
         | Software Engineer         | 13          | 26%        |
         | Data Scientist            | 9           | 18%        |
         | Machine Learning Engineer | 7           | 14%        |
         | QA Analyst                | 5           | 10%        |
         | SQL                       | 5           | 10%        |
         | Product Manager           | 7           | 14%        |
         | Cybersecurity             | 3           | 6%         |
         | LLM                       | 2           | 4%         |
         | Behavioral                | 3           | 6%         |


Scenario Outline: Job title count and percentage updates when a question is removed
  When the Admin removes a question from "<job_title>" category
  Then the Admin should see the stat card for each job title with the following updated values:
  | Job title                 | Total Count | Percentage |
  | <job_title>               | <total_count> | <percentage> |

     Examples:
       | job_title                 | total_count | percentage |
       | Software Engineer         | 11          | 22%        |
       | Data Scientist            | 7           | 14%        |
       | Machine Learning Engineer | 6           | 12%        |
       | QA Analyst                | 4           | 8%         |
       | SQL                       | 5           | 10%        |
       | Product Manager           | 7           | 14%        |
       | Cybersecurity             | 3           | 6%         |
       | LLM                       | 2           | 4%         |
       | Behavioral                | 3           | 6%         |
    