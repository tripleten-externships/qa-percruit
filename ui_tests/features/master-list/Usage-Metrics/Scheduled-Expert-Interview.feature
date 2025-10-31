@wip
Feature: Search Completed Expert Interview 
As an “Admin”


Background:
	Given Admin is logged in using valid credentials
	And Admin is on the Expert Interviews page within Usage Metrics


@smoke
Scenario: Search for Scheduled Expert Interview
Given the Admin is on Expert Interviews page within Usage Metrics 
When The Admin selects Scheduled button
Then the Admin will view all Scheduled Expert Interviews


