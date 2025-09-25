Feature: Playwright Website Navigation

  Scenario: The Playwright website has a 'Get Started' link
    Given I am on the Playwright homepage
    When I click the "Get started" link
    Then I should be on the "Introduction" page
