Feature: View total questions stat card
  As an admin
  I want to see the total number of interview questions
  So that I can track how many questions exist overall

  Background: 
    Given I am logged in as an admin

  @smoke
  Scenario: Total Questions stat card displays correct count
    When I navigate to the Interview Questions Manager page
    Then I should see the Total Questions stat card showing the correct total count of questions
