@wip
Feature: Weekly job applications status check

Background:
Given the user has logged into the application and has previously applied for the following jobs: Software engineer visa, Software Developer oracle, Entry level software engineer developer 

@wip
Scenario: As a job seeker, the system displays all submitted job applications. So that the user can track their application progress and follow up if needed
When the user navigates to the Weekly application view to see all applications
Then the system displays a list of all jobs the user applied for with their respective statuses: Software engineer visa interviewing, Software Developer oracle applied, Entry level software engineer developer negotiating

@wip 
Scenario: As a job seeker, the system provides access to job application details. So that the user can review submission dates and job descriptions
When the user navigates to the Weekly application view to see all applications
Then the system displays a list of all jobs the user applied for with their respective statuses: Software engineer visa interviewing, Software Developer oracle applied, Entry level software engineer developer negotiating
When the user selects Software engineer visa to review the submission date
Then the system shows the submission date as 10/16/25 and displays the job description

@wip 
Scenario: The system handles job analytics page load failures gracefully
Given the job analytics page is unable to load
When the user navigates to the Weekly application view to see all applications
Then an error message is displayed
And no job listings or application status information is visible on the page


