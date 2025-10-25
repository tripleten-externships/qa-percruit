@whip
Feature: View platform analytics
  As an user
  I want to see all job analytics 
  So that I can research jobs that align with my skills

  @smoke
  Scenario: Platform Analytics tab loads sucessfully 
    Given I am logged into the platform
    When I navigate to career insights
    Then I should see a page of job analytics