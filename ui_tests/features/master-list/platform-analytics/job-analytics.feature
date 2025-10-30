@wip
Feature: Sucessfully viewing weekly job applications check

Background: User is logged into the application and has previously applied for the
following jobs: Software engineer visa, Software developer oracle, Entry level Software
engineer developer

Scenario: As a job seeker user wants to see all of the jobs that they submitted their 
job applications to so they can keep track of their application progress and follow up
if needed
When user accesses weekly application - view all applications
then user sees a list showing all the jobs they applied for and status Software 
engineer visa interviewing, Software developer oracle applied, Entry level Software
engineer developer negotiating

@wip
Feature: Viewing application details

Background: User is logged into the application and has previously applied 
for the following jobs: Software engineer visa, Software developer oracle, Entry 
level Software engineer developer

@smoke
Scenario: User accesses weekly application - view all applications 
Given User is viewing a list of jobs applied for Software engineer visa, Software 
developer oracle, Entry level Software engineer developer
When user clicks on software engineer with visa
Then user sees a date saved 10/16/25 and job description

@wip
Feature: Viewing applied jobs when there are no applications shown

Background: User is logged into the application and has previously applied 
for the following jobs: Software engineer visa, Software developer oracle, Entry 
level Software engineer developer

@smoke
Scenario: User accesses weekly application - view all applications 
Then user should see a message stating "you have no active job applicaitons"
And user should not see any job listings or applicaiton status submitted
