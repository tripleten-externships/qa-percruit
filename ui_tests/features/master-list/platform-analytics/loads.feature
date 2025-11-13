
@wip @smoke
Feature: View platform analytics

Background: 
Given the user is logged into the platform
In order to research jobs that match my skills
As a student
I want to see platform job analytics and career insights

Scenario: Platform Analytics tab loads sucessfully 
When the user accesses the career insights tab 
Then user should see a page of job analytics

Scenario: Platform Analytics tab does not load sucessfully    
When the user accesses the career insights tab
Then user notice error message "Please try again later" 
And the analytics page does not load sucessfully
