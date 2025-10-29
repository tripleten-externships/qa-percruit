Feature: Percruit Website Login

  Scenario: Student successfully logs in to the Percruit website
    Given I am on the Percruit homepage
    When I enter correct Student email and password and click on sign in button
    Then I should be on the page that says Hello
    Then I should be able to see the Career Dashboard
    