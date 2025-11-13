@wip @smoke
Feature: Sucessfully viewing weekly job applications 
As a job seeker 
I want to see all of the jobs that I submitted applicaitons to 
So I can keep track of my application progress and follow up if needed

Background: 
Given user is logged into the application 
And the user has previously applied for Software engineer visa with status Interviewing
And the user has previously applied for Software developer oracle with status Applied
And the user has previously applied for Entry level Software engineer developer with status
Negotiating

Scenario: View all job applications with their status
When user accesses weekly application view
Then user sees a list showing all the jobs they applied for 
And the user should see Software Engineer Visa with status Interviewing
And the user should see Software Developer Oracle with status Applied
And the user should see Entry level Software Engineer Developer with status Negotiating



Background: 
Given user is logged into the application 
And the user has previously applied for Software Engineer Visa
And the user has previously applied for Software Developer Oracle
And the user has previously applied for Entry Level Software Engineer Developer


Scenario: View Software Engineer job details with date saved
When user accesses weekly application View
Then user sees a list showing all the jobs they applied for
And user clicks on Software Engineer Visa
Then user sees a date saved 10/16/25 and job description


Background: 
Given user is logged into the application 
And user has previously applied for Software Engineer Visa
And user has previously applied for Software developer Oracle 
And user has previously applied for Entry level Software engineer developer


Scenario: User accesses weekly application unsuccessfully
When user accesses weekly appllication View
Then user sees a message stating "you have no active job applicaitons"
And user should not see any job listings or applicaiton status submitted
