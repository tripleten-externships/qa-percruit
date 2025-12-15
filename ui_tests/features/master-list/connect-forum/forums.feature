Feature: Percuit Website Student-Connect-Forums Test
  As a student user of the Percuit platform
  I want to access the Forum page, create new posts, and search posts
  So that I can interact with the community and find relevant discussions
  Feature: Student Forums

  Background:
    Given the Student is authenticated in the system
    And the student is on the Forums page
  @wip 
  Scenario: Student cancels creating a new post
    When the student clicks the New Post button
    Then the new post modal should appear
    When the student clicks the Cancel button in the modal
    Then the new post modal should close
    And the student should remain on the Forums page
