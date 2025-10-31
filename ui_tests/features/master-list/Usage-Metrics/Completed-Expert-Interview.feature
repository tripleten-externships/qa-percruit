@wip
Feature: finding Completed Expert Interview 
As an “Admin”


Background:
	Given Admin is logged in using valid credentials
	And Admin is on the Expert Interviews page within Usage Metrics


@smoke
Scenario: Search for Completed Expert Interview
Given the Admin is on Expert Interviews page within Usage Metrics 
When the Admin selects Completed button
Then the Admin will view all Completed Expert Interviews


