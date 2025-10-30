@wip
Feature: Search by Expert


Background:
 Given Admin is logged in using valid credentials
 And Admin is on the Expert Interviews page within Usage Metrics


@smoke   
Scenario: Search for Expert email
Given the Admin is on Expert Interviews page within Usage Metrics
When the Admin selects search bar
And Admin types in expert email
Then Admin’s search for expert email becomes visible
