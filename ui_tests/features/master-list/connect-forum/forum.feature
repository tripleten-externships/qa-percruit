Feature: Percuit Website Student-Connect-Forums Test
  As a student user of the Percuit platform
  I want to access the Forum page, create new posts, and search posts
  So that I can interact with the community and find relevant discussions

  Background:
    Given the student is logged into the Percuit website
    And the student is on the "Forum" page
  Scenario: Student cancels the creation of a new post
    When the student clicks the "New Post" button
    Then the new post modal should appear
    When the student clicks the "Cancel" button in the modal
    Then the new post modal should close
    And the student should remain on the "Forum" page