@wip
Feature: Search by Expert
The system allows admin  to search for a expert by email in order to view that student’s expert interview usage metrics.



Background:
Given Admin is logged in using valid credentials
And Admin is on the Expert Interviews page within Usage Metrics


@smoke  
Scenario: Search for Expert email
Given the Admin selects search bar
When Admin types in expert email
Then Admins search for expert email becomes visible
 

