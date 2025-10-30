@wip
Feature: Search by Topic


Background:
 Given Admin is logged in using valid credentials
 And Admin is on the Expert Interviews page within Usage Metrics


@smoke   
Scenario: Search for Topic
Given the Admin is on Expert Interviews page within Usage Metrics
When the Admin selects search bar
And Admin types in Topic
Then Admin’s search for Topic becomes visible


