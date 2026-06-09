Feature: Percuit Website Student-Connect-Forums Test
  As a student user of the Percuit platform
  I want to access the Forum page, click new post button, and search posts
  So that I can interact with the community and find relevant discussions

  
   
  Scenario: When the user navigates to the Forums page, the page loads as expected
    Given the student is authenticated in the system
    When the student navigates to the Forums page
    Then the Forums page is displayed

  
  Scenario: New post modal workflow
    Given the student is authenticated in the system
    And the student is on the Forums page
    When the student clicks the New Post button
    Then the New Post modal should appear
    


  Scenario Outline: User searches for posts by keyword
    Given the student is authenticated in the system
    Given the student is on the Forums page
    And a search input field is visible at the page
    When the student types "<keyword>" into the search field
    Then only posts containing "<keyword>" are displayed

  Examples:
  | keyword                  |
  | Interview-Prep           |
  | Resume                   |
  | Networking               |
  | NonExistentKeyword       |

 @wip
  Scenario Outline: User filters posts by topic and sees the button highlighted
  Given the student is authenticated in the system
  And the student is on the Forums page
  And the topic filter options are visible
  When the student clicks the "<topic>" topic filter
  Then the "<topic>" topic filter button should appear selected
  And only posts tagged with "<topic>" should be displayed
  And posts from other topics should be hidden

Examples:
  | topic           |
  | Interview-Prep  |
  | Resume          |
  | Career-Advice   |
  | Job-Search      |
  | Salary          |
  | Networking      |
  | Technical       |
  | Behavioral      |


  @wip
  Scenario Outline: User filters posts by category
    Given the student is authenticated in the system
    Given the student is on the Forums page
    And the post category options are visible
    When the user selects the "<Category>" option
    Then only posts sorted by "<Category>" should be displayed

Examples:
  | Category |
  | Hot      |
  | New      |
  | Top      |
