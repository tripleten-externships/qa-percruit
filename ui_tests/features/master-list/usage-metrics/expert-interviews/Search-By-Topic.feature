@wip
Feature: Search by Topic




Background:
Given Admin is logged in using valid credentials
And Admin is on the Expert Interviews page within Usage Metrics




@smoke  
Scenario: Search for Topic
Given the Admin selects search bar
When Admin types in Topic
Then Admins search for Topic becomes visible



