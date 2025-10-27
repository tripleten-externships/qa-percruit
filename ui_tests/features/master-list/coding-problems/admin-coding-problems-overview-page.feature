@wip
Feature: Search bar
  As an "Admin"
  The "Admin" wants to use the search bar

Background:
  Given The "Admin" is logged in using valid credentials
  And The "Admin" is on the "Coding Problems Overview" page

  @smoke
  Scenario: The "Admin" is successfully able to use the search bar 
    When the "Admin" uses the search bar with valid information 
    Then the "Admin" should see results that show matching topics
    
@wip
Feature: Difficulty dropdown
  As an "Admin"
  The "Admin" wants to choose a specific "difficulty" level

Background:
  Given The "Admin" is logged in using valid credentials
  And The "Admin" is on the "Coding Problems Overview" page

  @smoke
  Scenario: The "Admin" is successfully able to select a specific difficulty level 
    When the "Admin" filters coding problems by difficulty level "Easy"
    Then the "Admin" should see only problems with difficulty level "Easy"
    
    Examples:
        | Difficulty | 
        | All Difficulties | 
        | Easy |
        | Medium |
        | Hard |

@wip
Feature: Category Dropdown
  As an "Admin"
  The "Admin" wants to choose a specific "category"

Background:
  Given The "Admin" is logged in using valid credentials
  And The "Admin" is on the "Coding Problems Overview" page

  @smoke
  Scenario: The "Admin" is successfully able to select a specific category 
    When the "Admin" filters coding problems by category "Python Basics"
    Then the "Admin" should see only coding problems in the "Python Basics" category
    
    Examples:
        | All Categories |
        | Python Sprint 2 |
        | Python Basics |
        | Database Basics |
        | BDD Test |

@wip
Feature: Topic Dropdown
  As an "Admin"
  The "Admin" wants to choose a specific "topic"

Background:
  Given The "Admin" is logged in using valid credentials
  And The "Admin" is on the "Coding Problems Overview" page

  @smoke
  Scenario: The "Admin" is successfully able to selece a specific topic
    When the "Admin" filters coding problems by topic "Sprint 2 Topic 1"
    Then the "Admin" should see only coding problems categorized under "Sprint 2 Topic 1"

    Examples:
        | All Topics |  
        | Sprint 2 Topic 1 |
        | Sprint 2 Topic 2 |
        | Sprint 2 Topic 3 |
        | Variables, Data Types & I/O |
        | BDD |      

@wip
Feature: Adding an edit to a topic
  As an "Admin"
  The "Admin" want to update a topics details
  So that the information remains accurate and up to date

Background:
  Given The "Admin" is logged in using valid credentials
  And The topics exist in the system

  @smoke
  Scenario: The "Admin" is successfully able to edit a  topic 
    When the "Admin" edits a topic with valid information 
    Then the topics details should be updated 
    And the system should confirm the update was successful

@wip
Feature: Deleting a topic
  As an "Admin"
  The "Admin" wants to remove a topic
  So that incorrect information is no longer available

Background:
  Given The "Admin" is logged in using valid credentials
  And The "Admin" is on the "Coding Problems Overview" page

  @smoke
  Scenario: The "Admin" is successfully able to delete a topic 
    When the "Admin" removes a topic  
    Then the topic should no longer show with the other topics
    And the system should confirm the deletion successfully
         