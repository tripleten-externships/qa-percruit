@wip
Feature: Weekly job applications status check

Background: 
Given user is logged into the application and has previously applied for the following jobs: Software engineer visa, Software Developer oracle, Entry level software engineer developer 

@smoke
Scenario: As a job seeker user wants to see all of the jobs that they submitted their job application to. So that they can keep track of their application progress and follow up if needed
When user accesses Weekly application - view all applications
Then user seea a list featuring all the jobs they applied for and the status Software engineer visa interviewing, Software Developer oracle applied, Entry level software engineer developer negotiating

@wip
Scenario: Viewing job application details

Background: 
Given user is logged into the application and has previously applied for the following jobs: Software engineer visa, Software Developer oracle, Entry level software engineer developer 

@smoke
Scenario: As a job seeker user wants to see all of the jobs that they submitted their job application to. So that they can keep track of their application progress and follow up if needed
When user accesses Weekly application - view all applications
Then user sees a list featuring all the jobs they applied for and the status, Software engineer visa interviewing, Software Developer oracle applied, Entry level software engineer developer negotiating
And user clicks on Software engineer visa to check submission date
Then user sees date saved 10/16/25 and job description

@wip
Scenario: Viewing applied jobs when there are no applications
Background:
Given user is logged into the application 
And  previously applied for the following jobs: Software engineer visa, Software Developer oracle, Entry level software engineer developer 

@smoke
Scenario: As a job seeker user wants to see all of the jobs that they submitted their job application to. So that they can keep track of their application progress and follow up if needed
When user accesses Weekly application - view all applications
Then user should see a message stating "you have no active job applications"
And user should not see any job listings or application status submitted


