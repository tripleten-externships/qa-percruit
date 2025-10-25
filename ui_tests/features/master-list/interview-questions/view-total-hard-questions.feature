Feature: View total hard questions stat card
  As an admin
  I want to see the total number of hard interview questions
  So that I can track the question count by difficulty level

  Background:
    Given I am logged in as an admin

  @smoke
  Scenario: Hard stat card displays correct count
    When I navigate to the Interview Questions Manager page
    Then I should see the Hard stat card showing the correct count of hard difficulty level questions