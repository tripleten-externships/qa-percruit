
@wip
Feature: View platform analytics
  As a student
  User wants to see all job analytics 
  So that user can research jobs that align with their skills
  
 Background:  user is logged into the platform

  @smoke
  Scenario: Platform Analytics tab loads sucessfully 
  
    When the user accesses the career insights tab 
    Then user should see a page of job analytics

    @wip
    Feature: View platform analytics
    As a student
    User wants to see all job analytics
    So that user can research jobs that align with their skills

    Background: user is logged into the platform

    Scenario: Platform Analytics tab does not load sucessfully
    When the user accesses the career insights tab
    Then user notice error message try back later 
    page does not load sucessfully
