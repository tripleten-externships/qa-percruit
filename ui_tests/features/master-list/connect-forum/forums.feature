Feature: Percuit Website Student-Connect-Forums Test
  As a student user of the Percuit platform
  I want to access the Forum page, create new posts, and search posts
  So that I can interact with the community and find relevant discussions

  Background:
    Given the student is authenticated in the system
    And the student is on the Forums page
   
  Scenario:Verify Forums page loads successfully 
    Then the Forums page displays   
 
  @wip
  Scenario: Student cancels creating a new post
    When the student clicks the "New Post" button
    Then the new post modal should appear
    When the student clicks the "Cancel" button
    Then the new post modal should close
    And the student should remain on the Forums page
