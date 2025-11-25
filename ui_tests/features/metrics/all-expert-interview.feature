@wip
Feature: finding Completed Expert Interview
As an “Admin”




Background:
   Given Admin is logged in using valid credentials
   And Admin is on the Expert Interviews page within Usage Metrics




@smoke
Scenario: Search for All Completed Expert Interview
Given the Admin selects All button
When the Admin will view all completed Expert Interviews
Then the Admin will view all Expert Interviews