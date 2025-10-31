@wip
Feature: Activities in the Coding Problems page
As an Admin 
The Admin wants to view and update activities in the coding problems page
so that activities can be tracked or managed accurately

Background:
Given The Admin is logged in using valid credentials
And the Admin is on the Activities tab in Coding Problems

@smoke
Scenario: View existing activities
When the Admin opens the Coding Problems page
And accesses the Activities tab
Then the Admin should see all existing activities

Scenario: Selecting an activity category
When the Admin filters a category using the Category dropdown
Then the Admin should only see categories which are available to add

Examples:
    | java scripting |
    | Python Basics |
    | Database Basics |

Scenario: Selecting an activity topic
When the Admin filters a topic using the Topic dropdown
Then the Admin should only see the topics which are available to add

Example:
    | sql |
