@wip
Feature: finding Completed Expert Interview
As an “Admin”




Background:
   Given Admin is logged in using valid credentials
   And Admin is on the Expert Interviews page within Usage Metrics




@smoke
Scenario: Search for Completed Expert Interview
Given the Admin selects Completed button
When the Admin will view all Completed Expert Interviews


