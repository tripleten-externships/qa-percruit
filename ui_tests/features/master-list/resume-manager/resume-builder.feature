Feature: Build New Resume
As a logged in Student
I want to use the in built resume builder
So that i can create my own resume 

Background: 
Given the Student is authenticated in the system
And the Student successfully navigates to the Resume Manage page

@wip
Scenario: Successfully navigate to the Resume builder
When the student clicks 'Build New' button
Then the student is directed to the Resume page
And the page title should be 'Resume Builder'
