
@wip
Feature: View platform analytics
  Given: As a student, I want to see all job analytics 
  And I can research jobs that align with their skills
  
 Background:  user is logged into the platform

  @smoke
  Scenario: Platform Analytics tab loads sucessfully 
  
    When the user accesses the career insights tab 
    Then user should see a page of job analytics

    @wip
    Scenario: View platform analytics
    Given: As a student, I want to see all job analytics
    And I can research jobs that align with their skills

    Background: user is logged into the platform

    Scenario: Platform Analytics tab does not load sucessfully
    When the user accesses the career insights tab
    Then user notice error message try back later 
    And page does not load sucessfully
