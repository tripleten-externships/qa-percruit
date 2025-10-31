@wip 
Feature: Search by Student 


Background:
 Given Admin is logged in using valid credentials
 And Admin is on the Expert Interviews page within Usage Metrics


@smoke   
Scenario: Search for Student email
Given the Admin is on Expert Interviews page within Usage Metrics
When the Admin selects search bar
And Admin types in student email
Then Admin’s search for student email becomes visible
