@wip

Feature: Filter Articles by Field of Interest
As a student
The user wants to filter articles by field of Interest


@wip
Scenario: View all articles when no preferences are applied
Given the student is authenticated in the system
And the student views the Industry News Page
And no preferences are applied
When the student views the industry news Page
Then the student should see all articles


@wip
Scenario: Filter articles by Field of Interest
Given the student is authenticated in the system
And the student views the Industry News Page
And no preferences are applied
When the student selects preferences from the industry news Page
And the student selects Field of Interest from teh Field of Interest filter
Then the student should see all articles with relevant field of interest tag

@wip
Scenario: Search articles by keyword only
Given the student is authenticated in the system
And the student views the Industry News Page
And no preferences are applied
When the student searches for <keyword>
Then the student should see articles containing <keyword>

@wip
Scenario: No articles match the keyword
Given the student is authenticated in the system
And the student views the Industry News Page
And no preferences are applied
When the student searches for <keyword>
Then the student should see a message indicating no articles were found matching the <keyword>