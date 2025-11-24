@wip
Feature: Resume Manager page Access
As a logged in student
I want to easily navigate to the Resume Manager page
So that I can upload, edit or delete my resumes 

@wip    
Background: 
Given the Student is authenticated in the system

@wip
Scenario: Student successfully navigates to the Resume Manage page
When student clicks 'Resume Manager' in the navigation menu
Then the user should be redirected to the Resume manager page 
And the page title should be 'Resume Manager'

@wip
Scenario: Student views Resume manager with no added resumes
Given the student has no uploaded resumes
When the student clicks 'Resume Manager' in the navigation menu
Then the student should be redirected to the Resume Manage page 
And the should see the a message that says 'No resumes found' in the resumes table
And see a 'Build New' button in the resumes table

@wip
Scenario: Student views Resume manager with resumes uploaded
Given the student has uploaded resumes
When the student clicks 'Resume Manager' in the navigation menu
Then the student should be redirected to the Resume Manage page 
And the should see all their uploaded resumes in the resumes table
