Feature: View total easy questions stat card
  As an admin
  I want to see the total number of easy interview questions
  So that I can track the question count by difficulty level

  Background:
    Given I am logged in as an admin

  @smoke
  Scenario: Easy stat card displays correct count
    When I navigate to the Interview Questions Manager page
    Then I should see the Easy stat card showing the correct count of easy questions

  Scenario: Easy stat card updates when a question is added
    When I add a new easy difficulty question
    Then the Easy stat card should show the updated count

  Scenario: Easy stat card updates when a question is removed
    When I remove a easy difficulty question
    Then the Easy stat card should show the updated count
