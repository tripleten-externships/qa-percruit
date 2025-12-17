Feature: Percuit Website Student-Connect-Forums Test
  As a student user of the Percuit platform
  I want to access the Forum page, create new posts, and search posts
  So that I can interact with the community and find relevant discussions

  
   
   Scenario: When the user navigates to the Forums page, the page loads as expected
    Given the student is authenticated in the system
    When the student navigates to the Forums page
    Then the Forums page is displayed

  @wip
  Scenario: Student cancels creating a new post
    Given the student is authenticated in the system
    Given the student is on the Forums page
    When the student clicks the New Post button
    Then the new post modal should appear
    When the student clicks the Create Topic button
    Then it shows an error Title is required
    When the student clicks the Cancel button
    Then the new post modal should close
    And the student should remain on the Forums page
 
  @wip
  Scenario Outline: User filters posts by category
  Given the user is on the Forums page
  And the post category options are visible
  When the user selects the "<Category>" option
  Then only posts sorted by "<Category>" should be displayed

Examples:
  | Category |
  | Hot      |
  | New      |
  | Top      |
